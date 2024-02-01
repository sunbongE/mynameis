package com.ssafy.myname.service;

import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import org.springframework.http.ResponseEntity;

public interface MatchingService {

    ResponseEntity<?> twoMatchingJoin(String userId);
    ResponseEntity<?> matchingCancle(String userId);
    ResponseEntity<?> check(String userId) throws OpenViduJavaClientException, OpenViduHttpException;


}
