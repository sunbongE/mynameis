package com.ssafy.myname.provider;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.Queue;

@Component
@RequiredArgsConstructor
public class MatchingProvider {

    Logger logger = LoggerFactory.getLogger(this.getClass());
    public static Queue<String> mQueue = new LinkedList<>();
    public static Queue<String> wQueue = new LinkedList<>();

    @Async
    private void processing(){

    }

    public void addMQue(String userId){
        mQueue.add(userId);
        logger.info("mQueue : {}",mQueue);
    }
    public void addWQue(String userId){
        wQueue.add(userId);
        logger.info("wQueue : {}",wQueue);
    }
    public void removeM(String userId) {
        mQueue.remove(userId);
        logger.info("mQueue : {}",mQueue);
    }
    public void removeW(String userId) {
        wQueue.remove(userId);
        logger.info("wQueue : {}",wQueue);
    }
}
