package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.meeting.MRandomName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MnameRepository extends JpaRepository<MRandomName, Integer> {



}
