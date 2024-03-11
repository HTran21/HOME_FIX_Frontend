import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        id: "",
        email: "",
        phone: "",
        username: "",
        avatar: "",
        role: "",
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            // console.log("payload Redux >>> ", action);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },

        doLogoutAction: (state, action) => {
            state.isAuthenticated = false;
            state.user = {
                id: "",
                email: "",
                phone: "",
                username: "",
                avatar: "",
                role: "",
            };
        },
    },
});

export const { doLoginAction, doLogoutAction } = userSlice.actions;

export default userSlice.reducer;