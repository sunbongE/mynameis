package com.ssafy.myname.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocket    // 웹소켓 서버 사용
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat") // 소켓접속시 endpoint설정.
                .setAllowedOriginPatterns("*")   // cors에 따른 설정. origin주소가 다른경우 기본적으로 요청 허용이 안돼서 일단 모두 허용으로 함
                .withSockJS();                   // 브라우저에서 webSocket을 지원하지 않는경우에대안으로 어플리케이션의 코드를 변경할 필요 없이 런타임에 필요할 때 대체하기 위해 설정

    }

    /**
     * /topic/??? 으로 사용자가 구도한 상황에서 서버가 메시지를 보내
     * 전체 클라에게 알릴 수 있는 역할을 하는 설정.
     *
     * 클라에서 /chat/??으로 메시지를 보내면 서버에서 처리하는것.
     * @param registry
     */

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub"); // broker url 설정
        registry.setApplicationDestinationPrefixes("/pub"); // send url 설정    }
    }
}
