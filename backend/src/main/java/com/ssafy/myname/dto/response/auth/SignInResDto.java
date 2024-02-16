package com.ssafy.myname.dto.response.auth;

import com.ssafy.myname.commons.ResponseCode;
import com.ssafy.myname.commons.ResponseMessage;
import com.ssafy.myname.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignInResDto extends ResponseDto {

    private String token;
    private int expirationTime;

    public SignInResDto( String token) {
        super();
        this.token = token;
        this.expirationTime=3600;
    }

    public static ResponseEntity<SignInResDto> success (String token){
        SignInResDto resBody = new SignInResDto(token);
        return ResponseEntity.status(HttpStatus.OK).body(resBody);
    }

    public static ResponseEntity<ResponseDto> fail(){
        ResponseDto resBody = new ResponseDto(ResponseCode.SING_IN_FAIL, ResponseMessage.SING_IN_FAIL);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resBody);
    }
}
