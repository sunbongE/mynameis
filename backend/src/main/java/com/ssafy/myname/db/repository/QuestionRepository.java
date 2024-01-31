package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.meeting.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Questions,Integer> {

}
