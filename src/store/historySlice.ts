import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface HistoryState {
  items: string[]
}

const initialState: HistoryState = {
  items: [],
}

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<string>) => {
      // Add to the beginning of the array
      state.items.unshift(action.payload)
      // Keep only the last 10 items
      if (state.items.length > 10) {
        state.items = state.items.slice(0, 10)
      }
    },
  },
})

export const { addToHistory } = historySlice.actions
export default historySlice.reducer
