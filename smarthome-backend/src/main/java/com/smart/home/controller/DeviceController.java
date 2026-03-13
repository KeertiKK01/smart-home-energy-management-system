package com.smart.home.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smart.home.model.Device;
import com.smart.home.service.DeviceService;

@RestController
@RequestMapping("/devices")
@CrossOrigin(origins="*")
public class DeviceController {

    @Autowired
    private DeviceService service;

    // ADD DEVICE
    @PostMapping("/add/{userId}")
    public Device addDevice(@RequestBody Device device,
                            @PathVariable int userId){

        return service.addDevice(device,userId);
    }

    // GET USER DEVICES
    @GetMapping("/user/{userId}")
    public List<Device> getUserDevices(@PathVariable int userId){

        return service.getUserDevices(userId);
    }

    // DELETE DEVICE
    @DeleteMapping("/{id}")
    public String deleteDevice(@PathVariable int id){

        return service.deleteDevice(id);
    }
}