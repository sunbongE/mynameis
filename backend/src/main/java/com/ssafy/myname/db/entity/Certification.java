package com.ssafy.myname.db.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Certification {

    @Id
    private String userId;
    @NotNull
    @Column(unique = true,nullable = false)
    private String email;
    @NotNull
    private String certificationNumber;

    public Certification(String userId, String email, String certificationNumber) {
        this.userId = userId;
        this.email=email;
        this.certificationNumber=certificationNumber;
    }

    @Override
    public String toString() {
        return "Certification{" +
                "userId='" + userId + '\'' +
                ", email='" + email + '\'' +
                ", certificationNumber='" + certificationNumber + '\'' +
                '}';
    }
}
