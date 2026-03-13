package com.smart.home.controller;

import com.smart.home.model.User;
import com.smart.home.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/profile")
@CrossOrigin("*")
public class ProfileController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/upload")
    public String uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("email") String email
    ) throws IOException {

        // Dynamic upload path (works for any user machine)
        String uploadDir = System.getProperty("user.dir") + File.separator + "uploads";

        File folder = new File(uploadDir);

        // create folder if not exists
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // generate unique file name
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        File destination = new File(folder, fileName);

        // save file
        file.transferTo(destination);

        // update database
        User user = repo.findByEmail(email).orElse(null);

        if (user != null) {
            user.setProfilePic(fileName);   // store only filename
            repo.save(user);
        }

        // return image URL
        return "http://localhost:8080/uploads/" + fileName;
    }
}