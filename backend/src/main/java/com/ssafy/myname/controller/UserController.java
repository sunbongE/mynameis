package com.ssafy.myname.controller;

import org.springframework.http.RequestEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @GetMapping("/{userId}")
    public String getUser(@PathVariable("userId") String userId){
        System.out.println("userId = " + userId);
        return userId;
    }
    @PostMapping("/")
    public String getUser( ){
        return "/";
    }
    @GetMapping("/aa")
    public String aa(){
        return "aa";
    }
}
