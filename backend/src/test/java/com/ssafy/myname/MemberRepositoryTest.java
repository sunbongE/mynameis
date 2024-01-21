//package com.ssafy.myname;
//
//import com.ssafy.myname.db.entity.Roles;
//import com.ssafy.myname.db.entity.User;
//import com.ssafy.myname.db.repository.MemberRepository;
//import jakarta.transaction.Transactional;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//
//@SpringBootTest
//public class MemberRepositoryTest {
//
//    @Autowired
//    MemberRepository userRepository;
//
//    @Test
//    @Rollback(value = false)
//    @Transactional
//    public void testMember() throws Exception{
//        // given
//        User user = new User();
//        user.setUserId("userA");
//        user.setPassword("123");
//        user.setName("userA");
//        user.setBirth("960421");
//        user.setGender(true);
//        user.setRole(Roles.USER);
//
//        User user1 = new User();
//        user1.setUserId("userW");
//        user1.setPassword("123");
//        user1.setName("userA");
//        user1.setBirth("960421");
//        user1.setGender(false);
//        userRepository.save(user1);
//        // when
//        long saveId = userRepository.save(user);
//        User finduser = userRepository.find(saveId);
////        System.out.println(finduser.toString());
//        // then
//        Assertions.assertThat(finduser.getUserPk()).isEqualTo(user.getUserPk());
//        Assertions.assertThat(finduser.getName()).isEqualTo(user.getName());
//        Assertions.assertThat(finduser).isEqualTo(user);
//
//    }
//
//}