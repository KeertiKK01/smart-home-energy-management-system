package com.smart.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String email, String otp) {

        // 🔴 Step 1: Validate email
        if (email == null || email.trim().isEmpty()) {
            System.out.println("❌ Email is empty. Cannot send OTP.");
            return;
        }

        try {
            System.out.println("\n========== OTP EMAIL DEBUG ==========");
            System.out.println("📧 Receiver Email : " + email);
            System.out.println("🔢 Generated OTP  : " + otp);

            SimpleMailMessage message = new SimpleMailMessage();

            // ⚠️ IMPORTANT: same as application.properties username
            message.setFrom("your_email@gmail.com");

            message.setTo(email);
            message.setSubject("Smart Home Energy System - OTP Verification");

            String emailText =
                    "Hello,\n\n" +
                            "Your OTP is: " + otp + "\n\n" +
                            "⚠️ Valid for limited time.\n\n" +
                            "If not requested, ignore.\n\n" +
                            "Regards,\nSmart Home Team";

            message.setText(emailText);

            // 🔥 Send mail
            mailSender.send(message);

            System.out.println("✅ EMAIL SENT SUCCESSFULLY!");
            System.out.println("=====================================\n");

        } catch (Exception e) {

            System.out.println("❌ EMAIL SENDING FAILED!");
            System.out.println("👉 ERROR: " + e.getMessage());

            e.printStackTrace();
        }
    }
}