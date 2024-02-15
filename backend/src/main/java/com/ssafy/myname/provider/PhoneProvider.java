//package com.ssafy.myname.provider;
//
//import jakarta.annotation.PostConstruct;
//import net.nurigo.sdk.NurigoApp;
//import net.nurigo.sdk.message.model.Message;
//import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
//import net.nurigo.sdk.message.response.SingleMessageSentResponse;
//import net.nurigo.sdk.message.service.DefaultMessageService;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//@Component
//public class PhoneProvider {
//
//    @Value("${sms-api-key}")
//    private String smsApiKey;
//
//    @Value("${sms-api-secret}")
//    private String smsApiSecretKey;
//
//    private DefaultMessageService messageService;
//
////    @PostConstruct
//    public void init() {
//        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
//        this.messageService = NurigoApp.INSTANCE.initialize(smsApiKey, smsApiSecretKey, "https://api.coolsms.co.kr");
//    }
//
//    /**
//     * 단일 메시지 발송
//     */
//    public boolean sendCertificationPhone(String phone, String certificationNumber) {
//
//        try {
//            Message message = new Message();
//
//            String htmlContent = getCertificationMsg(certificationNumber);
//
//            message.setFrom("01057197759");
//            message.setTo(phone);
//            message.setText(htmlContent);
//
//            SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
//            System.out.println(response);
//            //return response;
//
//        } catch (Exception exception) {
//            exception.printStackTrace();
//            return false;
//        }
//        return true;
//    }
//    private String getCertificationMsg(String certificationNumber){
//        String certificationMsg="";
//        certificationMsg += "[저의 이름은]본인확인 인증번호";
//        certificationMsg += "[" + certificationNumber + "]입니다.\n";
//        certificationMsg += "\"타인 노출 금지\"";
//        return certificationMsg;
//    }
//}
