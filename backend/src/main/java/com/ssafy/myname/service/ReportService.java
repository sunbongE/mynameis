//package com.ssafy.myname.service;
//
//import com.ssafy.myname.db.entity.Report;
//import com.ssafy.myname.db.repository.ReportRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@Service
//public class ReportService {
//
//    private ReportRepository reportRepository;
//    @Autowired
//    public ReportService(ReportRepository reportRepository) {
//        this.reportRepository = reportRepository;
//    }
//    @Transactional
//    public void deleteByRoomId(String roomId) {
//        reportRepository.deleteByRoomId(roomId);
//    }
//
//    public Report findByRoomIdAndReportedIdAndReportType(String roomId, String reportedId, String reportType) {
//        return reportRepository.findByRoomIdAndReportedIdAndReportType(roomId, reportedId, reportType);
//    }
//
//    public List<Report> findByRoomId(String roomId) {
//        return reportRepository.findByRoomId(roomId);
//    }
//    public void save(Report report) {
//        reportRepository.save(report);
//    }
//    public List<Report> findAll() {
//        return reportRepository.findAll();
//    }
//}
