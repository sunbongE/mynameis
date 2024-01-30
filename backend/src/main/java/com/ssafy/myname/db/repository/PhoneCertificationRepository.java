package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.PhoneCertification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional(readOnly = true)
public interface PhoneCertificationRepository extends JpaRepository<PhoneCertification, Long> {

    PhoneCertification findByPhoneId(String phoneId);

    @Transactional
    void deleteByPhoneId(String phoneId);
}
