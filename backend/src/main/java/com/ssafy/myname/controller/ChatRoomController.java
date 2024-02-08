package com.ssafy.myname.controller;

import com.ssafy.myname.db.entity.Chats.ChatRoom;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.CoupleChatRoomRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.request.chat.ChatDto;
import com.ssafy.myname.dto.request.chat.ChatRoomDto;
import com.ssafy.myname.service.ChatService;
import com.ssafy.myname.service.CoupleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/history")
@Slf4j
public class ChatRoomController {
    private final ChatService chatService;
    private final UserRepository userRepository;


    // 특정 채팅방 조회
    @GetMapping("/room")
    @ResponseBody
    public ResponseEntity<?> roomInfo(Principal principal, @RequestParam(name = "index") int index) {
        try{

        User user = userRepository.findByUserId(principal.getName());
        String coupleId = String.valueOf(user.getCouple().getCoupleId());
        List<ChatDto> chatDtos = chatService.loadMessage(coupleId,index);
        if(chatDtos.size()==0){
            return ResponseEntity.status(HttpStatus.OK).body(Collections.EMPTY_LIST);
        }
        return ResponseEntity.status(HttpStatus.OK).body(chatDtos);
        }catch (Exception e){
            e.printStackTrace();
            Map<String,String> res = new HashMap<>();
            res.put("error",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

}
