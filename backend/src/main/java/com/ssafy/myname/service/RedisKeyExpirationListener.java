//package com.ssafy.myname.service;
//
//import org.springframework.data.redis.connection.Message;
//import org.springframework.data.redis.connection.MessageListener;
//import org.springframework.stereotype.Service;
//
//@Service
//public class RedisKeyExpirationListener implements MessageListener {
//
//    @Override
//    public void onMessage(Message message, byte[] pattern) {
//        String expiredKey = new String(message.getBody());
//        // 만료된 리프레시 토큰에 대한 처리 로직을 여기에 추가
//        System.out.println("Expired Key: " + expiredKey);
//    }
//
////    @Override
////    public void onMessage(Message message, byte[] pattern) {
////
////    }
//}