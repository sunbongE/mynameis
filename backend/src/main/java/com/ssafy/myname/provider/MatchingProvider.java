//package com.ssafy.myname.provider;
//
//import com.ssafy.myname.db.entity.MatchStatus;
//import com.ssafy.myname.db.entity.User;
//
//import com.ssafy.myname.db.entity.meeting.*;
//import com.ssafy.myname.db.repository.*;
//import io.openvidu.java.client.*;
//import jakarta.annotation.PostConstruct;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.scheduling.annotation.Async;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.*;
//import java.util.stream.Collectors;
//
//@Component
//@RequiredArgsConstructor
//@Transactional
//public class MatchingProvider {
//    private final UserRepository userRepository;
//    private final RoomRepository roomRepository;
//    private final JoinInfoRepository joinInfoRepository;
//    private final MnameRepository mnameRepository;
//    private final WnameRepository wnameRepository;
//
//    @Value("${OPENVIDU_URL}")
//    private String OPENVIDU_URL;
//
//    @Value("${OPENVIDU_SECRET}")
//    private String OPENVIDU_SECRET;
//
//    private OpenVidu openvidu;
//
//
//
//    @PostConstruct
//    public void init() {
//        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
//    }
//
//
//    private static final int TWO = 2;
//    private static final int THREE = 3;
//    private static final int FOUR = 4;
//    Logger logger = LoggerFactory.getLogger(this.getClass());
//    // 2:2 채팅방을 요청한 회원.
//    public static Queue<String> mQueueTwo = new LinkedList<>();
//    public static Queue<String> wQueueTwo = new LinkedList<>();
//    // 매칭이 확정된 회원목록
//    public static Queue<String> matchedTwoMan = new LinkedList<>();
//    public static Queue<String> matchedTwoWoman = new LinkedList<>();
//
//    // 3:3 채팅방을 요청한 회원.
//    public static Queue<String> mQueueThree = new LinkedList<>();
//    public static Queue<String> wQueueThree = new LinkedList<>();
//    public static Queue<String> matchedThreeMan = new LinkedList<>();
//
//    public static Queue<String> matchedThreeWoman = new LinkedList<>();
//
//
//    // 4:4 채팅방을 요청한 회원.
//    public static Queue<String> mQueueFour = new LinkedList<>();
//    public static Queue<String> wQueueFour = new LinkedList<>();
//    public static Queue<String> matchedFourMan = new LinkedList<>();
//    public static Queue<String> matchedFourWoman = new LinkedList<>();
//
//
//    public void queTwoAddMan(String userId) {
//        logger.info("**남자 매칭 요청 실행");
//        mQueueTwo.add(userId);
//
//        // 만약 매칭확정 배열에 빈자리가 있으면 들어가기.
//        joinMatched(matchedTwoMan, mQueueTwo, TWO);
//        logger.info("mQueueTwo : {}", mQueueTwo);
//        logger.info("matchedTwoMan : {}", matchedTwoMan);
//    }
//
//
//    public void queTwoAddWoman(String userId) {
//        logger.info("**여자 매칭 요청 실행");
//        wQueueTwo.add(userId);
//
//        // 만약 매칭확정 배열에 빈자리가 있으면 들어가기.
//        joinMatched(matchedTwoWoman, wQueueTwo, TWO);
//        logger.info("wQueueEDE : {}", wQueueTwo);
//        logger.info("matchedTwoWoman : {}", matchedTwoWoman);
//    }
//
//
//    @Async
//    public void queTwoRemoveMan(String userId) {
//        logger.info("**남자 매칭 취소 실행");
//
//        if (mQueueTwo.remove(userId)) { // 대기열에서 삭제 후 리턴
//            changeStatus(userId);
//            logger.info("mQueueEDE : {}", mQueueTwo);
//            return;
//        }
//
//        // 위에서 리턴이 안됐으면 매칭이 잡힌 상태니까 여기서도 지워줘야함.
//        matchedTwoMan.remove(userId);
//        // 큐 크기가 2보다 작고 대기열이 비어있지 않으면 대기열의 값을 넣어준다.
//        if (matchedTwoMan.size() < TWO && !mQueueTwo.isEmpty()) {
//            matchedTwoMan.offer(mQueueTwo.poll());
//        }
//
//        logger.info("mQueueEDE : {}", mQueueTwo);
//    }
//
//
//    @Async
//    public void queTwoRemoveWoman(String userId) {
//        logger.info("**여자 매칭 취소 실행");
//
//        if (wQueueTwo.remove(userId)) { // 대기열에서 삭제 후 리턴
//            changeStatus(userId);
//            logger.info("wQueueTwo : {}", wQueueTwo);
//            return;
//        }
//
//        // 위에서 리턴이 안됐으면 매칭이 잡힌 상태니까 여기서도 지워줘야함.
//        matchedTwoWoman.remove(userId);
//        // 큐 크기가 2보다 작고 대기열이 비어있지 않으면 대기열의 값을 넣어준다.
//        if (matchedTwoWoman.size() < TWO && !wQueueTwo.isEmpty()) {
//            matchedTwoWoman.offer(wQueueTwo.poll());
//        }
//        logger.info("wQueueTwo : {}", wQueueTwo);
//    }
//
//    /**
//     * 대기열에서 삭제된 회원의 매칭상태를 READY으로 변경한다.
//     *
//     * @param userId
//     */
//    private void changeStatus(String userId) {
//        User user = userRepository.findByUserId(userId);
//        user.setMatchStatus(MatchStatus.READY);
//        userRepository.save(user);
//    }
//
//    /**
//     * @param matchedQ 각 타입별 매칭확정 큐.
//     * @param curQueue 각 타입별 대기열 큐.
//     * @param limit
//     */
//    private void joinMatched(Queue<String> matchedQ, Queue<String> curQueue, int limit) {
//        // 매칭확정된 큐 사이즈가 리밋보다 작고, 현재 대기열이 비어있지 않으면.
//        while (matchedQ.size() < limit && !curQueue.isEmpty()) {
//            // 대기열 첫번째 사람을 확정큐에 추가시킨다.
//            matchedQ.offer(curQueue.poll());
//        }
//
//    }
//
//    /**
//     * 먼저 매칭 타입의 배열을 순회하면서 null이 하나라도 있으면
//     * return false,
//     * userId가 있으면 result를 true으로 변경하고 마지막에 return result.
//     *
//     * @param type
//     * @return
//     */
//    public Boolean check(String type) {
//        Boolean result = null;
//        if (type.equals("two")) {
//            result = matchedCheck(matchedTwoWoman, matchedTwoMan, TWO);
//
//        } else if (type.equals("three")) {
//            result = matchedCheck(matchedThreeWoman, matchedThreeMan, THREE);
//
//        } else if (type.equals("four")) {
//            result = matchedCheck(matchedFourWoman, matchedFourMan, FOUR);
//
//        }
//
//        return result;
//    }
//
//    /**
//     * 각 방타입별로 매칭이 확정된 회원을 확인해본다.
//     * 회원이 비어있으면(null) false리턴
//     * 회원이 모두 차있으면 true 다음로직은 db생성이 실행된다.
//     *
//     * @param matchedWoman
//     * @param matchedMan
//     * @param limit
//     * @return
//     */
//    private Boolean matchedCheck(Queue<String> matchedWoman, Queue<String> matchedMan, int limit) {
//        if (matchedWoman.size() == limit && matchedMan.size() == limit) {
//            return true;
//        } else if (matchedWoman.size() > limit || matchedMan.size() > limit) {
//            logger.info("인원이 초과되었습니다. 추가 로직에 문제가 있음.");
//            return false;
//        } else {
//            return false;
//        }
//    }
//
////    @Async
//    public void createRoom(String type) throws OpenViduJavaClientException, OpenViduHttpException {
//        // 타입별로 방을 만들어야한다.
//        int nameCnt = 0;
//        Room room = new Room();
//        if(type.equals("two")){
//            room.setRoomType(RoomType.TWO_TO_TWO);
//            nameCnt = TWO;
//        }else if (type.equals("three")){
//            room.setRoomType(RoomType.THREE_TO_THREE);
//            nameCnt = THREE;
//        } else if (type.equals("four")) {
//            room.setRoomType(RoomType.FOUR_TO_FOUR);
//            nameCnt = FOUR;
//        }
//        roomRepository.save(room);
//
//        // 랜덤이름 가져오기.
//        Queue<String> manNames = new LinkedList<>(randomNames(nameCnt, true));
//        Queue<String> womanNames = new LinkedList<>(randomNames(nameCnt,false));
////        logger.info("manNames :{}",manNames);
////        logger.info("womanNames :{}",womanNames);
//        Long roomId = room.getRoomId();
//        // 활성화된 방 가져오기.
//        Session activeRoom = openvidu.getActiveSession(roomId.toString());
//
//        // 활성화된 방이 없으면 만들기
//        if(activeRoom==null){
//            activeRoom = openvidu.createSession(new SessionProperties.Builder().customSessionId(roomId.toString()).build());
//        }
//
//
//        logger.info("joinInfo 생성하기.");
//        while (!matchedTwoMan.isEmpty()){
//            String token = createEnterToken(activeRoom);
//
//            JoinInfo joinInfo = new JoinInfo();
//            joinInfo.setRoom(room);
//            joinInfo.setToken(token);
//            joinInfo.setRandomName(manNames.poll());
//            joinInfo.setUser(userRepository.findByUserId(matchedTwoMan.poll()));
//            joinInfoRepository.save(joinInfo);
//            logger.info("joinInfo : {}",joinInfo);
//        }
//
//
//        while (!matchedTwoWoman.isEmpty()){
//            String token = createEnterToken(activeRoom);
//
//            JoinInfo joinInfo = new JoinInfo();
//            joinInfo.setRoom(room);
//            joinInfo.setToken(token);
//            joinInfo.setRandomName(womanNames.poll());
//            joinInfo.setUser(userRepository.findByUserId(matchedTwoWoman.poll()));
//            joinInfoRepository.save(joinInfo);
//            logger.info("joinInfo : {}",joinInfo);
//        }
//    }
//
//    private String createEnterToken(Session activeRoom) throws OpenViduJavaClientException, OpenViduHttpException {
//        // 여기서 접속가능한 토큰 발급
//        ConnectionProperties properties = ConnectionProperties.fromJson(new HashMap<>()).build();
//        Connection connection = activeRoom.createConnection(properties);
//        String token = connection.getToken();
//        return token;
//    }
//
//    /**
//     *
//     * @param cnt : 받을 이름 개수
//     * @param gender : 성별.
//     * @return
//     */
//    public List<String> randomNames(int cnt, Boolean gender){
//        try{
//            List<String> randomNames = new ArrayList<>();
//
//
//            if(gender){
//                randomNames = mnameRepository.findAll()
//                        .stream()
//                        .map(MRandomName::getName)
//                        .collect(Collectors.toList());
//
//            }else {
//                randomNames = wnameRepository.findAll()
//                        .stream()
//                        .map(WRandomName::getName)
//                        .collect(Collectors.toList());
//            }
//            Collections.shuffle(randomNames,new Random());
//            return randomNames.subList(0,cnt);
//
//        }catch (Exception e){
//            logger.info(e.getMessage());
//            return Collections.EMPTY_LIST;
//        }
//
//
//    }
//
//}
