import React, { useState } from "react";
import { Coin } from '../../config/IconName';
import CoinListItem from "./CoinListItem";
import styled from "styled-components";

const StyleCoinList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

function CoinList() {
    const [selectedCoinId, setSelectedCoinId] = useState<number | null>(null);

    const coinItems = [
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
    ];

    const handleItemClick = (id: number) => {
        setSelectedCoinId((prevId) => (prevId === id ? null : id));
    };

    return (
        <StyleCoinList>
            {coinItems.map((item) => (
                <CoinListItem
                    key={item.id}
                    id={item.id}
                    coinText={item.coinText}
                    coinPrice={item.coinPrice}
                    isSelected={selectedCoinId === item.id}
                    onClick={() => handleItemClick(item.id)}
                />
            ))}
        </StyleCoinList>
    );
}

export default CoinList;
