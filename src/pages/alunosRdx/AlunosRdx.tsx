import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ModalAluno from "./components/ModalAluno";
import { removeAluno } from "../../store/modules/alunos/AlunosSlice";

const AlunosRdx: React.FC = () => {
  const dispatch = useAppDispatch();
  const alunosRedux = useAppSelector((state) => state.alunos);

  const [modalAluno, setModalAluno] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  const openModalAluno = () => {
    setModalAluno(true);
    setEditIndex(-1);
  };

  const closeModalAluno = () => {
    setModalAluno(false);
  };

  function excluirAluno(index: number) {
    dispatch(removeAluno(index));
  }

  function atualizarAluno(index: number) {
    openModalAluno();
    setEditIndex(index);
  }

  return (
    <>
      <Typography variant="h4">Alunos - com Redux</Typography>
      <Typography variant="body1">
        Usando Redux toolkit no array de alunos, local states e comunicação de
        componentes separados via props.
      </Typography>
      <Grid container className="flex flex-row justify-center">
        <Grid item spacing={2} xs={12} className="mt-5">
          <Button
            variant="outlined"
            onClick={openModalAluno}
            startIcon={<EmojiPeopleIcon />}
          >
            Cadastrar
          </Button>
        </Grid>
      </Grid>
      <div className="mt-5">
        {alunosRedux.map((item, index) => {
          return (
            <Grid container>
              <Grid item xs={12} sm={6} className="mt-5">
                <Paper elevation={3} key={index} className="mt-5 p-5">
                  <Typography>Nome: {item.nome}</Typography>
                  <Typography>Sobrenome: {item.sobreNome}</Typography>
                  <Typography>Idade: {item.idade}</Typography>
                  <Typography>CPF: {item.cpf}</Typography>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => excluirAluno(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="editar"
                    size="small"
                    onClick={() => atualizarAluno(index)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          );
        })}
      </div>
      <ModalAluno
        handleModal={modalAluno}
        indexEditAluno={editIndex}
        actionCancel={closeModalAluno}
      />
    </>
  );
};

export default AlunosRdx;
