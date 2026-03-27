package com.smart.home.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smart.home.model.Device;
import com.smart.home.model.User;
import com.smart.home.repository.DeviceRepository;
import com.smart.home.repository.UserRepository;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepo;

    @Autowired
    private UserRepository userRepo;

    /* ================= ADD DEVICE ================= */

    public Device addDevice(Device device, int userId){

        User user = userRepo.findById(userId).orElse(null);

        if(user == null){
            throw new RuntimeException("User not found");
        }

        device.setUser(user);

        return deviceRepo.save(device);
    }

    /* ================= GET USER DEVICES ================= */

    public List<Device> getUserDevices(int userId){

        User user = userRepo.findById(userId).orElse(null);

        if(user == null){
            throw new RuntimeException("User not found");
        }

        return deviceRepo.findByUser(user); // 🔥 FIXED
    }

    /* ================= DELETE DEVICE ================= */

    public String deleteDevice(int id){

        deviceRepo.deleteById(id);

        return "Device Deleted";
    }
}