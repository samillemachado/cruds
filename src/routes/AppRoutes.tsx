import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutDefault from "../config/layout/Default";
import About from "../pages/about/About";
import Home from "../pages/home/Home";
import Faqs from "../pages/faqs/Faqs";
import Books from "../pages/books/Books";
import Alunos from "../pages/alunos/Alunos";
import Jogos from "../pages/jogos/Jogos";
import JogosRdx from "../pages/jogosRdx/JogosRdx";
import AlunosRdx from "../pages/alunosRdx/AlunosRdx";
import Recados from "../pages/recados/Recados";
import RecadosAdpt from "../pages/recadosAdpt/RecadosAdpt";
import TasksApi from "../pages/tasksApi/TasksApi";
import TasksSeviceApi from "../pages/tasksServiceApi/TasksServiceApi";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutDefault component={Home} />} />
        <Route path="/about" element={<LayoutDefault component={About} />} />
        <Route path="/faqs" element={<LayoutDefault component={Faqs} />} />
        <Route path="/books" element={<LayoutDefault component={Books} />} />
        <Route path="/alunos" element={<LayoutDefault component={Alunos} />} />
        <Route
          path="/alunosrdx"
          element={<LayoutDefault component={AlunosRdx} />}
        />
        <Route path="/jogos" element={<LayoutDefault component={Jogos} />} />
        <Route
          path="/jogosrdx"
          element={<LayoutDefault component={JogosRdx} />}
        />
        <Route
          path="/recados"
          element={<LayoutDefault component={Recados} />}
        />
        <Route
          path="/recadosadpt"
          element={<LayoutDefault component={RecadosAdpt} />}
        />
        <Route
          path="/tasksapi"
          element={<LayoutDefault component={TasksApi} />}
        />
        <Route
          path="/taskssvc"
          element={<LayoutDefault component={TasksSeviceApi} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
