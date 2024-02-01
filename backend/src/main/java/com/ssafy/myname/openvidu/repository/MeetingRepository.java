package com.ssafy.myname.openvidu.repository;

import com.ssafy.myname.db.entity.meeting.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Room,Long> {


}
