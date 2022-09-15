import { createSlice } from "@reduxjs/toolkit";
import { Pessoas } from "../../../types";

const initialState: Pessoas = [];

const AlunosSlice = createSlice({
  name: "Alunos",
  initialState,
  reducers: {
    setAlunos(state, action) {
      return action.payload;
    },
    clearAlunos() {
      return initialState;
    },
    removeAluno(state, action) {
      const novaLista = state;
      novaLista.splice(action.payload, 1);
      return novaLista;
    },
  },
});

export const { setAlunos, clearAlunos, removeAluno } = AlunosSlice.actions;
export default AlunosSlice.reducer;
