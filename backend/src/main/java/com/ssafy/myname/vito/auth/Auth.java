package com.ssafy.myname.vito.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

// 인증 토큰 요청
@Component
@PropertySource("classpath:application.properties")
public class Auth {

    @Value("${client-id}")
    private String clientId;

    @Value("${client-secret}")
    private String clientSecret;

    public String getToken() throws IOException {

        URL url = new URL("https://openapi.vito.ai/v1/authenticate");
        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("POST");
        httpConn.setRequestProperty("accept", "application/json");
        httpConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        httpConn.setDoOutput(true);

        String data = "client_id=" + clientId + "&client_secret=" + clientSecret;
        System.out.println(data);

        byte[] out = data.getBytes(StandardCharsets.UTF_8);

        OutputStream stream = httpConn.getOutputStream();
        stream.write(out);

        InputStream responseStream = httpConn.getResponseCode() / 100 == 2
                ? httpConn.getInputStream()
                : httpConn.getErrorStream();
        Scanner s = new Scanner(responseStream).useDelimiter("\\A");
        String response = s.hasNext() ? s.next() : "";
        s.close();

        // System.out.println("전체 응답: " + response);

        // JSON 파싱을 통해 access_token 값을 추출해야 합니다.
        // 이 부분은 간단한 예시이며, 실제로는 JSON 라이브러리를 사용하여 처리해야 합니다.
        int startIndex = response.indexOf("access_token\":\"") + "access_token\":\"".length();
        int endIndex = response.indexOf("\",\"expire_at\"");

        String token = response.substring(startIndex, endIndex);

        // System.out.println("추출된 access_token: " + token);
        return token;
    }
}
