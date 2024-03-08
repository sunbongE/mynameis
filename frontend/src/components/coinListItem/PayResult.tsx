import axios from "axios";
import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { paymentState } from "../../recoil/atoms/paymentState";
import { useState, useEffect } from "react";
import { userCoinPaymentConfirm } from "../../apis/services/user/user";
import { userInfoState } from "../../recoil/atoms/userState";




const Button = styled.button`
  width: 500px;
  height: 500px;
`
const PayResult = () => {

    const navigate = useNavigate();
    const location = useLocation();
    console.log('로케이션 : ', location)
    const payResultUrl = location.search;
    const pgToken = payResultUrl.split('=')[1];
    console.log('페이url : ', payResultUrl, '피지토큰 : ' , pgToken);

    const payState = useRecoilValue(paymentState)
    const [popup, setPopup] = useState<Window | null>(null);
    const handlePopup = () => {
      // 팝업 창 열기
      const newPopup = window.open(payState.payUrl, '_blank', 'width=600,height=800');
      if (newPopup) {
        setPopup(newPopup);
      }
    };
    


    const userInfo = useRecoilValue(userInfoState)
    const [payApproveData, setPayApproveData ] = useState({
      tid: window.localStorage.getItem("tid"),
      partner_user_id: userInfo?.userId,
      partner_order_id: payState.partner_order_id,
      pg_token:'',
    })
    

    //apprval_url 을 통해서 받아온 현재 주소에는 pg_token값이 붙어있다. 이를 추출하여야 함
    //현재 로케이션값을 통해 어떤 값을 가져와야하는지 알 수 있다.
    //search르 통해서 ?뒤에 붙은 값을 가져온다
    //=뒤에 붙은 pg_token값을 가져온다.
    //최종 token값이 완성된다.
    const handleApprove = async () => {    
        try {       

          const response = await userCoinPaymentConfirm(payApproveData)

          console.log(response); // 결제 요청 결과 확인 
          console.log(response.amount); // 가격확인
          console.log(response.amount.total); // 가격확인
          console.log(response.quantity); //수량 확인
          window.close();//결제 완료후 창이 닫긴다.
          
        } catch (error) {
          console.error("에러입니다1.");
          console.error(error);
        }
    };

    return (
        <Button onClick={handleApprove}>
                버튼을 누르면 결제가 완료됩니다.
        </Button>

    )
}
export default PayResult;