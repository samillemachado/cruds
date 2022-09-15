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
import React, { useState } from "react";
import { Pessoa, Pessoas } from "../../types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const Alunos: React.FC = () => {
  // const lista: Pessoa = [];
  const [lista, setLista] = useState<Pessoas>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
    setEditIndex(-1);
    limpar();
  };

  const handleClose = () => {
    setOpen(false);
  };

  function cadastrarPessoa(): void {
    const pessoa: Pessoa = {
      nome: nome,
      sobreNome: sobrenome,
      idade: Number(idade),
      cpf: cpf,
    };
    setLista([...lista, pessoa]);
    handleClose();
  }

  function editarPessoa(): void {
    const pessoa: Pessoa = {
      nome: nome,
      sobreNome: sobrenome,
      idade: Number(idade),
      cpf: cpf,
    };

    const novaLista = [...lista];
    novaLista[editIndex] = pessoa;
    setLista(novaLista);

    handleClose();
  }

  const limpar = () => {
    setNome("");
    setSobrenome("");
    setIdade("");
    setCpf("");
  };

  function excluirPessoa(index: number): void {
    const novaLista = [...lista];
    novaLista.splice(index, 1);
    setLista(novaLista);
  }

  function atualizarPessoa(pessoa: Pessoa, index: number) {
    handleClickOpen();
    setEditIndex(index);

    if (pessoa) {
      setNome(pessoa.nome);
      setSobrenome(pessoa.sobreNome);
      setIdade(pessoa.idade.toString());
      setCpf(pessoa.cpf);
    }
  }

  return (
    <>
      <Typography variant="h4">Alunos - sem Redux</Typography>
      <Typography variant="body1">
        Usando apenas local states e componentes na mesma página.
      </Typography>
      <Grid container className="flex flex-row justify-center">
        <Grid item spacing={2} xs={12} className="mt-5">
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            startIcon={<EmojiPeopleIcon />}
          >
            Cadastrar
          </Button>
        </Grid>
      </Grid>
      <div className="mt-5">
        {lista.map((item, index) => {
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
                    onClick={() => excluirPessoa(index)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="editar"
                    size="small"
                    onClick={() => atualizarPessoa(item, index)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          );
        })}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex >= 0 ? "EDITAR" : "CADASTRAR"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Preencha os campos abaixo.</DialogContentText>
          <Grid container spacing={2} className="mt-5">
            <Grid item xs={12}>
              <TextField
                value={nome}
                fullWidth
                autoFocus
                margin="dense"
                id="nome"
                label="Nome"
                type="text"
                variant="outlined"
                onChange={(e) => setNome(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={sobrenome}
                fullWidth
                autoFocus
                margin="dense"
                id="sobrenome"
                label="Sobrenome"
                type="text"
                variant="outlined"
                onChange={(e) => setSobrenome(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={idade}
                fullWidth
                autoFocus
                margin="dense"
                id="idade"
                label="Idade"
                type="number"
                variant="outlined"
                onChange={(e) => setIdade(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={cpf}
                fullWidth
                autoFocus
                margin="dense"
                id="cpf"
                label="CPF"
                type="text"
                variant="outlined"
                onChange={(e) => setCpf(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            onClick={() =>
              editIndex >= 0 ? editarPessoa() : cadastrarPessoa()
            }
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Alunos;
