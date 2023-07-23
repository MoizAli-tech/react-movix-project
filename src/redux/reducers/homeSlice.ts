import { createSlice } from "@reduxjs/toolkit"

interface homeState {
    url: object,
    genres: object
}

const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        genres: {}
    } as homeState,
    reducers: {
        getApiConfiguration: (state: homeState, action) => {
            state.url = action.payload;
        },
        getGenres: (state: homeState, action) => {
            state.genres = action.payload;
        }
    }
})

export const { getApiConfiguration, getGenres } = homeSlice.actions;
export default homeSlice.reducer;