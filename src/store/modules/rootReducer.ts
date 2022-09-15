import { combineReducers } from "@reduxjs/toolkit";
import books from "./books/BooksSlice";
import items from "./items/ItemsSlice";
import alunos from "./alunos/AlunosSlice";
import jogos from "./jogos/JogosSlice";
import recados from "./recados/RecadosSlice";
import tasks from "./tasks/TasksSlice";
import task from "./tasks/TaskSlice";

export default combineReducers({
  books,
  items,
  alunos,
  jogos,
  recados,
  tasks,
  task,
});
