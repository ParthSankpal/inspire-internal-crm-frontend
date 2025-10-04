import {  createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";
// import { getCurrentUser, loginUser, logoutUser } from "@/api/authApi";

const initialState: AuthState = {
  user: null,
  token: null,
};

// // 🟢 Login
// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials: LoginRequest, { rejectWithValue }) => {
//     try {
//       const res = await loginUser(credentials);
//       return res;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

// // 🟡 Get current user
// export const fetchCurrentUser = createAsyncThunk(
//   "auth/fetchCurrentUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await getCurrentUser();
//       return res;
//     } catch (err: any) {
//       console.log(err);
      
//       return rejectWithValue("Failed to fetch current user");
//     }
//   }
// );

// // 🔴 Logout
// export const logout = createAsyncThunk("auth/logout", async () => {
//   await logoutUser();
//   return null;
// });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     // login
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.user = action.payload.user;
  //       state.token = action.payload.token;
  //     })
  //     // current user
  //     .addCase(fetchCurrentUser.fulfilled, (state, action) => {
  //       state.user = action.payload.user;
  //       state.token = action.payload.token;
  //     })
  //     // logout
  //     .addCase(logout.fulfilled, (state) => {
  //       state.user = null;
  //       state.token = null;
  //     });
  // },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
