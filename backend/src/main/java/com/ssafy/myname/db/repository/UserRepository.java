package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

@Repository
public class MemberRepository {

    @PersistenceContext
    private EntityManager em;

    public long save(User user){
        em.persist(user);
        return user.getUserPk();
    }

    public User find(Long id){
        return  em.find(User.class,id);
    }

}
