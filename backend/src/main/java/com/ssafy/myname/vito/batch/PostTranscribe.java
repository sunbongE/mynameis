//package com.ssafy.myname.vito.batch;
//
//import org.json.JSONObject;
//
//import java.io.DataOutputStream;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.InputStream;
//import java.net.HttpURLConnection;
//import java.net.URL;
//import java.net.URLConnection;
//import java.util.Scanner;
//
//public class PostTranscribe {
//
//    public String transcribe(String accessToken, InputStream in) throws Exception {
//
//        URL url = new URL("https://openapi.vito.ai/v1/transcribe");
//        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
//        httpConn.setRequestMethod("POST");
//        httpConn.setRequestProperty("accept", "application/json");
//        httpConn.setRequestProperty("Authorization", "Bearer " + accessToken);
//        httpConn.setRequestProperty("Content-Type", "multipart/form-data;boundary=authsample");
//        httpConn.setDoOutput(true);
//
//        DataOutputStream outputStream;
//        outputStream = new DataOutputStream(httpConn.getOutputStream());
//
//        outputStream.writeBytes("--authsample\r\n");
//        outputStream.writeBytes("Content-Disposition: form-data; name=\"file\";filename=\"" + "uploadedFile" +"\"\r\n");
//        outputStream.writeBytes("Content-Type: audio/mp4\r\n");
//        outputStream.writeBytes("Content-Transfer-Encoding: binary" + "\r\n");
//        outputStream.writeBytes("\r\n");
//
//        byte[] buffer = new byte[4096];
//        int bytesRead = -1;
//        while ((bytesRead = in.read(buffer)) != -1) {
//            outputStream.write(buffer, 0, bytesRead);
//        }
//        outputStream.writeBytes("\r\n");
//        outputStream.writeBytes("--authsample\r\n");
//
//        outputStream.writeBytes("\r\n");
//        outputStream.writeBytes("--authsample\r\n");
//        outputStream.writeBytes("Content-Disposition: form-data; name=\"config\"\r\n");
//        outputStream.writeBytes("Content-Type: application/json\r\n");
//        outputStream.writeBytes("\r\n");
//        outputStream.writeBytes("{}");
//        outputStream.writeBytes("\r\n");
//        outputStream.writeBytes("--authsample--\r\n");
//        outputStream.flush();
//        outputStream.close();
//
//        InputStream responseStream = httpConn.getResponseCode() / 100 == 2
//                ? httpConn.getInputStream()
//                : httpConn.getErrorStream();
//        Scanner s = new Scanner(responseStream).useDelimiter("\\A");
//        String response = s.hasNext() ? s.next() : "";
//        s.close();
//
//        // JSON 역직렬화
//        JSONObject jsonResponse = new JSONObject(response);
//        if(jsonResponse.has("id")) {
//            String id = jsonResponse.getString("id");  // id 값 추출
//            return id;  // id 반환
//        } else {
//            String error = jsonResponse.getString("msg");  // 오류 메시지 추출
//            throw new Exception("STT_POST_Transcription error: " + error);
//        }
//    }
//}
