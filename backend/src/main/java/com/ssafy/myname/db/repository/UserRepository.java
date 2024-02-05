package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.Couple;
import com.ssafy.myname.db.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,String> {

    boolean existsByUserId(String userId);
    boolean existsByPhone(String phone);
    boolean existsByEmail(String email);

    User findByUserId(String userId);
    User findByCouple(Couple couple);
    User findByEmail(String email);
}
