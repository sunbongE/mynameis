import React, { useEffect } from "react";
import axios from "axios";

const PayResult = (props:any) => {
  useEffect(() => {
    const params = {
      cid: "TC0ONETIME",
      tid: window.localStorage.getItem("tid"),
      partner_order_id: "partner_order_id",
      partner_user_id: "partner_user_id",
      pg_token: props.location.search.split("=")[1],
    };

    axios({
      url: "/v1/payment/approve",
      method: "POST",
      headers: {
        Authorization: "KakaoAK de0e3076b485b703b1f1a4a2419440e6",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params,
    }).then((response) => {
      console.log(response);
    });
  }, [props.location.search]);

  return (
    <div>
      <h2>결제 결과 페이지</h2>
    </div>
  );
};

export default PayResult;