package com.ssafy.myname.service;

import com.ssafy.myname.db.entity.Couple;
import com.ssafy.myname.db.entity.User;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import org.springframework.http.ResponseEntity;

public interface CoupleService {
    ResponseEntity<?> coupleAccept(User user, Couple couple);
    ResponseEntity<?> deleteCouple(Long coupleId);
    ResponseEntity<?> breakCouple(String userId);
    ResponseEntity<?> coupleVideo(String coupleId) throws OpenViduJavaClientException, OpenViduHttpException;

}
