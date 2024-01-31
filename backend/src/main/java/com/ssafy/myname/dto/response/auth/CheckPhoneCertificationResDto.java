package com.ssafy.myname.dto.response.auth;

import com.ssafy.myname.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class CheckPhoneCertificationResDto extends ResponseDto {

    private CheckPhoneCertificationResDto() {
        super();
    }

    public static ResponseEntity<CheckPhoneCertificationResDto> success(){
        CheckPhoneCertificationResDto resBody = new CheckPhoneCertificationResDto();
        return ResponseEntity.status(HttpStatus.OK).body(resBody);
    }

    public static ResponseEntity<ResponseDto> fail() {
        ResponseDto resDto = new ResponseDto();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resDto);
    }
}
