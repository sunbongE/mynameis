package com.ssafy.myname.controller;

import com.ssafy.myname.db.entity.Couple;
import com.ssafy.myname.db.repository.CoupleRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/couple")
@RequiredArgsConstructor
public class CoupleController {

    private final CoupleRepository coupleRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @PostMapping("/create")
    public ResponseEntity<?> createCoupleTBL(){
        logger.info("** createCoupleTBL 실행.");
        try{
            Couple couple = new Couple();
            couple = coupleRepository.save(couple);
            Map<String, Object> body = new HashMap<>();
            body.put("coupleId",couple.getCoupleId());
            return ResponseEntity.status(HttpStatus.OK).body(body);

        }catch (Exception e){
            Map<String, Object> errorBody = new HashMap<>();
            errorBody.put("error", "can not create coupleTBL");
            errorBody.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorBody);
        }
    }

//    @PostMapping("/matching")
//    public ResponseEntity<?> coupleMatching()
}
