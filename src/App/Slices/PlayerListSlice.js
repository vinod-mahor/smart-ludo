import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    players: ["rgb(36,113,255)", "red", "green", "yellow"],
}

const PlayerListSlice = createSlice({
    name: "player list",
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            state.players.push(action.payload);
        },
        removePlayer: (state, action) => {
            state.players = state.players.filter(player => player !== action.payload);
        }
    }
})

export const { addPlayer, removePlayer } = PlayerListSlice.actions;
export default PlayerListSlice.reducer