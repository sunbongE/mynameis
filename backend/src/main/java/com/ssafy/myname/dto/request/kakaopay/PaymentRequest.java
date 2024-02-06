package com.ssafy.myname.dto.request.kakaopay;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {

    private int partner_order_id;
    private String partner_user_id;
    private String item_name;
    private int total_amount;
}
