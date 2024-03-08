//package com.ssafy.myname.controller;
//
//import com.ssafy.myname.dto.request.kakaopay.ApproveRequest;
//import com.ssafy.myname.dto.request.kakaopay.PaymentRequest;
//import com.ssafy.myname.service.KakaoPayService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.net.URISyntaxException;
//
//@RestController
//@RequestMapping("/auth")
//public class KakaoPaymentController {
//
//    private KakaoPayService kakaoPayService;
//
//    public KakaoPaymentController(KakaoPayService kakaoPayService) {
//        this.kakaoPayService = kakaoPayService;
//    }
//
//    @PostMapping("/pay")
//    public String requestPay(@RequestBody PaymentRequest request) throws URISyntaxException {
//        return kakaoPayService.requestPayment(request);
//    }
//
//    @PostMapping("/approve")
//    public ResponseEntity<String> approvePay(@RequestBody ApproveRequest request) {
//        return kakaoPayService.approvePayment(request);
//    }
//
//    @GetMapping("/success")
//    public ResponseEntity<String> success(@RequestParam("pg_token") String pgToken) {
//        System.out.println(pgToken);  // pg_token을 사용하는 로직
//        return ResponseEntity.ok(pgToken);  // pg_token을 반환
//    }
//}
