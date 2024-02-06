package com.ssafy.myname.dto.request.kakaopay;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApproveRequest {

    private int partner_order_id;
    private String tid;
    private String partner_user_id;
    private String pg_token;
}