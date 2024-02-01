package com.ssafy.myname.openvidu.controller;

import com.ssafy.myname.openvidu.service.MeetingService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/meeting")
@RequiredArgsConstructor
public class OpenviduController {
    public static final Logger logger = LoggerFactory.getLogger(OpenviduController.class);
    private final MeetingService meetingService;


}
