package com.smart.home.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smart.home.model.Device;
import com.smart.home.model.User;

public interface DeviceRepository extends JpaRepository<Device, Integer> {

    // 🔥 correct method
    List<Device> findByUser(User user);

}