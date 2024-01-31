package com.ssafy.myname.dto.response.auth;

import com.ssafy.myname.dto.response.ResponseDto;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class NewAccessTokenResDto extends ResponseDto {

    private String token;
    private String name;

    public NewAccessTokenResDto(String token, String name) {
        this.token = token;
        this.name = name;
    }
    public static ResponseEntity<NewAccessTokenResDto> success (String token, String name){
        NewAccessTokenResDto resBody = new NewAccessTokenResDto(token,name);
        return ResponseEntity.status(HttpStatus.OK).body(resBody);
    }
}
