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

        if (email == null || email.isEmpty()) {
            System.out.println("Email is empty. Cannot send OTP.");
            return;
        }

        try {

            System.out.println("------------ OTP EMAIL PROCESS ------------");
            System.out.println("Receiver Email : " + email);
            System.out.println("Generated OTP  : " + otp);

            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom("avnikushwaha16@gmail.com");
            message.setTo(email);
            message.setSubject("Smart Home Energy System - OTP Verification");

            String emailText =
                    "Hello,\n\n" +
                            "Your OTP for Smart Home Energy System password reset is:\n\n" +
                            "OTP : " + otp +
                            "\n\nThis OTP will expire soon." +
                            "\n\nIf you did not request this, please ignore this email." +
                            "\n\nRegards,\nSmart Home Energy System";

            message.setText(emailText);

            mailSender.send(message);

            System.out.println("OTP email sent successfully!");
            System.out.println("-------------------------------------------");

        } catch (Exception e) {

            System.out.println("ERROR: Failed to send OTP email!");
            System.out.println("Reason: " + e.getMessage());
            e.printStackTrace();
        }
    }
}