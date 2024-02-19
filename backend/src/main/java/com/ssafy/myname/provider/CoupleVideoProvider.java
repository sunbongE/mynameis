package com.ssafy.myname.provider;

import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
@Slf4j
@Component
@RequiredArgsConstructor
public class CoupleVideoProvider {
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private static OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public static String coupleVideo(String coupleId) throws OpenViduJavaClientException, OpenViduHttpException {
        Session activeRoom = openvidu.getActiveSession(coupleId);


        // 활성화된 방이 없으면 만들기
        if(activeRoom==null){
            log.info("coupleId :{}",coupleId);
            log.info("{}으로 활성화된 방이없다.");
            activeRoom = openvidu.createSession(new SessionProperties.Builder().customSessionId(coupleId).build());
        }


        // 여기서 접속가능한 토큰 발급
        ConnectionProperties properties = ConnectionProperties.fromJson(new HashMap<>()).build();
        Connection connection = activeRoom.createConnection(properties);
        String token = connection.getToken();

        if(token==null) {
            log.info("비활성화토큰이라 다시 만들기 시도..");
            return coupleVideo(coupleId);

        }
        return token;
    }

}
