package com.ssafy.myname.controller;

import com.ssafy.myname.dto.request.kakaopay.ApproveRequest;
import com.ssafy.myname.dto.request.kakaopay.PaymentRequest;
import com.ssafy.myname.service.KakaoPayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;

@RestController
@RequestMapping("/auth")
public class KakaoPaymentController {

    private KakaoPayService kakaoPayService;

    public KakaoPaymentController(KakaoPayService kakaoPayService) {
        this.kakaoPayService = kakaoPayService;
    }

    @PostMapping("/pay")
    public String requestPay(@RequestBody PaymentRequest request) throws URISyntaxException {
        return kakaoPayService.requestPayment(request);
    }

    @PostMapping("/approve")
    public ResponseEntity<String> approvePay(@RequestBody ApproveRequest request) {
        return kakaoPayService.approvePayment(request);
    }
}
