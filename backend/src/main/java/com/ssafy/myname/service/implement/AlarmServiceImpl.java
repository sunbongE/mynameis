//package com.ssafy.myname.service.implement;
//
//import com.ssafy.myname.db.entity.Alarm;
//import com.ssafy.myname.db.entity.User;
//import com.ssafy.myname.db.repository.AlarmRepository;
//import com.ssafy.myname.db.repository.UserRepository;
//import com.ssafy.myname.dto.response.alarm.GetAlarmResDto;
//import com.ssafy.myname.service.AlarmService;
//import lombok.RequiredArgsConstructor;
//import org.hibernate.annotations.DynamicInsert;
//import org.hibernate.annotations.DynamicUpdate;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//@DynamicUpdate
//public class AlarmServiceImpl implements AlarmService {
//
//    private final AlarmRepository alarmRepository;
//    private final UserRepository userRepository;
//    private final Logger logger = LoggerFactory.getLogger(this.getClass());
//
//    @Override
//    public ResponseEntity<?> getAlarm(String userId) {
//        User user = userRepository.findByUserId(userId);
////        List<Alarm> alarms = alarmRepository.findAllByReceiver(user);
//        List<Alarm> myAlarms = user.getMyAlarms();
//        List<GetAlarmResDto> response = new ArrayList<>();
//        if(!myAlarms.isEmpty()){
//            for (Alarm myAlarm : myAlarms) {
//                if (myAlarm.getIsRead()) continue;
//
//                GetAlarmResDto dto = new GetAlarmResDto();
//                dto.setAlarmId(myAlarm.getAlarmId());
//                dto.setMsg(myAlarm.getMsg());
//                response.add(dto);
//            }
//
//        }
//
//        logger.info("myAlarms : {}",myAlarms);
//        return ResponseEntity.status(HttpStatus.OK).body(response);
//    }
//
//    @Override
//    public ResponseEntity<?> readAlarm(List<Long> alarmsId) {
//        List<Alarm> readAlarmList = alarmRepository.findAllById(alarmsId);
//        for (Alarm alarm : readAlarmList) {
//            alarm.setIsRead(true);
//            alarmRepository.save(alarm);
//        }
//
//        return ResponseEntity.status(HttpStatus.OK).build();
//    }
//}
