import React, { useEffect, useState } from 'react'
import './Playground.css'
import ShowToken from './ShowToken'
import { useSelector, useDispatch } from 'react-redux'
import { setUserFinishedTern, setTernSkippedOrNot } from '../App/Slices/TernSlice'
import { releseToken, runToken, runTokenOnVictoryPath, takeTokenOnVictoryPath } from '../App/Slices/TokenPositionSlice';
import { lockTern } from '../App/Slices/MoveControllerSlice';
import { takeOutOneToken } from '../App/Slices/HomeStatusSlice';
import { setTokenInsideOfVictoryPath, setTokenOutsideOfVictoryPath } from '../App/Slices/isTokenOnVictoryPathSlice'
import { setLap, removeLap } from '../App/Slices/LapSlice';
// import { canTokenMove } from './Dice'
const Playground = () => {

    const Tern = useSelector((state) => state.ternHandler);
    const [argumentBlue, setArgumentBlue] = useState([])
    const [argumentRed, setArgumentRed] = useState([])
    const [argumentGreen, setArgumentGreen] = useState([])
    const [argumentYellow, setArgumentYellow] = useState([])
    const tokenPosition = useSelector((state) => state.tokenPosition);
    const diceNumObj = useSelector((state) => state.diceNumber);
    const moveTokenController = useSelector((state) => state.moveTokenController);
    const homeStatus = useSelector((state) => state.HomeStatus);
    const isTokenInVictoryBox = useSelector((state) => state.isTokenOnVictoryPath);
    const lapState = useSelector(state => state.lapSlice);
    // console.log(Tern)
    useEffect(() => {
        if (!argumentBlue.length == 0) {
            console.log("useEffect called ");
            const [tokenColor, tokenNum, diceAction, diceSecondLastNumberBlue] = argumentBlue;
            dispatch(takeTokenOnVictoryPath([tokenColor, tokenNum, diceAction, lapState]));
            if (diceSecondLastNumberBlue !== 6) {
                dispatch(setUserFinishedTern());
            }
            console.log("user seted to finished tern")
            setArgumentBlue([])
        }
        else if (!argumentRed.length == 0) {
            console.log("useEffect called ");
            const [tokenColor, tokenNum, diceAction,diceSecondLastNumberRed] = argumentRed;
            dispatch(takeTokenOnVictoryPath([tokenColor, tokenNum, diceAction, lapState]));
            if (diceSecondLastNumberRed !== 6) {
                dispatch(setUserFinishedTern());
            }
            console.log("user seted to finished tern")
            setArgumentRed([])
        }
        else if (!argumentGreen.length == 0) {
            console.log("useEffect called ");
            const [tokenColor, tokenNum, diceAction, diceSecondLastNumberGreen] = argumentGreen;
            dispatch(takeTokenOnVictoryPath([tokenColor, tokenNum, diceAction, lapState]));
            if (diceSecondLastNumberGreen !== 6) {
                dispatch(setUserFinishedTern());
            }
            console.log("user seted to finished tern")
            setArgumentGreen([])
        }
        else if (!argumentYellow.length == 0) {
            console.log("useEffect called ");
            const [tokenColor, tokenNum, diceAction,diceSecondLastNumber] = argumentYellow;
            dispatch(takeTokenOnVictoryPath([tokenColor, tokenNum, diceAction, lapState]));
            if (diceSecondLastNumber !== 6) {
                dispatch(setUserFinishedTern());
            }
            console.log("user seted to finished tern")
            setArgumentYellow([])
        }


    }, [argumentBlue, argumentRed, argumentGreen, argumentYellow])
    const dispatch = useDispatch();

    // some important fuctions

    // this fuction will update the state when the any token done 1 lap or remove 1 lap accoring to done or killed by another token,
    const setTokenDoneOneLap = (tokenColor, tokenNum, actionType) => {
        if (actionType === "set") {
            dispatch(setLap([tokenColor, tokenNum]));
            console.log("setTokenDoneOneLap has working with if condition");
        } else if (actionType === "remove") {
            dispatch(removeLap([tokenColor, tokenNum]));
            console.log("setTokenDoneOneLap has working with else condition");
        } else {
            console.error("condition has breacked in setTokenDoneOneLap")
        }
    };
    // this fuction will update the state when any token enterd victory path 
    const victoryPathBoxHandler = (tokenColor, tokenNum) => {
        dispatch(setTokenInsideOfVictoryPath([tokenColor, tokenNum]));
    };

    // <<<<<<<========= main master fuction that will move tokens =========>>>>>>>>>>
    const moveToken = (tokenColor, tokenNum) => {
        const { blueDice, redDice, greenDice, yellowDice } = diceNumObj;
        switch (tokenColor) {

            case "rgb(36,113,255)":
                const curretPositionBlue = tokenPosition.blueToken[tokenNum - 1];
                const diceLastNumberblue = blueDice[blueDice.length - 1];

                // this condition will release the token from home
                if ((homeStatus.blueToken[tokenNum - 1] === "inside") && (diceLastNumberblue === 6)) {
                    dispatch(releseToken(["blue", tokenNum, diceLastNumberblue]));
                    dispatch(takeOutOneToken(["blue", tokenNum, diceLastNumberblue]))
                    dispatch(lockTern("rgb(36,113,255)"));
                }
                else {
                    // the token have not opened then it will excute
                    // first we check is token on victory box?
                    if (isTokenInVictoryBox.blueToken[tokenNum - 1]) {
                        //hence the token is in victory path
                        console.log("token is on victory path!")
                        dispatch(runTokenOnVictoryPath(["blue", tokenNum, diceLastNumberblue]));
                        if (diceLastNumberblue !== 6) {
                            dispatch(setUserFinishedTern())
                        }
                        dispatch(lockTern("rgb(36,113,255)"));
                    }
                    else {

                        if (((curretPositionBlue + diceLastNumberblue) > 52) && (homeStatus.blueToken[tokenNum - 1] === "outside")) {
                            if (curretPositionBlue + diceLastNumberblue > 52) {
                                if ((curretPositionBlue + diceLastNumberblue === 53)) {
                                    setTokenDoneOneLap("blue", tokenNum, "set"); // setting the token has done 1 lap
                                    dispatch(runToken(["blue", tokenNum, diceLastNumberblue, curretPositionBlue, homeStatus]));
                                    if (diceLastNumberblue !== 6) {
                                        dispatch(setUserFinishedTern())
                                    }
                                    dispatch(lockTern("rgb(36,113,255)"));

                                } else {
                                    setTokenDoneOneLap("blue", tokenNum, "set"); // setting the token has done 1 lap
                                    // this state needs arguments tokenColor, tokenNum, diceAction, and lapstate
                                    //  by this state calling the fuction that will push the token in victory path
                                    setArgumentBlue(["blue", tokenNum, diceLastNumberblue - 1, blueDice[blueDice.length - 2]]);
                                    dispatch(setTokenInsideOfVictoryPath(["blue", tokenNum]));
                                    dispatch(lockTern("rgb(36,113,255)"));
                                }
                            }
                        }
                        else if ((curretPositionBlue === 1) && (lapState.blueToken[tokenNum - 1] === true)) {
                            setArgumentBlue(["blue", tokenNum, diceLastNumberblue, lapState, blueDice[blueDice.length - 2]]);
                            dispatch(setTokenInsideOfVictoryPath(["blue", tokenNum]));
                            dispatch(lockTern("rgb(36,113,255)"));
                        }
                        else {
                            dispatch(runToken(["blue", tokenNum, diceLastNumberblue, curretPositionBlue, homeStatus]));
                            if (diceLastNumberblue !== 6) {
                                dispatch(setUserFinishedTern())
                                console.log("user seted to finished tern")
                            }
                            dispatch(lockTern("rgb(36,113,255)"));
                        }
                    }

                }
                break;
            case "red":
                const currentPositionRed = tokenPosition.redToken[tokenNum - 1];
                const diceLastNumberRed = redDice[redDice.length - 1]
                if ((homeStatus.redToken[tokenNum - 1] === "inside") && (diceLastNumberRed === 6)) {
                    // this condition realse the token
                    dispatch(releseToken(["red", tokenNum, diceLastNumberRed]));
                    dispatch(takeOutOneToken(["red", tokenNum, diceLastNumberRed]))
                    dispatch(lockTern("red"));
                } else {
                    if ((currentPositionRed >= 1 && currentPositionRed <= 7)) {
                        // setting the token done 1 lap if the token has done one lap already then this will not set lap again
                        if (!lapState.redToken[tokenNum - 1]) {
                            setTokenDoneOneLap(tokenColor, tokenNum, "set");
                            console.log(`the ${tokenColor} and the tokenNum ${tokenNum} done 1 lap `);
                        }
                        dispatch(runToken(["red", tokenNum, diceLastNumberRed, tokenPosition.redToken[tokenNum - 1], homeStatus]));
                        if (diceLastNumberRed !== 6) {
                            dispatch(setUserFinishedTern())
                        }
                        dispatch(lockTern("red"));
                    } else if (isTokenInVictoryBox.redToken[tokenNum - 1]) {
                        //hence the token is in victory path
                        console.log("token is on victory path!")
                        dispatch(runTokenOnVictoryPath([tokenColor, tokenNum, diceLastNumberRed]));
                        if (diceLastNumberRed !== 6) {
                            dispatch(setUserFinishedTern())
                        }
                        dispatch(lockTern(tokenColor));

                    }
                    else {
                        if ((currentPositionRed + diceLastNumberRed > 14) && (lapState.redToken[tokenNum - 1])) {
                            setArgumentRed([tokenColor, tokenNum, diceLastNumberRed]);
                            dispatch(setTokenInsideOfVictoryPath([tokenColor, tokenNum,]));
                            dispatch(lockTern("red"))
                        } else {
                            dispatch(runToken(["red", tokenNum, diceLastNumberRed, tokenPosition.redToken[tokenNum - 1], homeStatus]));
                            if (diceLastNumberRed !== 6) {
                                dispatch(setUserFinishedTern())
                            }
                            dispatch(lockTern("red"));
                        }

                    }

                }
                break;
            case "green":
                const currentPositionGreen = tokenPosition.greenToken[tokenNum - 1];
                const diceLastNumberGreen = greenDice[greenDice.length - 1]
                if ((homeStatus.greenToken[tokenNum - 1] === "inside") && (diceLastNumberGreen === 6)) {
                    // console.log("move Token fuction is activated by green color");
                    dispatch(releseToken([tokenColor, tokenNum, diceLastNumberGreen]));
                    dispatch(takeOutOneToken([tokenColor, tokenNum, diceLastNumberGreen]))
                    dispatch(lockTern(tokenColor));


                }
                else {
                    if ((currentPositionGreen > 14 && currentPositionGreen <= 21)) {
                        // setting the token done 1 lap if the token has done one lap already then this will not set lap again
                        if (!lapState.greenToken[tokenNum - 1]) {
                            setTokenDoneOneLap(tokenColor, tokenNum, "set");
                            console.log(`the ${tokenColor} and the tokenNum ${tokenNum} done 1 lap `);
                        }
                        dispatch(runToken([tokenColor, tokenNum, diceLastNumberGreen, tokenPosition.greenToken[tokenNum - 1], homeStatus]));
                        if (diceLastNumberGreen !== 6) {
                            dispatch(setUserFinishedTern())
                        }
                        dispatch(lockTern(tokenColor));
                    }
                    else if (isTokenInVictoryBox.greenToken[tokenNum - 1]) {
                        //hence the token is in victory path
                        console.log("token is on victory path!")
                        dispatch(runTokenOnVictoryPath([tokenColor, tokenNum, diceLastNumberGreen]));
                        if (diceLastNumberGreen !== 6) {
                            dispatch(setUserFinishedTern())
                        }
                        dispatch(lockTern(tokenColor));
                    }
                    else {
                        if ((currentPositionGreen + diceLastNumberGreen > 27) && (lapState.greenToken[tokenNum - 1])) {
                            setArgumentGreen([tokenColor, tokenNum, diceLastNumberGreen]);
                            dispatch(setTokenInsideOfVictoryPath([tokenColor, tokenNum,]));
                            dispatch(lockTern(tokenColor))
                        } else {
                            dispatch(runToken([tokenColor, tokenNum, diceLastNumberGreen, currentPositionGreen, homeStatus]));
                            if (diceLastNumberGreen !== 6) {
                                dispatch(setUserFinishedTern())
                            }
                            dispatch(lockTern(tokenColor));

                        }

                    }

                }
                break;
            case "yellow":

                let currentPositionYellow = tokenPosition.yellowToken[tokenNum - 1]
                const diceLastNumberYellow = yellowDice[yellowDice.length - 1]
                if ((homeStatus.yellowToken[tokenNum - 1] === "inside") && (diceLastNumberYellow === 6)) {
                    // console.log("move Token fuction is activated by yellow color");
                    dispatch(releseToken(["yellow", tokenNum, diceLastNumberYellow]));
                    dispatch(takeOutOneToken(["yellow", tokenNum, diceLastNumberYellow]));
                    // console.warn(tokenColor)
                    dispatch(lockTern(tokenColor));

                } else {
                    if ((currentPositionYellow >= 27 && currentPositionYellow < 34)) {
                        console.log(currentPositionYellow)
                        // setting the token done 1 lap if the token has done one lap already then this will not set lap again
                        if (!lapState.yellowToken[tokenNum - 1]) {
                            setTokenDoneOneLap(tokenColor, tokenNum, "set");
                            console.log(`the ${tokenColor} and the tokenNum ${tokenNum} done 1 lap `);
                        }
                        dispatch(runToken([tokenColor, tokenNum, diceLastNumberYellow, currentPositionYellow, homeStatus]));
                        if (diceLastNumberYellow !== 6) {
                            dispatch(setUserFinishedTern())
                        }
                        dispatch(lockTern(tokenColor));
                        console.warn(tokenColor)

                    }
                    else if (isTokenInVictoryBox.yellowToken[tokenNum - 1]) {
                        //hence the token is in victory path
                        console.log("token is on victory path!")
                        dispatch(runTokenOnVictoryPath([tokenColor, tokenNum, diceLastNumberYellow]));
                        if (diceLastNumberYellow !== 6) {
                            dispatch(setUserFinishedTern())
                        }
                        dispatch(lockTern(tokenColor));
                        console.warn(tokenColor)

                    }
                    else {
                        if ((currentPositionYellow + diceLastNumberYellow > 40) && (lapState.yellowToken[tokenNum - 1])) {
                            setArgumentGreen([tokenColor, tokenNum, diceLastNumberYellow]);
                            dispatch(setTokenInsideOfVictoryPath([tokenColor, tokenNum,]));
                            dispatch(lockTern(tokenColor))
                        } else {
                            dispatch(runToken([tokenColor, tokenNum, diceLastNumberYellow, currentPositionYellow, homeStatus]));
                            if (diceLastNumberYellow !== 6) {
                                dispatch(setUserFinishedTern())
                            }
                            dispatch(lockTern(tokenColor));
                            // console.warn(tokenColor)
                        }

                    }
                }
                break;

        }
    }

    return (
        <div className='main-container-playground'>
            <h1 className='gameName'>Smart Ludo</h1>
            <div className='ludoBody'>
                <div className='LudoBox'>
                    <div className="gotiHome skyblue">
                        <div className="common-class-innerhome innerHome-skyblue">
                            <div className="align-goti-box">
                                <div className="common-class-home home1">
                                    <ShowToken pathBoxId={"b1"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home2">
                                    <ShowToken pathBoxId={"b2"} moveToken={moveToken} />
                                </div>

                                <div className="common-class-home home3">
                                    <ShowToken pathBoxId={"b3"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home4">
                                    <ShowToken pathBoxId={"b4"} moveToken={moveToken} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="gotiHome red">
                        <div className="common-class-innerhome innerHome-red">
                            <div className="align-goti-box">
                                <div className="common-class-home home1">
                                    <ShowToken pathBoxId={"r1"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home2">
                                    <ShowToken pathBoxId={"r2"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home3">
                                    <ShowToken pathBoxId={"r3"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home4">
                                    <ShowToken pathBoxId={"r4"} moveToken={moveToken} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="gotiHome green">
                        <div className="common-class-innerhome innerHome-green">
                            <div className="align-goti-box">
                                <div className="common-class-home home1">
                                    <ShowToken pathBoxId={"g1"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home2">
                                    <ShowToken pathBoxId={"g2"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home3">
                                    <ShowToken pathBoxId={"g3"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home4">
                                    <ShowToken pathBoxId={"g4"} moveToken={moveToken} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="gotiHome yellow">
                        <div className="common-class-innerhome innerHome-yellow">
                            <div className="align-goti-box">
                                <div className="common-class-home home1">
                                    <ShowToken pathBoxId={"y1"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home2">
                                    <ShowToken pathBoxId={"y2"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home3">
                                    <ShowToken pathBoxId={"y3"} moveToken={moveToken} />
                                </div>
                                <div className="common-class-home home4">
                                    <ShowToken pathBoxId={"y4"} moveToken={moveToken} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="victroyBox">
                        <div className="miniVictoryBox vertical first">
                            <ShowToken pathBoxId={"yh6"} moveToken={moveToken} />
                        </div>
                        <div className="miniVictoryBox horizontal first">
                            <ShowToken pathBoxId={"bh6"} moveToken={moveToken} />
                        </div>
                        <div className="miniVictoryBox horizontal second">
                            <ShowToken pathBoxId={"gh6"} moveToken={moveToken} />
                        </div>
                        <div className="miniVictoryBox vertical second">
                            <ShowToken pathBoxId={"rh6"} moveToken={moveToken} />
                        </div>
                    </div>
                    <div className="goti-path skyblue goti-path-channel-1">
                        <div className="path-box skyblue path-box-number1">
                            <ShowToken pathBoxId={52} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number2">
                            <ShowToken pathBoxId={1} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number3">
                            <ShowToken pathBoxId={2} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number4"><ShowToken pathBoxId={51} moveToken={moveToken} /></div>
                        <div className="path-box skyblue path-box-number5">
                            <ShowToken pathBoxId={"bh1"} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number6">
                            <ShowToken pathBoxId={3} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number7 cheera" ><ShowToken pathBoxId={50} moveToken={moveToken} />

                        </div>
                        <div className="path-box skyblue path-box-number8">
                            <ShowToken pathBoxId={"bh2"} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number9">
                            <ShowToken pathBoxId={4} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number10"><ShowToken pathBoxId={49} moveToken={moveToken} /></div>
                        <div className="path-box skyblue path-box-number11">
                            <ShowToken pathBoxId={"bh3"} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number12">
                            <ShowToken pathBoxId={5} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number13"><ShowToken pathBoxId={48} moveToken={moveToken} /></div>
                        <div className="path-box skyblue path-box-number14">
                            <ShowToken pathBoxId={"bh4"} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number15">
                            <ShowToken pathBoxId={6} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number16"><ShowToken pathBoxId={47} moveToken={moveToken} /></div>
                        <div className="path-box skyblue path-box-number17">
                            <ShowToken pathBoxId={"bh5"} moveToken={moveToken} />
                        </div>
                        <div className="path-box skyblue path-box-number18">
                            <ShowToken pathBoxId={7} moveToken={moveToken} />
                        </div>

                    </div>
                    <div className="goti-path red  goti-path-channel-2">
                        <div className="path-box red path-box-number1"><ShowToken pathBoxId={8} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number2"><ShowToken pathBoxId={9} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number3"><ShowToken pathBoxId={10} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number4 cheera">

                            <ShowToken pathBoxId={11} moveToken={moveToken} />
                        </div>
                        <div className="path-box red path-box-number5"><ShowToken pathBoxId={12} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number6"><ShowToken pathBoxId={13} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number7">
                            <ShowToken pathBoxId={"rh5"} moveToken={moveToken} />
                        </div>
                        <div className="path-box red path-box-number8"><ShowToken pathBoxId={"rh4"} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number9"><ShowToken pathBoxId={"rh3"} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number10">
                            <ShowToken pathBoxId={"rh2"} moveToken={moveToken} />
                        </div>
                        <div className="path-box red path-box-number11">
                            <ShowToken pathBoxId={"rh1"} moveToken={moveToken} />
                        </div>
                        <div className="path-box red path-box-number12">
                            <ShowToken pathBoxId={14} moveToken={moveToken} />
                        </div>
                        <div className="path-box red path-box-number13"><ShowToken pathBoxId={20} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number14"><ShowToken pathBoxId={19} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number15"><ShowToken pathBoxId={18} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number16"><ShowToken pathBoxId={17} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number17"><ShowToken pathBoxId={16} moveToken={moveToken} /></div>
                        <div className="path-box red path-box-number18">
                            <ShowToken pathBoxId={15} moveToken={moveToken} />
                        </div>
                    </div>
                    <div className="goti-path green  goti-path-channel-1">
                        <div className="path-box green path-box-number1"><ShowToken pathBoxId={33} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number2"><ShowToken pathBoxId={"gh5"} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number3"><ShowToken pathBoxId={21} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number4"><ShowToken pathBoxId={32} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number5"><ShowToken pathBoxId={"gh4"} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number6"><ShowToken pathBoxId={22} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number7"><ShowToken pathBoxId={31} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number8"><ShowToken pathBoxId={"gh3"} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number9"><ShowToken pathBoxId={23} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number10"><ShowToken pathBoxId={30} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number11"><ShowToken pathBoxId={"gh2"} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number12 cheera"><ShowToken pathBoxId={24} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number13"><ShowToken pathBoxId={29} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number14"><ShowToken pathBoxId={"gh1"} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number15"><ShowToken pathBoxId={25} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number16"><ShowToken pathBoxId={28} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number17"><ShowToken pathBoxId={27} moveToken={moveToken} /></div>
                        <div className="path-box green path-box-number18"><ShowToken pathBoxId={26} moveToken={moveToken} /></div>
                    </div>
                    <div className="goti-path yellow goti-path-channel-2">
                        <div className="path-box skyblue path-box-number1"><ShowToken pathBoxId={41} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number2"><ShowToken pathBoxId={42} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number3"><ShowToken pathBoxId={43} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number4"><ShowToken pathBoxId={44} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number5"><ShowToken pathBoxId={45} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number6"><ShowToken pathBoxId={46} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number7">
                            <ShowToken pathBoxId={40} moveToken={moveToken} />
                        </div>
                        <div className="path-box yellow path-box-number8"><ShowToken pathBoxId={"yh1"} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number9"><ShowToken pathBoxId={"yh2"} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number10"><ShowToken pathBoxId={"yh3"} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number11"><ShowToken pathBoxId={"yh4"} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number12"><ShowToken pathBoxId={"yh5"} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number13"><ShowToken pathBoxId={39} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number14"><ShowToken pathBoxId={38} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number15 cheera"><ShowToken pathBoxId={37} moveToken={moveToken} />
                        </div>
                        <div className="path-box yellow path-box-number16"><ShowToken pathBoxId={36} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number17"><ShowToken pathBoxId={35} moveToken={moveToken} /></div>
                        <div className="path-box yellow path-box-number18"><ShowToken pathBoxId={34} moveToken={moveToken} /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Playground
