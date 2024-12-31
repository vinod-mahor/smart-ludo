import { createSlice } from "@reduxjs/toolkit";


const initialState = {
 
    blueToken: ["inside", "inside", "inside", "inside"],
    redToken: ["inside", "inside", "inside", "inside"],
    greenToken: ["inside", "inside", "inside", "inside"],
    yellowToken: ["inside", "inside", "inside", "inside"]
}


const HomeStatusSlice = createSlice({
    name: "HomeStatus",
    initialState,
    reducers: {
        takeOutOneToken: (state, action) => {
            const [tokenColor, tokenNum, diceAction] = action.payload;
            if ((tokenColor === "blue") && (diceAction === 6)) {
                state.blueToken[tokenNum - 1] = "outside";
            }
            else if ((tokenColor === "red") && (diceAction === 6)) {
                state.redToken[tokenNum - 1] = "outside";
            }
            else if ((tokenColor === "green") && (diceAction === 6)) {
                state.greenToken[tokenNum - 1] = "outside";
            }
            else if ((tokenColor === "yellow") && (diceAction === 6)) {
                state.yellowToken[tokenNum - 1] = "outside";
            }
        },
        takeInOneToken: (state, action) => {
            const [tokenColor, tokenNum] = action.payload;
            // const propertyName = tokenColor + "Token";
            // state[propertyName][tokenNum - 1];
            if (tokenColor === "blue") {
                state.blueToken[tokenNum - 1] = "inside";
            }
            else if (tokenColor === "red") {
                state.redToken[tokenNum - 1] = "inside";
            }
            else if (tokenColor === "green") {
                state.greenToken[tokenNum - 1] = "inside";
            }
            else if (tokenColor === "yellow") {
                state.yellowToken[tokenNum - 1] = "inside";
            }
        }
    }
})

export const { takeOutOneToken, takeInOneToken } = HomeStatusSlice.actions;
export default HomeStatusSlice.reducer;
