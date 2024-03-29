import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../../utils/axios";
import { toast } from "react-toastify";
import { addUserToLocalStorage } from "../../../utils/localStorage";
import { loginUserThunk, registerUserThunk, updateUserThunk } from "./userThunk";

const initialState = {
    isLoading: false,
    user: null,
    isSidebarOpen: false,
};

export const registerUser = createAsyncThunk("user/registerUser", async (user, thunkAPI) => {
    return registerUserThunk("/auth/register", user, thunkAPI);
});

export const loginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
    return loginUserThunk("/auth/login", user, thunkAPI);
});

export const updateUser = createAsyncThunk("user/updateUser", async (user, thunkAPI) => {
    return updateUserThunk("/auth/updateUser", user, thunkAPI);
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isSidebarOpen = false;
            removeUserFromLocalStorage();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Hello There ${user.name}`);
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`Welcome Back ${user.name}`);
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            })
            .addCase(updateUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.user = user;
                addUserToLocalStorage(user);
                toast.success(`USer Updated!`);
            })
            .addCase(updateUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(payload);
            });
    },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
