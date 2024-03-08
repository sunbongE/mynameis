package com.ssafy.myname.dto.response.email;

import com.ssafy.myname.commons.ResponseCode;
import com.ssafy.myname.commons.ResponseMessage;
import com.ssafy.myname.dto.response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class EmailResponseDto extends ResponseDto{

    private EmailResponseDto(){
        super();
    }

    public static ResponseEntity<EmailResponseDto> success(){
        EmailResponseDto responseBody = new EmailResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
    public static ResponseEntity<ResponseDto> duplicateId(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATE_ID, ResponseMessage.DUPLICATE_ID);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
    }
    public static ResponseEntity<ResponseDto> mailSendFail(){
        ResponseDto responseBody = new ResponseDto(ResponseCode.MAIL_FAIL, ResponseMessage.MAIL_FAIL);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
    }
}
