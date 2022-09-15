import React, { useState } from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IJogo from "../../types/jogo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Jogos: React.FC = () => {
  const [listaJogos, setListaJogos] = useState<IJogo[]>([]);
  const [open, setOpen] = React.useState(false);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [consoleX, setConsoleX] = useState<string>("");
  const [genero, setGenero] = useState<string>("");

  const handleClickOpen = () => {
    setEditIndex(-1);
    setOpen(true);
  };

  const handleClose = () => {
    limparModal();
    setOpen(false);
  };

  function salvarCadastro(): void {
    const jogo: IJogo = {
      nome,
      descricao,
      consoleX,
      genero,
    };

    setListaJogos([...listaJogos, jogo]);
    handleClose();
  }

  function excluirPessoa(index: number): void {
    const novaListaJogos = [...listaJogos];
    novaListaJogos.splice(index, 1);
    setListaJogos(novaListaJogos);
  }

  function atualizarJogos(item: IJogo, index: number) {
    handleClickOpen();
    setEditIndex(index);

    if (item) {
      setNome(item.nome);
      setDescricao(item.descricao);
      setConsoleX(item.consoleX);
      setGenero(item.genero);
    }
  }

  function editarCadastro() {
    const jogo: IJogo = {
      nome,
      descricao,
      consoleX,
      genero,
    };

    const novaListaJogos = [...listaJogos];
    novaListaJogos[editIndex] = jogo;
    setListaJogos(novaListaJogos);
    handleClose();
  }

  function limparModal() {
    setNome("");
    setDescricao("");
    setConsoleX("");
    setGenero("");
  }

  return (
    <React.Fragment>
      <Typography variant="h4">Jogos sem Redux</Typography>
      <Typography variant="body1">
        Usando apenas local states e componentes na mesma página.
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
                    onClick={() => excluirPessoa(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="editar"
                    size="small"
                    onClick={() => atualizarJogos(item, index)}
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
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {editIndex > -1
              ? "Quer editar esse jogo?"
              : "Quer cadastrar um novo jogo?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Preencha corretamente os campos abaixo:
              <Grid container spacing={2} className="mt-5">
                <Grid item xs={12}>
                  <TextField
                    value={nome}
                    fullWidth
                    id="outlined-basic"
                    label="Nome"
                    variant="outlined"
                    onChange={(e) => setNome(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={descricao}
                    fullWidth
                    id="outlined-basic"
                    label="Descrição"
                    variant="outlined"
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={consoleX}
                    fullWidth
                    id="outlined-basic"
                    label="Console"
                    variant="outlined"
                    onChange={(e) => setConsoleX(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={genero}
                    fullWidth
                    id="outlined-basic"
                    label="Gênero"
                    variant="outlined"
                    onChange={(e) => setGenero(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              onClick={() =>
                editIndex > -1 ? editarCadastro() : salvarCadastro()
              }
            >
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

export default Jogos;
