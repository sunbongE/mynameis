package com.ssafy.myname.dto.response.matching;

import com.ssafy.myname.dto.response.ResponseDto;
import com.ssafy.myname.dto.response.auth.CheckCertificationResDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@Getter
public class MatchingAcceptResponseDto extends ResponseDto {

    public MatchingAcceptResponseDto() {
        super();
    }
    public static ResponseEntity<?> join(){
        Map<String,String> resBody = new HashMap<>();
        resBody.put("code","202");
        resBody.put("msg","매칭 대기열에 참여");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(resBody);
    }

    public static ResponseEntity<?> fail(){
        Map<String,String> resBody = new HashMap<>();
        resBody.put("code","500");
        resBody.put("msg","매칭 대기열이 초과되었습니다.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resBody);
    }
    public static ResponseEntity<?> cancle(){
        Map<String,String> resBody = new HashMap<>();
        resBody.put("code","200");
        resBody.put("msg","매칭을 취소하였습니다.");
        return ResponseEntity.status(HttpStatus.OK).body(resBody);
    }
    public static ResponseEntity<?> already(){
        Map<String,String> resBody = new HashMap<>();
        resBody.put("code","400");
        resBody.put("msg","이미 매칭 중 입니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resBody);
    }

}
