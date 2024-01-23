import styled from "styled-components";
import Icon from '../icon/Icon';
import { Coin } from '../../config/IconName';
import { useState } from "react";


interface CoinProps {
    id:number,
    coinText: string,
    coinPrice: number,
}

const StyleCoinListItem = styled.div`
    width: 339.2px;
    height: 38.4px;
    border-radius: var(--Radius-2, 16px);
    
    background: #FFF;
    box-shadow: 0px 0px 16px 1.6px rgba(0, 0, 0, 0.10);
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    
    const [selectedCoinIdx, setSelectedCoinIdx] = useState<number>(props.id)

    console.log(selectedCoinIdx)

    return (
        <StyleCoinListItem className={selectedCoinIdx === props.id ? 'active' : ''}  onClick={() => setSelectedCoinIdx(props.id)} >
            <div style={{ display: 'flex' }} >
                <Icon src={Coin} />
                <StyleCoinText> {props.coinText} </StyleCoinText>
            </div>
            <StylePrice> {props.coinPrice} </StylePrice>
        </StyleCoinListItem>
    )
}

export default CoinListItem