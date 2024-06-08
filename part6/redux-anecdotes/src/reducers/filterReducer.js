import { createSlice } from "@reduxjs/toolkit"


const filteSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
      filterAction: (state, action) => {
          if (action.payload.length > 0) {
              return action.payload.toLowerCase()
          }
          return 'ALL'
      }
}
})

export const { filterAction } = filteSlice.actions
export default filteSlice.reducer