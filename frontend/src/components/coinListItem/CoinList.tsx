import { useState } from "react";
import { Coin } from '../../config/IconName';
import CoinListItem from "./CoinListItem";
import styled from "styled-components";

const StyleCoinList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

function CoinList() {

    const Coinitems = [
        {
            id: 0,
            coinText: '코인 10개',
            coinPrice: 1000,
        },
        {   
            id: 1,
            coinText: '코인 30개',
            coinPrice: 3000,
        },
        {
            id: 2,
            coinText: '코인 50개',
            coinPrice: 5000,
        },
    ]


    

    return (
        <StyleCoinList>
            {Coinitems.map((e) =>
                <CoinListItem key={e.id} id={e.id} coinText={e.coinText} coinPrice={e.coinPrice}/>
            )}
        </StyleCoinList>

    )

}

export default CoinList