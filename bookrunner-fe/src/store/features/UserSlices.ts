import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {

}


export const UserSlice = createSlice({
    name: "user",
    initialState: {
        user: null as User | null
    },
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        }
    }
})

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;