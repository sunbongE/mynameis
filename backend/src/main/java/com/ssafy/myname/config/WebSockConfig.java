package com.ssafy.myname.config;

import com.ssafy.myname.handler.StompHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSockConfig implements WebSocketMessageBrokerConfigurer {
    private final StompHandler stompHandler;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub"); // 구독 요청할 때
        config.setApplicationDestinationPrefixes("/pub");   // 메시지를 발행.
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("http://localhost:3000","https://i10c207.p.ssafy.io")
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler);
    }

    @EventListener
    public void connectionEvent(SessionConnectedEvent sessionConnectedEvent){
        System.out.println(sessionConnectedEvent);
        System.out.println("연결 성공 감지");
    }
}