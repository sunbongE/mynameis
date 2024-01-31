package com.ssafy.myname.service;

import org.springframework.http.ResponseEntity;

import java.security.Principal;

public interface MatchingService {

    ResponseEntity<?> twoMatchingJoin(String userId);
    ResponseEntity<?> matchingCancle(String userId);
    ResponseEntity<?> didItMatch(String userId);
}
