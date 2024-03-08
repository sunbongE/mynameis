import styled from "styled-components";
import Icon from '../icon/Icon';
import { Coin } from '../../config/IconName';


interface CoinProps {
    id:number,
    coinText: string,
    coinPrice: string,
    isSelected: boolean,
    onClick: () => void,
}

const StyledCoinListItem = styled.div<{ isSelected: boolean }>`
    width: 339.2px;
    height: 38.4px;
    border-radius: var(--Radius-2, 16px);
    background: #FFF;
    box-shadow: 0px 0px 16px 1.6px rgba(0, 0, 0, 0.10);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor:pointer;

    ${(props) => props.isSelected && `
        border: 2px solid #E1A3B3 ;
    `}
`

const StyledPrice = styled.button`
    width: 70px;
    height: 22.4px;
    border-radius: 9.81px;
    color: white;
    font-family: 'Pretendard-Light';
    font-style: normal;
    font-weight: 600;
    border: 0.596px solid var(--primary-primary-700, #E1A3B3);
    background: var(--primary-primary-700, #E1A3B3);
    margin-right: 10px;
`

const StyledCoinText = styled.div`
    color: #000;
    font-family: 'Pretendard-Light';
    font-size: 12.8px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
`


function CoinListItem(props: CoinProps) {
    return (
        <StyledCoinListItem isSelected={props.isSelected} onClick={() => props.onClick()}>
            <div style={{ display: 'flex', alignItems:"center", marginLeft:"8px" }}>
                <Icon src={Coin} />
                <StyledCoinText>{props.coinText}</StyledCoinText>
            </div>
            <StyledPrice>{props.coinPrice}</StyledPrice>
        </StyledCoinListItem>
    );
}


export default CoinListItem