import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserActive, setTernSkippedOrNot } from '../App/Slices/TernSlice';
import { upDateDice } from '../App/Slices/DiceSlice.js';
import { setChangeColorInterval, clearChangeColorInterval } from '../App/Slices/IntervalSlice.js';
import { unLockTern } from '../App/Slices/MoveControllerSlice.js';
import AvailableTernSlice, { addAvailableTern, removeAvailableTern } from '../App/Slices/AvailableTernSlice.js';
import './Dice.css';
import DiceRollingSould from '../audio/diceRollingSoundEffect.mp3'
import ReadyToRallSound from '../audio/readyToRoll.mp3'
import { setUserFinishedTern, resetFinishedTern } from '../App/Slices/TernSlice';
import { setNextUserActive } from '../App/Slices/TernSlice';
const Dice = (props) => {
    const [random, newRandom] = useState(Math.floor(Math.random() * 6) + 1);
    const [showNum1, setShowNum1] = useState();
    const [roll, setRoll] = useState('none');
    const [colorDecolor, setColorDecolor] = useState(`${props.props.backgroundColor}`);
    const [isDisabledDice, setIsDisabledDice] = useState(false);
    const [diceClass, setDiceClass] = useState(props.props.backgroundColor == "rgb(36,113,255)" ? "blue" : props.props.backgroundColor)
    const currentTern = useSelector((state) => state.ternHandler);
    const diceState = useSelector((state) => state.diceNumber);
    const availableChance = useSelector((state) => state.availableTern);
    const homeStatus = useSelector((state) => state.HomeStatus)
    const isTokenWon = useSelector((state) => state.isTokenWon);
    const tokenPosition = useSelector((state) => state.tokenPosition);
    const dispatch = useDispatch();
    const myColor = props.props.backgroundColor;
    const givenProps = { ...props.props, backgroundColor: `${colorDecolor}` };

    // holding the sould effect and play the sound
    const playDiceSould = (soundName) => {
        const diceSound = new Audio(DiceRollingSould);
        const readyToRollSound = new Audio(ReadyToRallSound);
        switch (soundName) {
            case "roll":
                diceSound.play();
                break;
            case "readyToRoll":
                readyToRollSound.play();
                break;

            default:
                break;
        }


    }

    useEffect(() => {
        if (currentTern.isTernSkipped) {
            // Handle the skipped turn by marking the turn as finished after 2.5 seconds
            setTimeout(() => {
                dispatch(setUserFinishedTern());
            }, 2500);
            dispatch(setTernSkippedOrNot(false)); // Reset skip status
        }
    
        if (currentTern.isTernFinished) {
            // Handle moving to the next user if the turn is finished
            setTimeout(() => {
                dispatch(setNextUserActive());
            }, 50); // Adjust this delay if needed
        }
    }, [currentTern.isTernFinished, currentTern.isTernSkipped]);
    

    useEffect(() => {
        ColorDecolorDice();
        return () => {
            setColorDecolor(myColor)
            dispatch(clearChangeColorInterval());
            playDiceSould("readyToRoll"); // Optional sound
        };

    }, [currentTern.ActiveUser]);

    const ColorDecolorDice = () => {
        if (myColor === currentTern.ActiveUser) {
            const colorHandler = () => {
                switch (currentTern.ActiveUser) {
                    case "rgb(36,113,255)":
                        setColorDecolor(prevColor => prevColor === "rgb(36,113,255)" ? "hsl(219,100%,42%)" : "rgb(36,113,255)");
                        break;
                    case "red":
                        setColorDecolor(prevColor => prevColor === "red" ? "hsl(0,100%,35%)" : "red");
                        break;
                    case "green":
                        setColorDecolor(prevColor => prevColor === "green" ? "hsl(120,100%,20%)" : "green");
                        break;
                    case "yellow":
                        setColorDecolor(prevColor => prevColor === "yellow" ? "hsl(60,100%,35%)" : "yellow");
                        break;
                    default:
                        break;
                }
            };
            // Clear any existing interval before setting a new one
            dispatch(clearChangeColorInterval());
            // Set the new interval
            const intervalId = setInterval(() => {
                colorHandler();
            }, 500);
            dispatch(setChangeColorInterval(intervalId));
        }
    };
    const canToknMoveConditionCheaker = (allInHomeColor, allInVictoryColor, numberOfOutsideTokensColor, numberOfTokenWonColor) => {

        // Condition 1: when the token can't move
        if (((allInHomeColor && random !== 6) || allInVictoryColor)) {
            // because user can't move therfore we set the user has done his move and we  retruning false
            dispatch(setTernSkippedOrNot(true))
            return false;
        }
        // Condition 2: when the token can move
        else if ((numberOfOutsideTokensColor > 0) && !(numberOfOutsideTokensColor == numberOfTokenWonColor) || (allInHomeColor && random == 6)) {
            // because user can move therfore we set the user has done his move and  we retruning true
            setTernSkippedOrNot(false);
            dispatch(resetFinishedTern());
            return true
        }
        else {
            return null
        }
    }

    function canTokenMove(currentTern, random, tokenPosition, homeStatus, isTokenWon, diceState, tokens) {
        switch (currentTern.ActiveUser) {
            case "rgb(36,113,255)":
                // Check if all tokens are either in the home or in the victory area
                const allInHomeBlue = homeStatus.blueToken.every(token => token === 'inside');
                const allInVictoryBlue = isTokenWon.blueToken.every(token => token === true);
                const numberOfOutsideTokensBlue = homeStatus.blueToken.filter(token => token === "outside").length
                const numberOfIntsideTokensBlue = homeStatus.blueToken.filter(token => token === "inside").length
                const numberOfTokenWonBlue = isTokenWon.blueToken.filter(token => token === "true").length
                const conditionResultBlue = canToknMoveConditionCheaker(allInHomeBlue, allInVictoryBlue, numberOfOutsideTokensBlue, numberOfTokenWonBlue);
                return conditionResultBlue
                break;
            case "red":
                const allInHomeRed = homeStatus.redToken.every(token => token === 'inside');
                const allInVictoryRed = isTokenWon.redToken.every(token => token === true);
                const numberOfOutsideTokensRed = homeStatus.redToken.filter(token => token === "outside").length;
                const numberOfIntsideTokensRed = homeStatus.redToken.filter(token => token === "inside").length;
                const numberOfTokenWonRed = isTokenWon.redToken.filter(token => token === "true").length;
                const conditionResultRed = canToknMoveConditionCheaker(allInHomeRed, allInVictoryRed, numberOfOutsideTokensRed, numberOfTokenWonRed);
                return conditionResultRed

                break;
            case "green":
                const allInHomeGreen = homeStatus.greenToken.every(token => token === 'inside');
                const allInVictoryGreen = isTokenWon.greenToken.every(token => token === true);
                const numberOfOutsideTokensGreen = homeStatus.greenToken.filter(token => token === "outside").length;
                const numberOfIntsideTokensGreen = homeStatus.greenToken.filter(token => token === "inside").length;
                const numberOfTokenWonGreen = isTokenWon.greenToken.filter(token => token === "true").length;
                const conditionResultGreen = canToknMoveConditionCheaker(allInHomeGreen, allInVictoryGreen, numberOfOutsideTokensGreen, numberOfTokenWonGreen);
                return conditionResultGreen;
                break;
            case "yellow":
                const allInHomeYellow = homeStatus.yellowToken.every(token => token === 'inside');
                const allInVictoryYellow = isTokenWon.yellowToken.every(token => token === true);
                const numberOfOutsideTokensYellow = homeStatus.yellowToken.filter(token => token === "outside").length;
                const numberOfIntsideTokensYellow = homeStatus.yellowToken.filter(token => token === "inside").length;
                const numberOfTokenWonYellow = isTokenWon.yellowToken.filter(token => token === "true").length;
                const conditionResultYellow = canToknMoveConditionCheaker(allInHomeYellow, allInVictoryYellow, numberOfOutsideTokensYellow, numberOfTokenWonYellow);
                return conditionResultYellow;
                break;
            default:
                break;
        }

    }

    const changeFace = () => {
        setRoll("rolling 2s");
        // dispatch(removeTernFinished(myColor));
        setTimeout(() => {
            dispatch(upDateDice([myColor, random]));
            dispatch(unLockTern([myColor, random, homeStatus]));
            switch (random) {
                case 1:
                    setShowNum1('rotateX(0deg) rotateY(0deg)');
                    break;
                case 6:
                    setShowNum1('rotateX(180deg) rotateY(0deg)');
                    break;
                case 2:
                    setShowNum1('rotateX(-90deg) rotateY(0deg)');
                    break;
                case 5:
                    setShowNum1('rotateX(90deg) rotateY(0deg)');
                    break;
                case 3:
                    setShowNum1('rotateX(0deg) rotateY(90deg)');
                    break;
                case 4:
                    setShowNum1('rotateX(0deg) rotateY(-90deg)');
                    break;
                default:
                    break;
            }
            if (myColor !== currentTern.ActiveUser) {
                dispatch(clearChangeColorInterval());
            }
            setRoll('none');
        }, 2050);
    };


    // ^^^^^^^^^^^^^^^%%%%%%%%%%% DICE MASTER FUCTION %%%%%%%%%%%%^^^^^^^^^^^^^^^
    const randomDice = async () => {
        // dispatch(movePlayer());
        setIsDisabledDice(true); // diabling the dice till then change tern
        function allElementAreInside(arr) {  // this fuction will cheack that all the tokens insie of token home
            return arr.every(element => element === "inside");
        }
        playDiceSould("roll");// Sould played when a user clicks on the dice
        const randomChal = Math.floor(Math.random() * 6) + 1;
        const { blueDice, redDice, greenDice, yellowDice } = diceState;
        if (currentTern.ActiveUser === "rgb(36,113,255)") {
            const firstOfLast = blueDice.at(-1);
            const secondOfLast = blueDice.at(-2);
            if ((firstOfLast === 6) && (secondOfLast === 6)) {
                newRandom(Math.floor(Math.random() * 5) + 1);
            } else {
                // this condition will give player number 6 when he roll the dice more than 12 times and his token still locked and he never got 6 before
                if (((blueDice.length >= 12) && (blueDice.length <= 14)) && (allElementAreInside(homeStatus.blueToken)) && (!(randomChal == 6)) && (!blueDice.includes(6))) {
                    newRandom(6)
                } else {
                    newRandom(randomChal);
                }
            }
        }
        else if (currentTern.ActiveUser === "red") {
            const firstOfLast = redDice.at(-1);
            const secondOfLast = redDice.at(-2);
            if ((firstOfLast === 6) && (secondOfLast === 6)) {
                newRandom(Math.floor(Math.random() * 5) + 1)
            } else {
                // this condition will give player number 6 when he roll the dice more than 12 times and his token still locked and he never got 6 before
                if (((redDice.length >= 12) && (redDice.length <= 14)) && (allElementAreInside(homeStatus.redToken)) && (!(randomChal == 6)) && (!redDice.includes(6))) {
                    newRandom(6)
                } else {
                    newRandom(randomChal);
                }
            }
        }
        else if (currentTern.ActiveUser === "green") {
            const firstOfLast = greenDice.at(-1);
            const secondOfLast = greenDice.at(-2);
            if ((firstOfLast === 6) && (secondOfLast === 6)) {
                newRandom(Math.floor(Math.random() * 5) + 1)
            } else {
                // this condition will give player number 6 when he roll the dice more than 12 times and his token still locked and he never got 6 before
                if (((greenDice.length >= 12) && (greenDice.length <= 14)) && (allElementAreInside(homeStatus.greenToken)) && (!(randomChal == 6)) && (!greenDice.includes(6))) {
                    newRandom(6)
                } else {
                    newRandom(randomChal);
                }
            }
        }
        else if (currentTern.ActiveUser === "yellow") {
            const firstOfLast = yellowDice.at(-1);
            const secondOfLast = yellowDice.at(-2);
            if ((firstOfLast === 6) && (secondOfLast === 6)) {
                newRandom(Math.floor(Math.random() * 5) + 1)
            } else {
                // this condition will give player number 6 when he roll the dice more than 12 times and his token still locked and he never got 6 before
                if (((yellowDice.length >= 12) && (yellowDice.length <= 14)) && (allElementAreInside(homeStatus.yellowToken)) && (!(randomChal == 6)) && (!yellowDice.includes(6))) {
                    newRandom(6)
                } else {
                    newRandom(randomChal);
                }
            }
        }
        changeFace();
        const review = await canTokenMove(currentTern, random, tokenPosition, homeStatus, isTokenWon, diceState);
        if (review) {
        } else {
            if (currentTern.isTernSkipped) {
                dispatch(setNextUserActive())
                dispatch(setTernSkippedOrNot(false))

            }
            else if (currentTern.isTernSkipped === false) {
                if (currentTern.isTernFinished) {
                    dispatch(setNextUserActive())
                }
            } else {
                console.warn("something went wrong!")
            }

        }

        setTimeout(() => {
            setIsDisabledDice(false);
        }, 2500);
    };

    return (
        <div className={`dice-container ${diceClass}`} style={givenProps}>
            <div className="dice" onClick={((myColor === currentTern.ActiveUser) && (!isDisabledDice)) ? randomDice : null} style={{ transform: `${showNum1}`, animation: `${roll}` }}>
                <div className="face front"></div>
                <div className="face back"></div>
                <div className="face top"></div>
                <div className="face bottom"></div>
                <div className="face right"></div>
                <div className="face left"></div>
            </div>
        </div>
    );
};

export default Dice;
