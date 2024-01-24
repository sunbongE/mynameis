import styled from "styled-components";
import Icon from '../icon/Icon';
import { Coin } from '../../config/IconName';


interface CoinProps {
    id:number,
    coinText: string,
    coinPrice: number,
    isSelected: boolean,
    onClick: () => void,
}

const StyleCoinListItem = styled.div<{ isSelected: boolean }>`
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

const StylePrice = styled.button`
    width: 53.6px;
    height: 22.4px;
    border-radius: 9.81px;
    border: 0.596px solid var(--primary-primary-700, #E1A3B3);
    background: var(--primary-primary-700, #E1A3B3);
`

const StyleCoinText = styled.div`
    color: #000;
    font-family: Pretendard;
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
        <StyleCoinListItem isSelected={props.isSelected} onClick={props.onClick}>
            <div style={{ display: 'flex' }}>
                <Icon src={Coin} />
                <StyleCoinText>{props.coinText}</StyleCoinText>
            </div>
            <StylePrice>{props.coinPrice}</StylePrice>
        </StyleCoinListItem>
    );
}


export default CoinListItem