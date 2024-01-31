package com.ssafy.myname.provider;

import com.ssafy.myname.db.entity.MatchStatus;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.Queue;

@Component
@RequiredArgsConstructor
public class MatchingProvider {
    private final UserRepository userRepository;

    private static final int TWO = 2;
    private static final int THREE = 3;
    private static final int FOUR = 4;
    Logger logger = LoggerFactory.getLogger(this.getClass());
    // 2:2 채팅방을 요청한 회원.
    public static Queue<String> mQueueTwo = new LinkedList<>();
    public static Queue<String> wQueueTwo = new LinkedList<>();
    // 매칭이 확정된 회원목록
    public static String[] matchedTwoMan = new String[TWO];
    public static String[] matchedTwoWoman = new String[TWO];

    // 3:3 채팅방을 요청한 회원.
    public static Queue<String> mQueueThree = new LinkedList<>();
    public static Queue<String> wQueueThree = new LinkedList<>();
    public static String[] matchedThreeMan = new String[THREE];
    public static String[] matchedThreeWoman = new String[THREE];

    // 4:4 채팅방을 요청한 회원.
    public static Queue<String> mQueueFour = new LinkedList<>();
    public static Queue<String> wQueueFour = new LinkedList<>();
    public static String[] matchedFourMan = new String[FOUR];
    public static String[] matchedFourWoman = new String[FOUR];


    public void queTwoAddMan(String userId) {
        logger.info("**남자 매칭 요청 실행");
        mQueueTwo.add(userId);

        // 만약 매칭확정 배열에 빈자리가 있으면 들어가기.
        joinMatched(matchedTwoMan,mQueueTwo);
        logger.info("mQueueTwo : {}", mQueueTwo);
        logger.info("matchedTwoMan : {}", matchedTwoMan);
    }



    public void queTwoAddWoman(String userId) {
        logger.info("**여자 매칭 요청 실행");
        wQueueTwo.add(userId);

        // 만약 매칭확정 배열에 빈자리가 있으면 들어가기.
        joinMatched(matchedTwoWoman,wQueueTwo);
        logger.info("wQueueEDE : {}", wQueueTwo);
        logger.info("matchedTwoWoman : {}", matchedTwoWoman);
    }


    @Async
    public void queTwoRemoveMan(String userId) {
        logger.info("**남자 매칭 취소 실행");

        if (mQueueTwo.remove(userId)) { // 대기열에서 삭제 후 리턴
            changeStatus(userId);
            logger.info("mQueueEDE : {}", mQueueTwo);
            return;
        }

        // 위에서 리턴이 안됐으면 매칭이 잡힌 상태니까 여기서도 지워줘야함.

        // 매칭잡힌 상태에서 제거.
        for (int idx = 0; idx < matchedTwoMan.length; idx++) {
            String cur = matchedTwoMan[idx];
            if (cur!=null && cur.equals(userId)) {
                changeStatus(userId);

                if (!mQueueTwo.isEmpty()) {
                    cur = mQueueTwo.poll(); // 대기열 1번 사람 넣어준다.
                } else {
                    cur = null; // 대기열이 비어있는 경우.
                }
            }
        }
        logger.info("mQueueEDE : {}", mQueueTwo);
    }


    @Async
    public void queTwoRemoveWoman(String userId) {
        logger.info("**여자 매칭 취소 실행");

        if (wQueueTwo.remove(userId)) { // 대기열에서 삭제 후 리턴
            changeStatus(userId);
            logger.info("wQueueTwo : {}", wQueueTwo);
            return;
        }

        // 위에서 리턴이 안됐으면 매칭이 잡힌 상태니까 여기서도 지워줘야함.

        // 매칭잡힌 상태에서 제거.
        for (int idx = 0; idx < matchedTwoWoman.length; idx++) {
            if (matchedTwoWoman[idx].equals(userId)) {
                changeStatus(userId);

                if (!wQueueTwo.isEmpty()) {
                    matchedTwoWoman[idx] = wQueueTwo.poll(); // 대기열 1번 사람 넣어준다.
                } else {
                    matchedTwoWoman[idx] = null; // 대기열이 비어있는 경우.
                }
            }
        }
        logger.info("wQueueTwo : {}", wQueueTwo);
    }

    /**
     * 대기열에서 삭제된 회원의 매칭상태를 READY으로 변경한다.
     *
     * @param userId
     */
    private void changeStatus(String userId) {
        User user = userRepository.findByUserId(userId);
        user.setMatchStatus(MatchStatus.READY);
        userRepository.save(user);
    }

    /**
     *
     * @param matchedArr 각 타입별 매칭확정 배열.
     * @param curQueue 각 타입별 대기열 큐.
     */
    private void joinMatched(String[] matchedArr, Queue<String> curQueue) {
        for (int idx = 0; idx < matchedArr.length; idx++) {
            if(!curQueue.isEmpty() && matchedArr[idx] == null){
                matchedArr[idx] = curQueue.poll();
                return;
            }
        }
    }
}
