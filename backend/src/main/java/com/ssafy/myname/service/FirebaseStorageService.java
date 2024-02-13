package com.ssafy.myname.service;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.storage.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class FirebaseStorageService {

    private final Storage storage;
    private final Firestore firestore;

    public FirebaseStorageService() throws Exception {
        ClassPathResource resource = new ClassPathResource("serviceAccountKey.json");
        if (FirebaseApp.getApps().isEmpty()) {
            File file = resource.getFile();
            FileInputStream serviceAccount = new FileInputStream(file);
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://myname-e13be-default-rtdb.firebaseio.com/")
                    .build();

            FirebaseApp.initializeApp(options);
        }
        this.storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(resource.getInputStream()))
                .build()
                .getService();
        this.firestore = FirestoreClient.getFirestore();
    }

//        public String uploadFile(MultipartFile multipartFile, String fileName, String roomId, String reporterId, String reportedId, String reportType) {
//        try {
//            ByteArrayInputStream bais = new ByteArrayInputStream(multipartFile.getBytes());
//            BlobId blobId = BlobId.of("myname-e13be.appspot.com", fileName);
//            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();
//            storage.create(blobInfo, bais);
//            String url = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
//                    "myname-e13be.appspot.com", URLEncoder.encode(fileName, StandardCharsets.UTF_8.name()));
//
//            Map<String, Object> data = new HashMap<>();
//            data.put("roomId", roomId);
//            data.put("reporterId", reporterId);
//            data.put("reportedId", reportedId);
//            data.put("reportType", reportType);
//            data.put("videoUrl", url);
//            final String report = reporterId + "_" + System.currentTimeMillis();  // 신고 ID값 생성
//            ApiFuture<WriteResult> result = firestore.collection("reports").document(report).set(data);
//
//            // Firestore에 데이터가 저장될 때까지 대기합니다.
//            result.get();
//            return report;  // 신고 ID를 반환합니다.
//        } catch (Exception e) {
//            e.printStackTrace();
//            return null;
//        }
//    }
public String uploadFile(MultipartFile multipartFile, String roomId, String userId) {
        try {
            String timestamp = String.valueOf(System.currentTimeMillis());
            String fileName = roomId + "_" + userId + "_" + timestamp;
            ByteArrayInputStream bais = new ByteArrayInputStream(multipartFile.getBytes());
            BlobId blobId = BlobId.of("myname-e13be.appspot.com", fileName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(multipartFile.getContentType()).build();
            storage.create(blobInfo, bais);
            String url = String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media", "myname-e13be.appspot.com", URLEncoder.encode(fileName, StandardCharsets.UTF_8.name()));
            Map<String, Object> data = new HashMap<>();
            data.put("roomId", roomId);
            data.put("userId", userId);
            data.put("videoUrl", url);
            final String report = roomId + "_" + userId + "_" + System.currentTimeMillis();  // ID값 생성
            ApiFuture<WriteResult> result = firestore.collection("reports").document(report).set(data);

            result.get();
            return report;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

//    public InputStream downloadFile(String reportId) {
//        try {
//            DocumentSnapshot document = firestore.collection("reports").document(reportId).get().get();  // Firestore에서 문서를 읽어옵니다.
//            if (document.exists()) {
//                String videoUrl = document.getString("videoUrl");  // videoUrl 필드의 값을 읽어옵니다.
//                if (videoUrl != null) {
//                    URL url = new URL(videoUrl);  // videoUrl을 사용하여 파일을 다운로드 받습니다.
//                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//                    connection.setRequestMethod("GET");
//                    return connection.getInputStream();  // InputStream 반환
//                } else {
//                    System.out.println("No video URL found for report: " + reportId);
//                }
//            } else {
//                System.out.println("No document found with id: " + reportId);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
//    }
    public InputStream downloadFile(String videoUrl) {
        try {
            URL url = new URL(videoUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            return connection.getInputStream();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String deleteReport(String reportId) {
        try {
            DocumentSnapshot document = firestore.collection("reports").document(reportId).get().get();  // Firestore에서 문서를 읽어옵니다.
            if (document.exists()) {
                String videoUrl = document.getString("videoUrl");  // videoUrl 필드의 값을 읽어옵니다.
                if (videoUrl != null) {
                    // videoUrl에서 파일 경로를 추출합니다.
                    String filePath = videoUrl.replace("https://firebasestorage.googleapis.com/v0/b/myname-e13be.appspot.com/o/", "");
                    filePath = URLDecoder.decode(filePath, StandardCharsets.UTF_8.name());
                    filePath = filePath.substring(0, filePath.indexOf("?"));
                    storage.delete(BlobId.of("myname-e13be.appspot.com", filePath));  // Storage에서 파일을 삭제합니다.
                } else {
                    System.out.println("No video URL found for report: " + reportId);
                }
            } else {
                System.out.println("No document found with id: " + reportId);
            }
            ApiFuture<WriteResult> writeResult = firestore.collection("reports").document(reportId).delete();  // Firestore에서 문서를 삭제합니다.
            return "Report deleted successfully";  // 삭제 성공 메시지를 반환합니다.
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to delete report";  // 삭제 실패 메시지를 반환합니다.
        }
    }
}
