package com.ssafy.myname.provider;

import com.ssafy.myname.db.entity.meeting.Questions;
import com.ssafy.myname.db.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class QuestionProvider {
    private final QuestionRepository questionRepository;
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    /**
     * 데이터베이스에서 모든 질문을 가져와서 질문 내용만을 추출하여 리스트로 반환합니다.
     *
     * @return 질문 내용으로 이루어진 문자열 리스트
     */
    public List<String> getQuestions() {
        // QuestionRepository를 통해 모든 질문을 조회하고 스트림을 활용하여 각 질문의 내용만 추출한 뒤 리스트로 변환합니다.

        return questionRepository.findAll()
                .stream()
                .map(Questions::getContents)
                .collect(Collectors.toList());
    }

    /**
     * 질문 목록 중에서 랜덤하게 3개의 질문을 선택하여 반환합니다.
     *
     * @return 랜덤한 3개의 질문으로 이루어진 문자열 리스트
     */
    public List<String> getRandomQuestions() {
        List<String> allQuestions = getQuestions();
        logger.info("allQuestions : {} ",allQuestions);

        // 질문 목록이 3개 이하인 경우 전체 목록을 반환
        if (allQuestions.size() <= 3) {
            return allQuestions;
        }

        // 랜덤으로 3개의 질문을 선택하여 반환
        Collections.shuffle(allQuestions, new Random());
        return allQuestions.subList(0, 3);
    }
}