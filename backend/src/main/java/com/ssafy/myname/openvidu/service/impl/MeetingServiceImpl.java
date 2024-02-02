package com.ssafy.myname.openvidu.service.impl;

import com.ssafy.myname.openvidu.dto.MeetingDto;
import com.ssafy.myname.openvidu.service.MeetingService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingServiceImpl implements MeetingService {
    @Override
    public MeetingDto createSession(MeetingDto meetingDto) throws Exception {
        return null;
    }

    @Override
    public List<MeetingDto> readAllMeeting() throws Exception {
        return null;
    }

    @Override
    public MeetingDto readMeeting(String sessionId) throws Exception {
        return null;
    }

    @Override
    public MeetingDto updateMeeting(MeetingDto meetingDto) throws Exception {
        return null;
    }

    @Override
    public void deleteMeeting(String sessionId) throws Exception {

    }
}
