package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.Tags;
import com.ssafy.myname.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tags,Long> {

    List<Tags> findAllByUser(User user);

    void deleteAllByUser(User user);
}
