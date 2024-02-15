package com.ssafy.myname.service.implement;

import com.ssafy.myname.service.ChatRoomService;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {
    @Override
    public void enterMessageRoom(Long roomId) {

    }

    @Override
    public ChannelTopic getTopic(Long roomId) {
        return null;
    }
}
