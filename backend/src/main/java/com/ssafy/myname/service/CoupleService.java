package com.ssafy.myname.service;

import com.ssafy.myname.db.entity.Couple;
import com.ssafy.myname.db.entity.User;
import org.springframework.http.ResponseEntity;

public interface CoupleService {
    ResponseEntity<?> coupleAccept(User user, Couple couple);
    ResponseEntity<?> deleteCouple(Long coupleId);
    ResponseEntity<?> breakCouple(Couple couple,User user);
}
