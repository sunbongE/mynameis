//package com.ssafy.myname.vito.batch;
//
//import org.json.JSONArray;
//import org.json.JSONObject;
//
//import java.io.InputStream;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.util.Scanner;
//
//public class GetTranscribe {
//    public String getTranscription(String transcribeId, String accessToken) throws Exception {
//
//        URL url = new URL("https://openapi.vito.ai/v1/transcribe/" + transcribeId);
//        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
//        httpConn.setRequestMethod("GET");
//        httpConn.setRequestProperty("accept", "application/json");
//        httpConn.setRequestProperty("Authorization", "Bearer " + accessToken);
//
//        InputStream responseStream = httpConn.getResponseCode() / 100 == 2
//                ? httpConn.getInputStream()
//                : httpConn.getErrorStream();
//        Scanner s = new Scanner(responseStream).useDelimiter("\\A");
//        String response = s.hasNext() ? s.next() : "";
//        s.close();
//
//        //System.out.println(response);  // 응답 결과 테스트
//
//        JSONObject jsonResponse = new JSONObject(response);
//        String status = jsonResponse.getString("status");
//        if (status.equals("completed")) {
//            JSONArray utterances = jsonResponse.getJSONObject("results").getJSONArray("utterances");
//            StringBuilder allMsgs = new StringBuilder();
//            for (int i = 0; i < utterances.length(); i++) {
//                String msg = utterances.getJSONObject(i).getString("msg");
//                //System.out.println(msg);  // 메시지 결과 테스트
//                allMsgs.append(msg).append("\n");
//            }
//            return allMsgs.toString();
//        } else if (status.equals("transcribing")) {
//            return null;  // transcribing 중이므로 null 반환
//        } else if (status.equals("failed")) {
//            return "STT GETrequest is failed";
//        } else {
//            throw new Exception("STT_GET_Response error: " + status);  // 예상하지 못한 상태면 예외 발생
//        }
//    }
//}
