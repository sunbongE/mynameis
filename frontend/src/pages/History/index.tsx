import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token) {
      alert('로그인이 필요한 페이지입니다.');
      navigate('/');
    }
  }, [token]);

  return <div>지난 회의 내역</div>;
};

export default History;
