//package com.ssafy.myname.controller;
//
//import com.google.api.core.ApiFuture;
//import com.google.cloud.firestore.*;
//import com.google.firebase.cloud.FirestoreClient;
//import com.ssafy.myname.db.entity.Report;
//import com.ssafy.myname.dto.request.report.RoomDto;
////import com.ssafy.myname.service.FirebaseStorageService;
//import com.ssafy.myname.service.ProfanityFilter;
//import com.ssafy.myname.service.ReportService;
//import com.ssafy.myname.service.UserService;
//import com.ssafy.myname.vito.auth.AuthSTT;
//import com.ssafy.myname.vito.batch.GetTranscribe;
//import com.ssafy.myname.vito.batch.PostTranscribe;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.InputStream;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.concurrent.ExecutionException;
//
//@RestController
//@RequestMapping("/auth")
//@RequiredArgsConstructor
//public class StorageController {
//
////    private final FirebaseStorageService storageService;
//    private final AuthSTT auth;
//    private final ProfanityFilter profanityFilter;
//    private final UserService userService;
//    private final ReportService reportService;
//
////    @Autowired
////    public StorageController(FirebaseStorageService storageService, AuthSTT auth, ProfanityFilter profanityFilter, UserService userService, ReportService reportService) {
////        this.storageService = storageService;
////        this.auth = auth;
////        this.profanityFilter = profanityFilter;
////        this.userService = userService;
////        this.reportService = reportService;
////    }
//
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadAndDownloadFile(@RequestParam("file") MultipartFile file,
//                                                        @RequestParam("roomId") String roomId,
//                                                        @RequestParam("userId") String userId) {
//        try {
//            //파일 업로드
//            String reportId = storageService.uploadFile(file, roomId, userId);
//            if (reportId == null) {
//                return new ResponseEntity<>("Failed to upload file", HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//            return new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>("Failed to process request", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @PostMapping("/report")
//    public ResponseEntity<String> createReport(@RequestBody Report report) {
//        Report existingReport = reportService.findByRoomIdAndReportedIdAndReportType(report.getRoomId(), report.getReportedId(), report.getReportType());
//
//        if (existingReport == null) {
//            reportService.save(report);
//            return new ResponseEntity<>("Report created successfully", HttpStatus.CREATED);
//        } else {
//            return new ResponseEntity<>("Report already exists", HttpStatus.CONFLICT);
//        }
//    }
//
//    @PostMapping("/checkReport")
//    public ResponseEntity<String> getVideoUrls(@RequestBody RoomDto roomDto) {
//        String roomId = roomDto.getRoomId();
//        List<Report> reports = reportService.findByRoomId(roomId);
//
//        Firestore db = FirestoreClient.getFirestore();
//        ApiFuture<QuerySnapshot> future;
//        for (Report report : reports) {
//            String reportedId = report.getReportedId();
//            String reportType = report.getReportType();
//            String timeStamp = report.getTimeStamp();
//            future = db.collection("reports").get();
//            try {
//                List<QueryDocumentSnapshot> documents = future.get().getDocuments();
//                for (QueryDocumentSnapshot document : documents) {
//                    String documentId = document.getId();
//                    if (documentId.startsWith(roomId + "_" + reportedId + "_")) {
//                        String videoUrl = document.getString("videoUrl");
//
//                        // 필터링 종류 분석
//                        String filterFileName = null;
//                        switch (reportType) {
//                            case "욕설" -> {
//                                filterFileName = "/f_words.txt";
//                                break;
//                            }
//                            case "성희롱" -> {
//                                filterFileName = "/s_words.txt";
//                                break;
//                            }
//                            default -> {
//                                String newDocumentId = "Check_" + documentId;
//                                DocumentReference newDocRef = db.collection("reports").document(newDocumentId);
//
//                                // 새로운 문서에 필드 추가
//                                Map<String, Object> data = new HashMap<>();
//                                data.put("roomId", roomId);
//                                data.put("reportedId", reportedId);
//                                data.put("reportType", reportType);
//                                data.put("videoUrl", videoUrl);
//                                newDocRef.set(data).get();  // set() 메서드를 사용하여 새로운 문서에 필드 추가
//
//                                // 기존 문서 삭제
//                                DocumentReference oldDocRef = db.collection("reports").document(documentId);
//                                oldDocRef.delete().get();
//
//                                continue; // 욕설도 성희롱도 아닙니다.
//                            }
//                        }
//
//                        // 동영상 파일 다운로드
//                        InputStream in = storageService.downloadFile(videoUrl);
//
//                        // 토큰 가져오기
//                        String token = auth.getToken();
//
//                        // STT 변환 요청
//                        PostTranscribe postTranscribe = new PostTranscribe();
//                        String transcribeId = postTranscribe.transcribe(token, in);  // InputStream을 직접 전달
//
//                        // 5초 대기
//                        Thread.sleep(5000);
//
//                        // STT 변환 결과 가져오기
//                        GetTranscribe getTranscribe = new GetTranscribe();
//                        String allMsgs = null;
//                        while (allMsgs == null) {
//                            allMsgs = getTranscribe.getTranscription(transcribeId, token);  // GET 요청을 보내 STT 결과 가져오기
//                            Thread.sleep(1000);  // 1초간 대기
//                        }
//
//                        // 비속어 필터링
//                        InputStream filterFileStream = getClass().getResourceAsStream(filterFileName);
//                        boolean isProfanityDetected = profanityFilter.filterProfanity(allMsgs, filterFileStream);
//
//                        if (isProfanityDetected) { // 욕설이나 성희롱 단어가 검출되었으면
//                            userService.increaseReportPoint(reportedId); // User의 'report_point' 필드의 값에 +1
//                        } else {  // 검출되지 않으면
//                            // Firebase에 접근하여 "Check_"를 붙여 새로운 문서 생성
//                            String newDocumentId = "Check_" + documentId;
//                            DocumentReference newDocRef = db.collection("reports").document(newDocumentId);
//
//                            // 새로운 문서에 필드 추가
//                            Map<String, Object> data = new HashMap<>();
//                            data.put("roomId", roomId);
//                            data.put("reportedId", reportedId);
//                            data.put("reportType", reportType);
//                            data.put("videoUrl", videoUrl);
//                            newDocRef.set(data).get();  // set() 메서드를 사용하여 새로운 문서에 필드 추가
//
//                            // 기존 문서 삭제
//                            DocumentReference oldDocRef = db.collection("reports").document(documentId);
//                            oldDocRef.delete().get();
//                        }
//                    }
//                }
//            } catch (InterruptedException | ExecutionException e) {
//                e.printStackTrace();
//            } catch (Exception e) {
//                throw new RuntimeException(e);
//            }
//        }
//        // 삭제 로직 작성
//        future = db.collection("reports").get();
//        try {
//            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
//            for (QueryDocumentSnapshot document : documents) {
//                String documentId = document.getId();
//
//                if (documentId.startsWith(roomId)) {  // roomId 값으로 시작하는 문서만 삭제합니다.
//                    // Storage에서 동영상 파일 삭제
//                    String deleteMessage = storageService.deleteReport(documentId);
//                    System.out.println(deleteMessage);
//
//                    // Firestore에서 문서 삭제
//                    DocumentReference docRef = db.collection("reports").document(documentId);
//                    docRef.delete().get();
//                }
//            }
//        } catch (InterruptedException | ExecutionException e) {
//            e.printStackTrace();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//        reportService.deleteByRoomId(roomId);  // 신고 테이블에 roomId와 같은 필드들을 삭제
//        return new ResponseEntity<>("Success", HttpStatus.OK);
//    }
//
//    @DeleteMapping("/delete/{reportId}")
//    public ResponseEntity<String> deleteReport(@PathVariable String reportId) {
//        String message = storageService.deleteReport(reportId);
//        return new ResponseEntity<>(message, HttpStatus.OK);
//    }
//}
