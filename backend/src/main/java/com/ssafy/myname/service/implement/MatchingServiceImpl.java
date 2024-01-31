package com.ssafy.myname.service.implement;

import com.ssafy.myname.db.entity.MatchStatus;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.response.matching.MatchingAcceptResponseDto;
import com.ssafy.myname.provider.MatchingProvider;
import com.ssafy.myname.service.MatchingService;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@DynamicInsert
public class MatchingServiceImpl implements MatchingService {
    private final MatchingProvider matchingProvider;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<?> twoMatchingJoin(String userId) {
        // 사용자의 상태 변경.
        User user = userRepository.findByUserId(userId);
        if (user.getMatchStatus().equals(MatchStatus.MATCHED) || user.getMatchStatus().equals(MatchStatus.MATCHING)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MatchingAcceptResponseDto.already());
        }
        user.setMatchStatus(MatchStatus.MATCHING);
        userRepository.save(user);

        // 남여 구분해서 큐에 삽입
        if (user.getGender()) {
            matchingProvider.queTwoAddMan(userId);
        } else {
            matchingProvider.queTwoAddWoman(userId);
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(MatchingAcceptResponseDto.join());
    }

    @Override
    public ResponseEntity<?> matchingCancle(String userId) {
        // 사용자의 상태 변경.
        User user = userRepository.findByUserId(userId);
        user.setMatchStatus(MatchStatus.READY);
        userRepository.save(user);

        // 남여 구분해서 큐에서 제거.
        if (user.getGender()) {
            matchingProvider.queTwoRemoveMan(userId);
        } else {
            matchingProvider.queTwoRemoveWoman(userId);
        }
        // 큐에 삽입
        return ResponseEntity.status(HttpStatus.OK).body(MatchingAcceptResponseDto.cancle());
    }

    @Override
    public ResponseEntity<?> didItMatch(String userId) {
        // 매칭이 잡힌 배열에 내 아이디가 있는지 확인하고 있으면 방아이디,
        // 입장 토큰등을 리턴한다.

        // 아직 대기중이라면 202를 보낼 예정이다. msg : 매칭중!!


        return null;
    }
}
