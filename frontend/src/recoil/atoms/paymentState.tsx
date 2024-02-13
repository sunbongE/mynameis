import { atom } from 'recoil';

export interface PaymentProps {
  payUrl: string;
  tid: string;
  partner_order_id: number;
}

export const paymentState = atom<PaymentProps>({
  key: 'paymentState',
  default: {
    payUrl: '',
    tid: '',
    partner_order_id: 0,
  },
});
