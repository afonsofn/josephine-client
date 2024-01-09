import { UserInfo } from '@/types/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialUserState {
  user: UserInfo | null
}

export interface UserState {
  userState: InitialUserState
}

const initialState: InitialUserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'userStore',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserInfo | null>) {
      state.user = action.payload
    },
  },
})

export const { setUserData } = userSlice.actions
export default userSlice.reducer
