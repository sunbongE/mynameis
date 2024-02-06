package com.ssafy.myname.vito.auth;

import org.json.JSONObject;
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
public class AuthSTT {

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

        byte[] out = data.getBytes(StandardCharsets.UTF_8);

        OutputStream stream = httpConn.getOutputStream();
        stream.write(out);

        InputStream responseStream = httpConn.getResponseCode() / 100 == 2
                ? httpConn.getInputStream()
                : httpConn.getErrorStream();
        Scanner s = new Scanner(responseStream).useDelimiter("\\A");
        String response = s.hasNext() ? s.next() : "";
        s.close();

        // JSON 역직렬화
        JSONObject jsonResponse = new JSONObject(response);
        if(jsonResponse.has("access_token")) {
            String token = jsonResponse.getString("access_token");  // access_token 값 추출
            return token;  // token 반환
        } else {
            String error = jsonResponse.getString("msg");  // 오류 메시지 추출
            throw new IOException("STT_Authentication error: " + error);
        }
    }
}
