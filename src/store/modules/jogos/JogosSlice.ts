import { createSlice } from "@reduxjs/toolkit";
import Jogos from "../../../pages/jogos/Jogos";
import IJogo from "../../../types/jogo";

const initialState: IJogo[] = [];

const JogosSlice = createSlice({
  name: "Jogos",
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    },
    excluirJogo(state, action) {
      const novaListaJogos = state;
      novaListaJogos.splice(action.payload, 1);
      return novaListaJogos;
    },
  },
});

export const { create, clear, excluirJogo } = JogosSlice.actions;
export default JogosSlice.reducer;
