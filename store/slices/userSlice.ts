import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  user: object | null
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<object>) {
      state.user = action.payload
    },
  },
})

export const { setUserData } = userSlice.actions
export default userSlice.reducer
