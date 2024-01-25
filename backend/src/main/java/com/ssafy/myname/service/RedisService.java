package com.ssafy.myname.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class RedisService {
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    /**
     * 지정된 키에 해당하는 데이터를 가져옵니다.
     *
     * @param key 가져올 데이터의 키
     * @return 해당 키에 대한 데이터 값
     */
    public String getData(String key){
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        return valueOperations.get(key);
    }
    /**
     * 지정된 키에 데이터를 저장합니다.
     *
     * @param key   저장할 데이터의 키
     * @param value 저장할 데이터 값
     */
    public void setData(String key, String value){
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(key, value);
    }
    /**
     * 지정된 키에 데이터를 저장하고, 지정된 기간 후에 데이터를 만료시킵니다.
     *
     * @param key      저장할 데이터의 키
     * @param value    저장할 데이터 값
     * @param duration 데이터의 만료 기간 (초 단위)
     */
    public void setDataExpire(String key, String value, long duration){
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        Duration expiredDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expiredDuration);
    }
    /**
     * 지정된 키에 해당하는 데이터를 삭제합니다.
     *
     * @param key 삭제할 데이터의 키
     */
    public void deleteData(String key){
        stringRedisTemplate.delete(key);
    }
}
