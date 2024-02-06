package com.ssafy.myname.provider;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class EmailProvider {

    @Value("${password_change_url}")
    private String CHANGE_URL;
    private final JavaMailSender javaMailSender;

    private final String SUBJECT = "[저의 이름은] 비밀번호 변경 링크";


    // 이메일에 보내는 메시지를 생성.
    private String getCertificationMsg(String email){
        String certificationMsg="";
        certificationMsg += "<h1 style='text-align: center;'>[저의 이름은 서비스] 비밀번호 변경 링크<h1>\n";
        certificationMsg += "<a href="+CHANGE_URL+"?email="+email+">이동하기</a>";
        return certificationMsg;
    }

    // 변경가능한 이메일을 보낼 예정.
    public boolean sendMail(String email) {
        try{

            MimeMessage msg = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(msg,true);

            String htmlContent = getCertificationMsg(email);

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
}
