import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import IRecado from "../../../types/recado";

const adapter = createEntityAdapter<IRecado>({
  selectId: (item) => item.id,
});

export const { selectAll } = adapter.getSelectors(
  (state: RootState) => state.recados
);

const RecadosSlice = createSlice({
  name: "Recados",
  initialState: adapter.getInitialState(),
  reducers: {
    addOne: adapter.addOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne,
    setMany: adapter.setMany,
    removeOne: adapter.removeOne,
  },
});

export const { addOne, addMany, updateOne, setMany, removeOne } =
  RecadosSlice.actions;
export default RecadosSlice.reducer;
