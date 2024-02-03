package com.ssafy.myname.service;

import com.ssafy.myname.dto.request.matching.EnterDto;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import org.springframework.http.ResponseEntity;

import java.security.Principal;

public interface MatchingService {

    void enterMeeting(Principal principal, EnterDto dto);
    void exitMeeting(Principal principal, EnterDto dto);

    ResponseEntity<?> twoMatchingJoin(String userId);
    ResponseEntity<?> matchingCancle(String userId);
    ResponseEntity<?> check(String userId) throws OpenViduJavaClientException, OpenViduHttpException;


}
