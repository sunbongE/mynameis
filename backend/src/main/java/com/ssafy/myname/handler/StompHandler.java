package com.ssafy.myname.handler;

import com.ssafy.myname.provider.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
@Slf4j
@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
    private final JwtProvider jwtProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        log.info("** preSend 실행~~~~");
        StompHeaderAccessor accessor= StompHeaderAccessor.wrap(message);
        if(StompCommand.CONNECT == accessor.getCommand()){
            jwtProvider.validate(accessor.getFirstNativeHeader("Authorization").substring(7));
        }
        return message;
    }
}
