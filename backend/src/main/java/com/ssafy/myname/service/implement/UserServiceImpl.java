package com.ssafy.myname.service.implement;

import com.ssafy.myname.db.entity.Tags;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.TagRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.request.users.ModifyUserDto;
import com.ssafy.myname.dto.response.ResponseDto;
import com.ssafy.myname.dto.response.auth.GetUserInfoResDto;
import com.ssafy.myname.provider.EmailProvider;
import com.ssafy.myname.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Logger logger =  LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final EmailProvider emailProvider;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public GetUserInfoResDto getUserInfo(Principal principal) {
        logger.info("** getUserInfo ServiceImpl 실행 ");

        if (principal == null) {
            return null;
        }

        User user = userRepository.findByUserId(principal.getName());
        logger.info("user : {}", user);

        GetUserInfoResDto dto = new GetUserInfoResDto(user);
        logger.info("dto : {}", dto);

        List<Tags> tags = tagRepository.findAllByUser(user);
        logger.info("tags : {}", tags);
        dto.addTags(tags);


        return dto ;
    }

    @Override
    public ResponseEntity<?> modifyTag(String userId, List<String> tagNameList) {
        User user = userRepository.findByUserId(userId);
        logger.info("user : {} ",user);
        // 기존 태그들 전부 삭제.
        tagRepository.deleteAllByUser(user);
        logger.info(" 전부 삭제됨 ");
        for (String tagname : tagNameList) {
            tagRepository.save(new Tags(user, tagname));
        }
        return ResponseDto.ok();

    }

    @Override
    public ResponseEntity<?> modifyUser(String userId, ModifyUserDto modifyUserDto) {
        User user = userRepository.findByUserId(userId);
        user.setGender(modifyUserDto.getGender());
        user.setBirth(modifyUserDto.getBirth());
        user.setArea(modifyUserDto.getArea());
        user.setJob(modifyUserDto.getJob());
        user.setReligion(modifyUserDto.getReligion());
        userRepository.save(user);
        return ResponseDto.ok();
    }

    @Override
    public ResponseEntity<?> leave(String userId) {
        User user = userRepository.findByUserId(userId);
        user.setLeave(true);
        userRepository.save(user);
        return ResponseDto.ok();
    }

    @Override
    public void emailUrl(String userId) {
        try{
            User user = userRepository.findByUserId(userId);
            String email = user.getEmail();
            boolean isSuccess = emailProvider.sendMail(email);
            if(!isSuccess) {
                logger.info("** 없는 이메일 ");
            }

        }catch (Exception e){
            logger.info(e.getMessage());

        }
        logger.info("** 이메일 전송");
    }

    @Override
    public ResponseEntity<?> emailModify(String userId, String password) {
        try {
            User user = userRepository.findByUserId(userId);
            String newPassword = passwordEncoder.encode(password);
            user.setPassword(newPassword);
            userRepository.save(user);

            return ResponseDto.ok();
        }catch (Exception e){
            logger.info(e.getMessage());
            return ResponseDto.databaseError();
        }
    }

    @Override
    public void increaseReportPoint(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 아이디의 사용자를 찾을 수 없습니다."));
        user.setReportPoint(user.getReportPoint() + 1);
        userRepository.save(user);
    }
}
