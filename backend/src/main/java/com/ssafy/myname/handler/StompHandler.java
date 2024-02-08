package com.ssafy.myname.handler;

import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.provider.JwtProvider;
import com.ssafy.myname.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompHandler implements ChannelInterceptor {
    private final JwtProvider jwtProvider;
    private final CoupleChatRoomRepository coupleChatRoomRepository;
    private final ChatService chatService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        log.info("** preSend 실행");
        StompHeaderAccessor accessor= StompHeaderAccessor.wrap(message);
        if(StompCommand.CONNECT == accessor.getCommand()){
            String token = accessor.getFirstNativeHeader("Authorization").substring(7);
            log.info("CONNECT {}",token);
            jwtProvider.validate(token);
        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) {
            // header 정보에서 구독 destination정보를 얻어 roomId추출
            String roomId = chatService.getRoom(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            // 채팅방에 들어온 클라 세션ID를  roomId와 매칭함.=>나중에 특정세션이 어떤 채팅방에 들어가있는지 알 수 있다.
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            log.info("sessionId :{} , roomId : {}",sessionId,roomId);
            coupleChatRoomRepository.setUserEnterInfo(sessionId,roomId);
            String name = Optional.ofNullable((Principal) message.getHeaders().get("simpUser")).map(Principal::getName).orElse("UnknownUser");
            log.info("message : {}",message);
//            chatService.sendChatMessage(ChatDto.builder().type(ChatMessage.MessageType.ENTER).roomId(roomId).sender(name).build());
            log.info("SUBSCRIBED {}, {}", name, roomId);

        }else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료

            // 연결이 종료된 클라이언트 sesssionId로 채팅방 id를 얻는다.
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            String roomId = coupleChatRoomRepository.getUserEnterRoomId(sessionId);

            // 퇴장한 클라이언트의 roomId 맵핑 정보를 삭제한다.
            coupleChatRoomRepository.removeUserEnterInfo(sessionId);
            log.info("DISCONNECTED {}, {}", sessionId, roomId);
        }
        return message;
    }
}
