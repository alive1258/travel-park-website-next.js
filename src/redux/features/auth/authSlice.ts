// src/redux/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { MenuActionFlags, RoleSummary, User } from "@/src/types/authType";

interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;
  roleInfo: RoleSummary | null;
  permissions: Record<string, MenuActionFlags> | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
  roleInfo: null,
  permissions: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.role = action.payload.role;
    },
    storeRoleContext: (
      state,
      action: PayloadAction<{
        role: RoleSummary;
        permissions: Record<string, MenuActionFlags>;
      }>,
    ) => {
      state.roleInfo = action.payload.role;
      state.permissions = action.payload.permissions;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.roleInfo = null;
      state.permissions = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { storeUser, storeRoleContext, logout, setToken } =
  authSlice.actions;
export default authSlice.reducer;
