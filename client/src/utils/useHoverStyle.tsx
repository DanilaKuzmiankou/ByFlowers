import React, {useState} from 'react';
import {buyButtonDefaultStyle, buyButtonHoverStyle} from "../themes";

export default function useHoverStyle() {
    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>(buyButtonDefaultStyle)

    const buyButtonOverElementsStyle = {
        position: "absolute",
        bottom: "10px",
        left: "20px",
        right: "20px",
    } as React.CSSProperties

    const onItemHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle({...buyButtonHoverStyle, ...buyButtonOverElementsStyle})
    }

    const onItemNotHover = (event: React.MouseEvent<HTMLDivElement>) => {
        setButtonStyle({...buyButtonDefaultStyle, ...buyButtonOverElementsStyle})
    }

    return {buttonStyle, onItemHover, onItemNotHover}
};

