package com.ssafy.myname.dto.response.auth;

import com.ssafy.myname.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class CheckCertificationResDto  extends ResponseDto{

    private CheckCertificationResDto(){
        super();
    }

    public static ResponseEntity<CheckCertificationResDto> success(){
        CheckCertificationResDto resBody = new CheckCertificationResDto();
        return ResponseEntity.status(HttpStatus.OK).body(resBody);
    }

    public static ResponseEntity<ResponseDto> fail(){
        ResponseDto resDto = new ResponseDto();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resDto);
    }
}
