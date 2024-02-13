package com.ssafy.myname.db.repository;

import com.ssafy.myname.db.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findByRoomIdAndReportedIdAndReportType(String roomId, String reportedId, String reportType);
    List<Report> findByRoomId(String roomId);
    void deleteByRoomId(String roomId);
}
