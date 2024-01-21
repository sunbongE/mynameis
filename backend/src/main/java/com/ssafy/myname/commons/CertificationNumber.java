package com.ssafy.myname.commons;

public class CertificationNumber {

    public static String getCertificationNumber(){
        String certificationNumber="";

        for (int cnt=0; cnt<4;cnt++ ) {
            certificationNumber += (int) (Math.random()*10);
        }
        return certificationNumber;
    }
}
