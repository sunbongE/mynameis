package com.ssafy.myname.service.implement;

import com.ssafy.myname.db.entity.Tags;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.TagRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.response.auth.GetUserInfoResDto;
import com.ssafy.myname.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.security.Principal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Logger logger =  LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    @PostMapping(value = "/getUserInfo")
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
    }
