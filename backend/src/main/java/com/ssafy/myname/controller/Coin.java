//package com.ssafy.myname.controller;
//
//import com.ssafy.myname.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.security.Principal;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/coin")
//public class Coin {
//
//    @Autowired
//    private UserService userService;
//
//    @PostMapping("/use")
//    public ResponseEntity<String> useCoin(Principal principal) {
//        String id = principal.getName();
//        userService.useCoin(id, 30);
//        return ResponseEntity.ok("Coin has been used successfully");
//    }
//}
