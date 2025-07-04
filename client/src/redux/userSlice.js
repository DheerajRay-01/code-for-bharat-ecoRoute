import { createSlice } from '@reduxjs/toolkit'

const initialState =  {
    user:null
}
// const initialState =  {
//     user:{
//         _id:"123456",
//         fullName:"Dheeraj ray",
//         email:"dheerajray@gmail.com"
//     }
// }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state,action) => {
        state.user = action.payload
    },
    deleteUser: (state) => {
      state.user = null
    },
  },
})

export const { addUser,deleteUser } = userSlice.actions

export default userSlice.reducer