import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blueDice: [6],
    redDice: [0],
    greenDice: [0],
    yellowDice: [0]
}

const DiceSlice = createSlice({
    name: "DiceNumber",
    initialState,
    reducers: {
        upDateDice: (state, action) => {
            // mycolor = diceColor // random = diceNumber
            let [diceColor, lastNum] = action.payload
            // console.log(lastNum + "  "+ diceColor)
            switch (diceColor) {
                case "rgb(36,113,255)":
                    state.blueDice.push(lastNum);
                    break;
                case "red":
                    state.redDice.push(lastNum);
                    break;
                case "green":
                    state.greenDice.push(lastNum);
                    break;
                case "yellow":
                    state.yellowDice.push(lastNum);
                    break;

            }

        }
    }
})

export const { upDateDice } = DiceSlice.actions;
export default DiceSlice.reducer;