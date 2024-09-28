import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import redGoti from '../Img/redGoti.png';
import blueGoti from '../Img/blueGoti.png';
import greenGoti from '../Img/greenGoti.png';
import yellowGoti from '../Img/yellowGoti.png';
import { setTokenWon } from '../App/Slices/isTokenWonSlice';
import { useDispatch } from 'react-redux';
const Goti = ({ color, tokenNum, moveToken }) => {
    const dispatch = useDispatch();
    useEffect(() => { gotiColorHandler() }, []);
    const tokenPosition = useSelector((state) => state.tokenPosition);
    const lockStatus = useSelector((state) => state.moveTokenController);
    const [gotiColor, setGotiColor] = useState(color);
    const [isGotiOnVictoryBox, setIsGotiOnVictoryBox] = useState(false);

    // this fuction hadle the color of token
    const gotiColorHandler = () => {
        if (color === "rgb(36,113,255)") {
            setGotiColor(blueGoti);
        }
        else if (color === "red") {
            setGotiColor(redGoti);
        }
        else if (color === "green") {
            setGotiColor(greenGoti);
        }
        else if (color === "yellow") {
            setGotiColor(yellowGoti);
        }
        else {
            console.log("Something went wrong!!!");
        }
    };



    const handleLock = () => {
        switch (color) {
            case "rgb(36,113,255)":
                if (lockStatus.blueToken == "unLocked") {
                    if (!(tokenPosition.blueToken[tokenNum - 1] === "bh6")) {
                        moveToken(color, tokenNum);
                    }
                    else {
                        setTokenWon(color, tokenNum)
                    }
                }
                break;
            case "red":
                if (lockStatus.redToken == "unLocked") {
                    if (!(tokenPosition.redToken[tokenNum - 1] === "rh6")) {
                        moveToken(color, tokenNum)
                    }
                    else {
                        setTokenWon(color, tokenNum)
                    }
                }
                break;
            case "green":
                if (lockStatus.greenToken == "unLocked") {
                    if (!(tokenPosition.greenToken[tokenNum - 1] === "gh6")) {
                        moveToken(color, tokenNum)
                    }
                    else {
                        setTokenWon(color, tokenNum)
                    }
                }
                break;
            case "yellow":
                if (lockStatus.yellowToken == "unLocked") {
                    if (!(tokenPosition.yellowToken[tokenNum - 1] === "yh6")) {
                        moveToken(color, tokenNum)
                    }
                    else {
                        setTokenWon(color, tokenNum)
                    }
                }
                break;
            default:
                break;
        }
    }
    return (
        <>
            <img src={gotiColor} className='goti-img' alt="" onClick={handleLock} />
        </>

    )
}

export default Goti
