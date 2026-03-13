package com.smart.home.controller;

import com.smart.home.model.User;
import com.smart.home.service.UserService;
import com.smart.home.dto.LoginRequest;
import com.smart.home.model.EmailRequest;
import com.smart.home.model.ResetRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService service;

    /* ================= REGISTER ================= */

    @PostMapping("/register")
    public String register(@RequestBody User user){
        return service.register(user);
    }

    /* ================= VERIFY REGISTER OTP ================= */

    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String email,
                            @RequestParam String otp){

        return service.verifyOtp(email, otp);
    }

    /* ================= LOGIN ================= */

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest req){
        return service.login(req);
    }

    /* ================= FORGOT PASSWORD - SEND OTP ================= */

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody EmailRequest request){
        return service.sendResetOtp(request.getEmail());
    }

    /* ================= VERIFY RESET OTP ================= */

    @PostMapping("/verify-reset-otp")
    public String verifyResetOtp(@RequestBody ResetRequest request){

        return service.verifyResetOtp(
                request.getEmail(),
                request.getOtp()
        );
    }

    /* ================= RESET PASSWORD ================= */

    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody ResetRequest request){

        return service.resetPassword(
                request.getEmail(),
                request.getPassword()
        );
    }

}