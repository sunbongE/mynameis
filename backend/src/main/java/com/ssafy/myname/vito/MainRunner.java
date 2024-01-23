package com.ssafy.myname.vito;

import com.ssafy.myname.vito.auth.Auth;
import com.ssafy.myname.vito.batch.GetTranscribe;
import com.ssafy.myname.vito.batch.PostTranscribe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;

@SpringBootApplication
public class MainRunner {

    private final Auth auth;

    @Autowired
    public MainRunner(Auth auth) {
        this.auth = auth;
    }

    public static void main(String[] args) throws IOException {
        SpringApplication.run(MainRunner.class, args);
    }

    @PostConstruct
    public void run() throws Exception {
        String token = auth.getToken();
        System.out.println(token);

        PostTranscribe postTranscribe = new PostTranscribe();
        String transcribeToken = postTranscribe.transcribe(token);

        // 5초 지연...
        Thread.sleep(5000);

        GetTranscribe getTranscribe = new GetTranscribe();
        getTranscribe.getTranscription(transcribeToken, token);
    }
}
