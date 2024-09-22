import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    // initial state has changed for development only
    blueToken: ["b1", "b2", "b3", "b4"],
    redToken: ["r1", "r2", "r3", "r4"],
    greenToken: ["g1", "g2", "g3", "g4"],
    yellowToken: ["y1", "y2", "y3", "y4"]
}

const TokenPositionSlice = createSlice({
    name: "tokenPosition",
    initialState,
    reducers: {
        releseToken: (state, action) => {
            const [tokenColor, TokenNum, DiceAction] = action.payload;

            if ((tokenColor == "blue") && (DiceAction === 6)) {
                state.blueToken[TokenNum - 1] = 3;
            }
            else if ((tokenColor == "red") && (DiceAction === 6)) {
                state.redToken[TokenNum - 1] = 16;
            }
            else if ((tokenColor == "green") && (DiceAction === 6)) {
                state.greenToken[TokenNum - 1] = 29;
            }
            else if ((tokenColor == "yellow") && (DiceAction === 6)) {
                state.yellowToken[TokenNum - 1] = 42;
            } else {
                console.error("releseToken fuction has bracked by default!");
            }
        },
        runToken: (state, action) => {
            let [tokenColor, tokenNum, DiceAction, currentTokenPosition, homeStatus] = action.payload;
            switch (tokenColor) {
                case "blue":
                    if (homeStatus.blueToken[tokenNum - 1] === "outside") {
                        const astimatedPositionBlue = currentTokenPosition + DiceAction;
                        if (((astimatedPositionBlue) > 52) && (homeStatus.blueToken[tokenNum - 1] === "outside")) {
                            state.blueToken[tokenNum - 1] = astimatedPositionBlue - 52;
                            console.log(`The ${tokenColor} has moved to ${astimatedPositionBlue - 52}`);
                        } else {
                            state.blueToken[tokenNum - 1] = DiceAction + currentTokenPosition;
                            console.log(`The ${tokenColor} has moved to ${currentTokenPosition + DiceAction}`);
                        }
                    } else {
                        console.log("The token is inside of the home");
                    }
                    break;
                case "red":
                    if (homeStatus.redToken[tokenNum - 1] === "outside") {
                        const tokenNumRed = DiceAction + currentTokenPosition;
                        if ((tokenNumRed) > 52) {
                            state.redToken[tokenNum - 1] = tokenNumRed - 52;
                            console.log(`The ${tokenColor} has moved to ${tokenNumRed - 52}`);
                        } else {
                            state.redToken[tokenNum - 1] = currentTokenPosition + DiceAction;
                            console.log(`The ${tokenColor} has moved to ${currentTokenPosition + DiceAction}`);
                        }
                    } else {
                        console.log("The token is inside of the home");
                    }

                    break;
                case "green":
                    if (homeStatus.greenToken[tokenNum - 1] === "outside") {
                        const tokenNumGreen = DiceAction + currentTokenPosition;
                        if ((tokenNumGreen) > 52) {
                            state.greenToken[tokenNum - 1] = tokenNumGreen - 52;
                            console.log(`The ${tokenColor} has moved to ${tokenNumGreen}`);
                        } else {
                            state.greenToken[tokenNum - 1] = DiceAction + currentTokenPosition;
                            console.log(`The ${tokenColor} has moved to ${currentTokenPosition + DiceAction}`);
                        }
                    } else {
                        console.log("The token is inside of the home");
                    }

                    break;
                case "yellow":
                    if ((homeStatus.yellowToken[tokenNum - 1]) === "outside") {
                        const tokenNumYellow = DiceAction + currentTokenPosition;
                        if ((tokenNumYellow) > 52) {
                            state.yellowToken[tokenNum - 1] = tokenNumYellow - 52;
                            console.log(`The ${tokenColor} has moved to ${tokenNumYellow}`);
                        } else {
                            state.yellowToken[tokenNum - 1] = DiceAction + currentTokenPosition;
                            console.log(`The ${tokenColor} has moved to ${currentTokenPosition + DiceAction}`);
                        }
                    } else {
                        console.log("The token is inside of the home");
                    }

                    break;
                default:
                    console.error("runToken fuction has bracked by default!");
                    break;
            }

        },
        runTokenOnVictoryPath: (state, action) => {
            const [tokenColor, tokenNum, diceAction] = action.payload;
            let blueTokenRef = state.blueToken[tokenNum - 1];
            let redTokenRef = state.redToken[tokenNum - 1];
            let grenTokenRef = state.greenToken[tokenNum - 1];
            let yellowTokenRef = state.yellowToken[tokenNum - 1];
            let realMove;
            console.log(tokenColor)
            switch (tokenColor) {
                case "blue":
                    const tokenPositonLastNumBlue = (parseInt(blueTokenRef[2], 10));
                    if ((blueTokenRef[0] === "b") && (blueTokenRef[2] <= 6)) {
                        if ((tokenPositonLastNumBlue + diceAction) <= 6) {
                            realMove = `bh${tokenPositonLastNumBlue + diceAction}`;
                            state.blueToken[tokenNum - 1] = realMove;
                            console.log(realMove);

                        } else {
                            console.warn("condition is not sufficent !")
                        }
                    } else {
                        console.error("error while runToken on victory path ");
                    }
                    break;
                case "red":
                    const tokenPositonLastNumRed = (parseInt(redTokenRef[2], 10));
                    console.log(redTokenRef);
                    if ((redTokenRef[0] === "r") && (redTokenRef[2] <= 6)) {
                        if ((tokenPositonLastNumRed + diceAction) <= 6) {
                            realMove = `rh${tokenPositonLastNumRed + diceAction}`
                            state.redToken[tokenNum - 1] = realMove;

                        } else {
                            console.warn("condition is not sufficent !")
                        }
                    } else {
                        console.error("error while runToken on victory path ");
                    }
                    break;
                case "green":
                    const tokenPositonLastNumGreen = (parseInt(grenTokenRef[2], 10));
                    if ((grenTokenRef[0] === "g") && (grenTokenRef[2] <= 6)) {
                        if ((tokenPositonLastNumGreen + diceAction) <= 6) {
                            realMove = `gh${tokenPositonLastNumGreen + diceAction}`
                            state.greenToken[tokenNum - 1] = realMove;

                        } else {
                            console.warn("condition is not sufficent !")
                        }
                    } else {
                        console.error("error while runToken on victory path ");
                    }
                    break;
                case "yellow":

                    console.log(yellowTokenRef[0]);
                    const tokenPositonLastNumYellow = (parseInt(yellowTokenRef[2], 10));
                    console.log(tokenPositonLastNumYellow + diceAction)
                    if (((yellowTokenRef[0]) === "y") && (tokenPositonLastNumYellow <= 6)) {
                        if ((tokenPositonLastNumYellow + diceAction) <= 6) {
                            realMove = `yh${tokenPositonLastNumYellow + diceAction}`;
                            state.yellowToken[tokenNum - 1] = realMove;
                            console.log(realMove);

                        } else {
                            console.warn("condition is not sufficent !")
                        }
                    } else {
                        console.error("error while runToken on victory path ");
                    }

                    break;
                default:
                    console.error("runTokenOnVictoryPath fuction has bracked by default!");
                    break;
            }
        },
        takeTokenOnVictoryPath: (state, action) => {
            const [tokenColor, tokenNum, diceAction, lapState] = action.payload;
            let astimatedPositon;
            switch (tokenColor) {
                case "blue":
                    astimatedPositon = state.blueToken[tokenNum - 1] + diceAction;
                    if ((lapState.blueToken[tokenNum - 1]) && ((state.blueToken[tokenNum - 1] === 1) || (astimatedPositon > 52))) {
                        console.log("trying to take token in victoryBoxes");
                        if (state.blueToken[tokenNum - 1] === 1) {
                            state.blueToken[tokenNum - 1] = `bh${diceAction}`;
                        } else {
                            const realMove = astimatedPositon - 52
                            if (realMove === 0) {
                                state.blueToken[tokenNum - 1] = `bh${realMove + 1}`;
                            } else {
                                state.blueToken[tokenNum - 1] = `bh${realMove}`;
                            }
                        }
                    } else {
                        console.error("@@@ error @@@ blue");
                    }
                    break;
                case "red":
                    astimatedPositon = state.redToken[tokenNum - 1] + diceAction;
                    if ((lapState.redToken[tokenNum - 1]) && (astimatedPositon > 14)) {
                        const realMove = astimatedPositon - 14
                        state.redToken[tokenNum - 1] = `rh${realMove}`
                        console.log(`the token moved to rh${realMove}`)
                    } else {
                        console.error("@@@ error @@@ red");
                    }
                    break;
                case "green":
                    console.log(lapState.greenToken[tokenNum - 1])
                    astimatedPositon = state.greenToken[tokenNum - 1] + diceAction;
                    console.log(astimatedPositon);
                    if ((lapState.greenToken[tokenNum - 1]) && (astimatedPositon > 27)) {
                        const realMove = astimatedPositon - 27
                        state.greenToken[tokenNum - 1] = `gh${realMove}`
                        console.log(`the token moved to gh${realMove}`)
                    } else {
                        console.error("@@@ error @@@ green");
                    }
                    break;
                case "yellow":
                    astimatedPositon = state.yellowToken[tokenNum - 1] + diceAction;
                    if ((lapState.yellowToken[tokenNum - 1]) && (astimatedPositon > 40)) {
                        const realMove = astimatedPositon - 40
                        state.yellowToken[tokenNum - 1] = `yh${realMove}`;
                        console.log(`the token moved to yh${realMove}`);
                    } else {
                        console.error("@@@ error @@@ green");
                    }
                    break;
                default:
                    console.error("takeTokenOnVictoryPath fuction has bracked by default!");
                    break;
            }
        }
    }


}
);

export const { releseToken, runToken, runTokenOnVictoryPath, takeTokenOnVictoryPath } = TokenPositionSlice.actions;
export default TokenPositionSlice.reducer;