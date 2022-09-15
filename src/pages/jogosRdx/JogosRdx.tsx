import React, { useEffect, useState } from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import IJogo from "../../types/jogo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalJogos from "./components/ModalJogos";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { excluirJogo } from "../../store/modules/jogos/JogosSlice";

const Jogos: React.FC = () => {
  const dispatch = useAppDispatch();
  const jogosRedux = useAppSelector((state) => state.jogos);

  const [listaJogos, setListaJogos] = useState<IJogo[]>([]);

  const [stateModal, setStateModal] = useState(false);
  const [indexJogo, setIndexJogo] = useState<number>(-1);

  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [consoleX, setConsoleX] = useState<string>("");
  const [genero, setGenero] = useState<string>("");

  const handleClickOpen = () => {
    setIndexJogo(-1);
    setStateModal(true);
  };

  const handleClose = () => {
    limparModal();
    setIndexJogo(-1);
    setStateModal(false);
  };

  useEffect(() => {
    setListaJogos(jogosRedux);
  }, [jogosRedux]);

  // function salvarCadastro(): void {
  //   const jogo: IJogo = {
  //     nome,
  //     descricao,
  //     console,
  //     genero,
  //   };

  //   setListaJogos([...listaJogos, jogo]);
  //   handleClose();
  // }

  function deletarJogo(index: number): void {
    dispatch(excluirJogo(indexJogo));
  }

  // function atualizarJogos(item: IJogo, index: number) {
  //   handleClickOpen();
  //   setEditIndex(index);

  //   if (item) {
  //     setNome(item.nome);
  //     setDescricao(item.descricao);
  //     setConsole(item.console);
  //     setGenero(item.genero);
  //   }
  // }

  // function editarCadastro() {
  //   const jogo: IJogo = {
  //     nome,
  //     descricao,
  //     console,
  //     genero,
  //   };

  //   const novaListaJogos = [...listaJogos];
  //   novaListaJogos[editIndex] = jogo;
  //   setListaJogos(novaListaJogos);
  //   handleClose();
  // }

  function limparModal() {
    setNome("");
    setDescricao("");
    setConsoleX("");
    setGenero("");
  }

  return (
    <React.Fragment>
      <Typography variant="h4">Jogos com Redux</Typography>
      <Typography variant="body1">
        Usando Redux toolkit, local states e comunicação de componentes
        separados via store.
      </Typography>
      <Grid container className="flex flex-row justify-center">
        <Grid item spacing={2} xs={12} className="mt-5">
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            startIcon={<SportsEsportsIcon />}
          >
            Cadastrar Novo Jogo
          </Button>
        </Grid>
      </Grid>
      {/* MOSTRA OS JOGOS CADASTRADOS NA TELA */}
      <div>
        {listaJogos.map((item, index) => {
          return (
            <Grid container>
              <Grid item xs={12} sm={6} className="mt-5">
                <Paper elevation={3} key={index} className="mt-5 p-5">
                  <Typography>Nome: {item.nome}</Typography>
                  <Typography>Descrição: {item.descricao}</Typography>
                  <Typography>Console: {item.consoleX}</Typography>
                  <Typography>Gênero: {item.genero}</Typography>
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => deletarJogo(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="editar"
                    size="small"
                    // onClick={() => atualizarJogos(item, index)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          );
        })}
        <Typography variant="h4">{}</Typography>
      </div>
      <ModalJogos
        handleModal={stateModal}
        indexEditJogo={indexJogo}
        actionCancel={handleClose}
      />
    </React.Fragment>
  );
};

export default Jogos;
