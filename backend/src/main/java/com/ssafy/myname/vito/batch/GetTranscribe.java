package com.ssafy.myname.vito.batch;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class GetTranscribe {
    public String getTranscription(String transcribeId, String accessToken) throws Exception {

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

        JSONObject jsonResponse = new JSONObject(response);
        if (jsonResponse.getString("status").equals("completed")) {
            JSONArray utterances = jsonResponse.getJSONObject("results").getJSONArray("utterances");
            StringBuilder allMsgs = new StringBuilder();
            for (int i = 0; i < utterances.length(); i++) {
                String msg = utterances.getJSONObject(i).getString("msg");
                System.out.println(msg);
                allMsgs.append(msg).append(" ");
            }
            return allMsgs.toString();
        } else {
            return null;
        }
    }
}
