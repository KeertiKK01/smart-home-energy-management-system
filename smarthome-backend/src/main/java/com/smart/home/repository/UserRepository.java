package com.smart.home.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.smart.home.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    // Find user by email
    Optional<User> findByEmail(String email);

    // Check if email already exists (for duplicate prevention)
    boolean existsByEmail(String email);

    // Check if phone already exists
    boolean existsByPhone(String phone);

    // Login validation
    Optional<User> findByEmailAndPassword(String email, String password);

}