package com.ssafy.myname.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class PhoneCertification {

    @Id
    private String phoneId;

    @NotNull
    private String certificationNumber;

    public PhoneCertification(String phoneId, String certificationNumber) {
        this.phoneId = phoneId;
        this.certificationNumber = certificationNumber;
    }

    @Override
    public String toString() {
        return "PhoneCertification{" +
                "phoneId='" + phoneId + "'" + '\'' +
                ", certificationNumber='" + certificationNumber + "'" + '\'' +
                '}';
    }
}
