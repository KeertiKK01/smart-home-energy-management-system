package com.smart.home.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smart.home.model.Device;

public interface DeviceRepository extends JpaRepository<Device,Integer>{

    List<Device> findByUserId(int userId);

}