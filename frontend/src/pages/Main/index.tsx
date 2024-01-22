import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = () => {
  return <MainContainer></MainContainer>;
};

export default Main;
