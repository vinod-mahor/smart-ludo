import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ActiveUser: "rgb(36,113,255)",
    isTernFinished: false,
    currentPlayerIndex: 0,
    isTernSkipped: false
};
const userList = ["rgb(36,113,255)", "red", "green", "yellow"]
const TernSlice = createSlice({
    name: 'Tern',
    initialState,
    reducers: {
        setUserActive: (state, action) => {
            state.ActiveUser = action.payload
        },
        setUserFinishedTern: (state, action) => {
            state.isTernFinished = true;
        },
        resetFinishedTern: (state) => {
            state.isTernFinished = false;
        }
        ,
        setNextUserActive: (state, action) => {
            if (state.isTernFinished) {
                // Update the current player index before setting the next active user
                state.currentPlayerIndex = (state.currentPlayerIndex + 1) % userList.length;
                // Set the active user based on the updated index
                state.ActiveUser = userList[state.currentPlayerIndex];
                state.isTernFinished = false;
            }
        },
        setTernSkippedOrNot: (state, action) => {
            state.isTernSkipped = action.payload
        }

    }
});

export const { setUserActive, setNextUserActive, setUserFinishedTern, resetFinishedTern, setTernSkippedOrNot } = TernSlice.actions;
export default TernSlice.reducer;
