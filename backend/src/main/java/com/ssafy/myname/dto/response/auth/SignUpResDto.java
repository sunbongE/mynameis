package com.ssafy.myname.dto.response.auth;

import com.ssafy.myname.commons.ResponseCode;
import com.ssafy.myname.commons.ResponseMessage;
import com.ssafy.myname.dto.request.auth.SignUpReqDto;
import com.ssafy.myname.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignUpResDto extends ResponseDto{

    private SignUpResDto(){
        super();
    }

    public static ResponseEntity<SignUpResDto> success(){
        SignUpResDto resBody = new SignUpResDto();
        return ResponseEntity.status(HttpStatus.OK).body(resBody);
    }

    public static ResponseEntity<ResponseDto> duplicateId(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATE_ID, ResponseMessage.DUPLICATE_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
    public static ResponseEntity<ResponseDto> fail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.CERTIFICATION_FAIL, ResponseMessage.CERTIFICATION_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
    }


}
