import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type UserType = {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
};


const initialState: UserType = {
  id: '',
  fullName: '',
  email: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      return action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
