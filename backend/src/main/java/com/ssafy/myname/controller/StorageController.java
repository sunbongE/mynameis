package com.ssafy.myname.controller;

import com.ssafy.myname.service.FirebaseStorageService;
import com.ssafy.myname.service.ProfanityFilter;
import com.ssafy.myname.vito.auth.AuthSTT;
import com.ssafy.myname.vito.batch.GetTranscribe;
import com.ssafy.myname.vito.batch.PostTranscribe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@RestController
@RequestMapping("/auth")
public class StorageController {

    private final FirebaseStorageService storageService;
    private final AuthSTT auth;
    private final ProfanityFilter profanityFilter;

    @Autowired
    public StorageController(FirebaseStorageService storageService, AuthSTT auth, ProfanityFilter profanityFilter) {
        this.storageService = storageService;
        this.auth = auth;
        this.profanityFilter = profanityFilter;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadAndDownloadFile(@RequestParam("file") MultipartFile file,
                                                        @RequestParam("roomId") String roomId,
                                                        @RequestParam("reporterId") String reporterId,
                                                        @RequestParam("reportedId") String reportedId,
                                                        @RequestParam("reportType") String reportType) {
        try {
            // 파일 업로드
            String fileName = file.getOriginalFilename();
            String reportId = storageService.uploadFile(file, fileName, roomId, reporterId, reportedId, reportType);

            if (reportId == null) {
                return new ResponseEntity<>("Failed to upload file", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            System.out.println("[Firebase에 영상이 업로드 되었습니다.]");  // <===============================================출력문=====================

            switch (reportType) {
                case "욕설":
                case "성희롱":
                    // 토큰 가져오기
                    String token = auth.getToken();
                    System.out.println("accessToken: " + token);  // <===============================================출력문=====================
                    // 파일 다운로드
                    InputStream in = storageService.downloadFile(reportId);
                    if (in == null) {
                        return new ResponseEntity<>("Failed to download file", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                    System.out.println("[Firebase로부터 영상을 읽었습니다. STT 변환을 POST요청 해 보겠습니다.]");  // <===============================================출력문=====================
                    // STT 변환 요청
                    PostTranscribe postTranscribe = new PostTranscribe();
                    String transcribeId = postTranscribe.transcribe(token, in);  // InputStream을 직접 전달

                    if (transcribeId == null) {
                        return new ResponseEntity<>("Failed to transcribe file", HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                    System.out.println("[STT 변환 요청이 완료 되었습니다. 5초 기다립니다.]");  // <===============================================출력문=====================
                    // 5초 대기
                    Thread.sleep(5000);
                    System.out.println("[5초 잘 기다렸습니다. GET 요청을 실행합니다.]");  // <===============================================출력문=====================
                    // STT 변환 결과 가져오기
                    GetTranscribe getTranscribe = new GetTranscribe();
                    String allMsgs = null;
                    while (allMsgs == null) {
                        allMsgs = getTranscribe.getTranscription(transcribeId, token);  // GET 요청을 보내 STT 결과 가져오기
                        Thread.sleep(1000);  // 1초간 대기
                    }
                    System.out.println("[STT 출력 결과에 따른 필터링 알고리즘을 실행시키겠습니다.]");  // <===============================================출력문=====================
                    // 욕설 필터링
                    //String filterFile = reportType.equals("욕설") ? "src/main/resources/f_words.txt" : "src/main/resources/s_words.txt";
                    //boolean isProfanityDetected = profanityFilter.filterProfanity(allMsgs, filterFile);
                    String filterFileName = reportType.equals("욕설") ? "/f_words.txt" : "/s_words.txt";
                    InputStream filterFileStream = getClass().getResourceAsStream(filterFileName);
                    boolean isProfanityDetected = profanityFilter.filterProfanity(allMsgs, filterFileStream);


                    if (isProfanityDetected) { // 욕설이나 성희롱 단어가 검출되었으면
                        String deleteMessage = storageService.deleteReport(reportId); // 동영상 파일 삭제
                        System.out.println("[검출 완료 후 파일을 삭제하겠습니다.]");  // <===============================================출력문=====================
                        return new ResponseEntity<>(deleteMessage, HttpStatus.OK);
                    }

                    return new ResponseEntity<>("File transcribed successfully", HttpStatus.OK);

                default:
                    // 그 외의 경우, 오로지 파일 업로드만 수행
                    return new ResponseEntity<>("File uploaded successfully", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to process request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{reportId}")
    public ResponseEntity<String> deleteReport(@PathVariable String reportId) {
        String message = storageService.deleteReport(reportId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}

