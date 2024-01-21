package com.ssafy.myname.provider;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class EmailProvider {

    private final JavaMailSender javaMailSender;

    private final String SUBJECT = "[저의 이름은] 인증메일입니다.";

    public boolean sendCertificationMail(String email, String certificationNumber){

        try{

            MimeMessage msg = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(msg,true);

            String htmlContent = getCertificationMsg(certificationNumber);

            messageHelper.setTo(email);
            messageHelper.setSubject(SUBJECT);
            messageHelper.setText(htmlContent,true);
            javaMailSender.send(msg);

        }catch (Exception exception){
            exception.printStackTrace();
            return false;
        }
        return true;
    }
    private String getCertificationMsg(String certificationNumber){
        String certificationMsg="";
        certificationMsg += "<h1 style='text-align: center;'>[저의 이름은 서비스] 인증메일<h1>";
        certificationMsg += "<h3 style='text-align: center;'>인증코드 : <strong style=' font-size: 32px; letter-spacing:8px;'>"+certificationNumber+"<h3>";
        return certificationMsg;
    }
}
