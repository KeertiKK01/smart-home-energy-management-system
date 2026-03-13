package com.smart.home.service;

import com.smart.home.model.User;
import com.smart.home.repository.UserRepository;
import com.smart.home.dto.LoginRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private EmailService emailService;

    // ================= REGISTER =================
    public String register(User user) {

        if(user.getEmail() == null || user.getEmail().trim().isEmpty())
            return "Email is required";

        if(user.getPhone() == null || user.getPhone().trim().isEmpty())
            return "Phone number is required";

        if(user.getPassword() == null || user.getPassword().trim().isEmpty())
            return "Password is required";

        String email = user.getEmail().trim().toLowerCase();

        if(repo.existsByEmail(email))
            return "Email already registered";

        if(repo.existsByPhone(user.getPhone()))
            return "Phone already registered";

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        user.setEmail(email);
        user.setOtp(otp);
        user.setVerified(false);

        repo.save(user);

        emailService.sendOtp(email, otp);

        return "OTP sent to email";
    }

    // ================= VERIFY OTP =================
    public String verifyOtp(String email, String otp) {

        User user = repo.findByEmail(email.trim().toLowerCase()).orElse(null);

        if(user == null)
            return "User not found";

        if(user.getOtp() == null)
            return "OTP expired";

        if(user.getOtp().equals(otp)) {

            user.setVerified(true);
            user.setOtp(null);

            repo.save(user);

            return "OTP Verified";
        }

        return "Invalid OTP";
    }

    // ================= LOGIN =================
    public User login(LoginRequest req) {

        if(req.getEmail() == null || req.getPassword() == null)
            throw new RuntimeException("Email and Password required");

        User user = repo.findByEmail(req.getEmail().trim().toLowerCase()).orElse(null);

        if (user == null)
            throw new RuntimeException("User not found");

        if (!user.isVerified())
            throw new RuntimeException("Please verify OTP first");

        if (!user.getPassword().trim().equals(req.getPassword().trim()))
            throw new RuntimeException("Wrong Password");

        return user;
    }

    // ================= FORGOT PASSWORD - SEND OTP =================
    public String sendResetOtp(String email) {

        if(email == null || email.trim().isEmpty())
            return "Email required";

        User user = repo.findByEmail(email.trim().toLowerCase()).orElse(null);

        if(user == null)
            return "User not found";

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        user.setOtp(otp);

        repo.save(user);

        emailService.sendOtp(user.getEmail(), otp);

        return "Reset OTP sent to email";
    }

    // ================= VERIFY RESET OTP =================
    public String verifyResetOtp(String email, String otp) {

        User user = repo.findByEmail(email.trim().toLowerCase()).orElse(null);

        if(user == null)
            return "User not found";

        if(user.getOtp() == null)
            return "OTP expired";

        if(user.getOtp().equals(otp))
            return "OTP Verified";

        return "Invalid OTP";
    }

    // ================= RESET PASSWORD =================
    public String resetPassword(String email, String newPassword) {

        User user = repo.findByEmail(email.trim().toLowerCase()).orElse(null);

        if(user == null)
            return "User not found";

        if(newPassword == null || newPassword.trim().isEmpty())
            return "Password cannot be empty";

        user.setPassword(newPassword.trim());
        user.setOtp(null);

        repo.save(user);

        return "Password reset successful";
    }
}