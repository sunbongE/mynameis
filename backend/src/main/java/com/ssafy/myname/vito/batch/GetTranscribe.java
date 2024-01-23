package com.ssafy.myname.vito.batch;

import com.ssafy.myname.vito.auth.Auth;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ApplicationContext;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class GetTranscribe {
    public void getTranscription(String transcribeId, String accessToken) throws Exception {

        URL url = new URL("https://openapi.vito.ai/v1/transcribe/" + transcribeId);
        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("GET");
        httpConn.setRequestProperty("accept", "application/json");
        httpConn.setRequestProperty("Authorization", "Bearer " + accessToken);

        InputStream responseStream = httpConn.getResponseCode() / 100 == 2
                ? httpConn.getInputStream()
                : httpConn.getErrorStream();
        Scanner s = new Scanner(responseStream).useDelimiter("\\A");
        String response = s.hasNext() ? s.next() : "";
        s.close();
        
        System.out.println(response);
    }
}
