//package com.ssafy.myname.config;
//
//import com.ssafy.myname.dto.request.chat.ChatDto;
////import com.ssafy.myname.service.RedisSubscriber;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.context.annotation.Primary;
//import org.springframework.data.redis.connection.RedisConnectionFactory;
//import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
//import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
//import org.springframework.data.redis.core.RedisKeyValueAdapter;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.data.redis.listener.ChannelTopic;
//import org.springframework.data.redis.listener.RedisMessageListenerContainer;
//import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
//import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
//import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
//import org.springframework.data.redis.serializer.StringRedisSerializer;
//
//@Slf4j
//@Configuration
////@EnableRedisRepositories(enableKeyspaceEvents = RedisKeyValueAdapter.EnableKeyspaceEvents.ON_STARTUP)
//public class RedisConfig {
//
//    @Value("${spring.data.redis.host}")
//    private String host;
//
//    @Value("${spring.data.redis.port}")
//    private int port;
//    @Value("${spring.data.redis.password}")
//    private String  pwd;
//
//    /**
//     * 단일 Topic 사용을 위한 Bean 설정
//     */
//    @Bean
//    public ChannelTopic channelTopic() {
//        return new ChannelTopic("/sub/chat");
//    }
//
//    /**
//     * redis에 발행(publish)된 메시지 처리를 위한 리스너 설정
//     */
//
//
//    @Bean
//    public RedisConnectionFactory redisConnectionFactory() {
//        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(host,port);
//        config.setPassword(pwd);
//        return new LettuceConnectionFactory(config);
//    }
//
//    @Bean
//    @Primary
//    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
//        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
//        redisTemplate.setKeySerializer(new StringRedisSerializer());
//        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));
//        redisTemplate.setHashKeySerializer(new StringRedisSerializer());
//        redisTemplate.setHashValueSerializer(new StringRedisSerializer());
//        redisTemplate.setConnectionFactory(connectionFactory);
//        return redisTemplate;
//    }
//
//    @Bean
//    public RedisMessageListenerContainer redisMessageListenerContainer(RedisConnectionFactory connectionFactory,
//                                                                       MessageListenerAdapter listenerAdapter,
//                                                                       ChannelTopic channelTopic) {
//        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
//        container.setConnectionFactory(connectionFactory);
//        container.addMessageListener(listenerAdapter, channelTopic);
//        return container;
//    }
//    /**
//     * 실제 메시지를 처리하는 subscriber 설정 추가
//     */
//    @Bean
//    public MessageListenerAdapter listenerAdapter(RedisSubscriber subscriber) {
//      log.info("listenerAdapter 실행.");
//        return new MessageListenerAdapter(subscriber, "onMessage");
//    }
//    // Redis 에 메시지 내역을 저장하기 위한 RedisTemplate 을 설정
//    @Bean
//    public RedisTemplate<String, ChatDto> redisTemplateMessage(RedisConnectionFactory connectionFactory) {
//        RedisTemplate<String, ChatDto> redisTemplateMessage = new RedisTemplate<>();
//        redisTemplateMessage.setConnectionFactory(connectionFactory);
//        redisTemplateMessage.setKeySerializer(new StringRedisSerializer());                             // Key Serializer
//        redisTemplateMessage.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));       // Value Serializer
//
//        return redisTemplateMessage;
//    }
//}