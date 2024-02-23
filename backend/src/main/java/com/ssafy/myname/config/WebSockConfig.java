package com.ssafy.myname.config;

import com.ssafy.myname.handler.StompHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSockConfig implements WebSocketMessageBrokerConfigurer {
    private final StompHandler stompHandler;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/api/sub"); // 구독 요청할 때
        config.setApplicationDestinationPrefixes("/api/pub");   // 메시지를 발행.
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/stomp")
                .setAllowedOrigins("*")
                .withSockJS();
//
//                .setAllowedOrigins(
//                        "http://localhost:3000", "http://localhost:8081",
//                        "https://i10c207.p.ssafy.io", "https://mynameis.site")
//                .setAllowedOriginPatterns(
//                        "http://localhost:3000/**", "http://localhost:8081/**",
//                        "https://i10c207.p.ssafy.io/**", "https://mynameis.site/**")
//                .withSockJS()
//                .setDisconnectDelay(30 * 1000)
//                .setClientLibraryUrl(
//                        "https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.5.4/sockjs.min.js");

    }

//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*");
//                 }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler);
    }

    @EventListener
    public void connectionEvent(SessionConnectedEvent sessionConnectedEvent) {
        log.info(String.valueOf(sessionConnectedEvent));
        log.info("연결 성공 감지");
    }
}