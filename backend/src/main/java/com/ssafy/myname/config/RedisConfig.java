//package com.ssafy.myname.config;
//
//import com.ssafy.myname.service.RedisKeyExpirationListener;
////import com.ssafy.myname.service.RedisSubscriber;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//import org.springframework.data.redis.connection.RedisConnectionFactory;
//import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
//import org.springframework.data.redis.core.RedisKeyValueAdapter;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.listener.ChannelTopic;
//import org.springframework.data.redis.listener.PatternTopic;
//import org.springframework.data.redis.listener.RedisMessageListenerContainer;
//import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
//import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
//import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.StringRedisSerializer;
//
//@Configuration
//@EnableRedisRepositories(enableKeyspaceEvents = RedisKeyValueAdapter.EnableKeyspaceEvents.ON_STARTUP)
//public class RedisConfig {
//
//    @Value("${spring.data.redis.host}")
//    private String host;
//
//    @Value("${spring.data.redis.port}")
//    private int port;
//    /**
//     * 단일 Topic 사용을 위한 Bean 설정
//     */
//    @Bean
//    public ChannelTopic channelTopic() {
//        return new ChannelTopic("chatroom");
//    }
//
//    /**
//     * redis에 발행(publish)된 메시지 처리를 위한 리스너 설정
//     */
//    @Bean
//    @Primary
//    public RedisMessageListenerContainer redisMessageListener(RedisConnectionFactory connectionFactory,
//                                                              MessageListenerAdapter listenerAdapter,
//                                                              ChannelTopic channelTopic) {
//        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
//        container.setConnectionFactory(connectionFactory);
//        container.addMessageListener(listenerAdapter, channelTopic);
//        return container;
//    }
//
//    /**
//     * 실제 메시지를 처리하는 subscriber 설정 추가
//     */
////    @Bean
////    public MessageListenerAdapter listenerAdapter(RedisSubscriber subscriber) {
////        return new MessageListenerAdapter(subscriber, "sendMessage");
////    }
//
//    @Bean
//    public RedisConnectionFactory redisConnectionFactory() {
//        return new LettuceConnectionFactory(host, port);
//    }
//
//    @Primary
//    @Bean
//    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
//        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
//        redisTemplate.setConnectionFactory(connectionFactory);
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
//        return redisTemplate;
//    }
////    @Bean
////    @Primary
////    public RedisTemplate<String, Object> redisTemplate() {
////        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
////        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
////        redisTemplate.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());
//////        redisTemplate.setValueSerializer(new StringRedisSerializer());
////
////        redisTemplate.setConnectionFactory(redisConnectionFactory());
////        return redisTemplate;
////
////    }
//    @Bean
//    public RedisMessageListenerContainer redisMessageListenerContainer(RedisConnectionFactory connectionFactory,
//                                                                       RedisKeyExpirationListener keyExpirationListener) {
//        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
//        container.setConnectionFactory(connectionFactory);
//        container.addMessageListener(new MessageListenerAdapter(keyExpirationListener), new PatternTopic("__keyevent@0__:expired"));
//        return container;
//    }
//
//}