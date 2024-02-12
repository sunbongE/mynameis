package com.ssafy.myname.service;

import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.request.kakaopay.ApproveRequest;
import com.ssafy.myname.dto.request.kakaopay.PaymentRequest;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;

@Service
public class KakaoPayService {

    private static final String CID = "TC0ONETIME";  // 테스트 결제 가맹점 코드

    @Value("${kakao.pay.request.url}")
    private String requestUrl;

    @Value("${kakao.pay.approve.url}")
    private String approveUrl;

    @Value("${kakao.pay.secret_key}")
    private String secretKey;
    private final RestTemplate restTemplate;
    private final UserService userService;
    private final UserRepository userRepository;

    public KakaoPayService(RestTemplate restTemplate, UserService userService, UserRepository userRepository) {
        this.restTemplate = restTemplate;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public String requestPayment(PaymentRequest paymentRequest) throws URISyntaxException {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "SECRET_KEY " + secretKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        JSONObject params = new JSONObject();
        params.put("cid", CID);
        params.put("partner_order_id", paymentRequest.getPartner_order_id());
        params.put("partner_user_id", paymentRequest.getPartner_user_id());
        params.put("item_name", paymentRequest.getItem_name());
        params.put("quantity", 1);
        params.put("total_amount", paymentRequest.getTotal_amount());
        params.put("tax_free_amount", 0);
        params.put("approval_url", "http://localhost:8080/success");
        params.put("cancel_url", "http://localhost:8080/cancel");
        params.put("fail_url", "http://localhost:8080/fail");

        HttpEntity<String> body = new HttpEntity<>(params.toString(), headers);
        ResponseEntity<String> response = restTemplate.postForEntity(new URI(requestUrl), body, String.class);

        return response.getBody();
    }

    public ResponseEntity<String> approvePayment(ApproveRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "SECRET_KEY " + secretKey);

        JSONObject params = new JSONObject();
        params.put("cid", CID);
        params.put("tid", request.getTid());
        params.put("partner_order_id", request.getPartner_order_id());
        params.put("partner_user_id", request.getPartner_user_id());
        params.put("pg_token", request.getPg_token());

        HttpEntity<String> body = new HttpEntity<>(params.toString(), headers);

        ResponseEntity<String> response = restTemplate.exchange(approveUrl, HttpMethod.POST, body, String.class);

        // 결제 승인이 성공하면 코인 추가
        if (response.getStatusCode() == HttpStatus.OK) {
            userService.addCoins(request.getPartner_order_id(), request.getPartner_user_id());  // 코인 추가 로직
        }

        return response;
    }
}
