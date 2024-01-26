package com.ssafy.myname.db.repository;

import com.ssafy.myname.dto.request.auth.RefreshTokenDto;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends CrudRepository<RefreshTokenDto,String> {
    Optional<String> findByUserId(String userId);
}
