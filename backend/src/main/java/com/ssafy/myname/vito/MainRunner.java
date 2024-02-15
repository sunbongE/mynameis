package com.ssafy.myname.vito;

import com.ssafy.myname.vito.auth.AuthSTT;
import com.ssafy.myname.vito.batch.GetTranscribe;
import com.ssafy.myname.vito.batch.PostTranscribe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;

import java.io.IOException;

//@SpringBootApplication
public class MainRunner {
//
//    private final AuthSTT auth;
//
//    @Autowired
//    public MainRunner(AuthSTT auth) {
//        this.auth = auth;
//    }
//
//    public static void main(String[] args) throws IOException {
//        SpringApplication.run(MainRunner.class, args);
//    }
//
////    @PostConstruct
//    public void run() throws Exception {
//        //인증 토큰 요청
//        String token = auth.getToken();
//
//        //POST 요청
//        PostTranscribe postTranscribe = new PostTranscribe();
//        String transcribeToken = postTranscribe.transcribe(token);
//
//        //GET 요청
//        GetTranscribe getTranscribe = new GetTranscribe();
//        Thread.sleep(5000);  // 5초 대기
//
//        //전사 결과를 담을 String 변수
//        String transcription;
//        do {
//            transcription = getTranscribe.getTranscription(transcribeToken, token);
//            if (transcription == null) {
//                Thread.sleep(1000);  //전사 작업이 완료되지 않은 경우 1초 동안 대기
//            }
//        } while (transcription == null);
//
//        //전사 결과 출력
//        //return을 통해 결과 출력 필요 시 transcription 사용할 것.
//        //System.out.println(transcription);
//    }
}
