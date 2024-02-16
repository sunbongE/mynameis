package com.ssafy.myname.commons;

public interface ResponseMessage {
    String SUCCESS = "Success.";
    String VALIDATION_FAIL = "Validation_fail.";
    String DUPLICATE_ID = "Duplicate_id.";

    String SING_IN_FAIL ="Login information mismatch.";

    String CERTIFICATION_FAIL = "Certification failed.";
    String MAIL_FAIL ="Mail_send_failed.";
    String DATABASE_ERROR = "Database error.";
    String DUPLICATE_PHONE = "Duplicate_phone";
    String MATCHING_FAIL = "Matching_fail";
}
