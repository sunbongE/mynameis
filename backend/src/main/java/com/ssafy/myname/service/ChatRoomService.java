package com.ssafy.myname.service;

import org.springframework.data.redis.listener.ChannelTopic;

public interface ChatRoomService {
    void enterMessageRoom(Long roomId);

    ChannelTopic getTopic(Long roomId);
}
