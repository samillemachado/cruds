import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { create } from "../../../store/modules/jogos/JogosSlice";
import IJogo from "../../../types/jogo";

interface ModalJogosProps {
  handleModal: boolean; //variável que vai controlar o estado do modal
  indexEditJogo: number; //variável que vai controlar o index selecionado para abrir o modal
  actionCancel: () => void; // função passada entre pai e filho para abrir e fechar o modal
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalJogos: React.FC<ModalJogosProps> = ({
  handleModal,
  indexEditJogo,
  actionCancel,
}) => {
  const dispatch = useAppDispatch();
  const jogosRedux = useAppSelector((state) => state.jogos);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [consoleX, setConsoleX] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [indexEdit, setIndexEdit] = useState<number>(-1);

  useEffect(() => {
    setOpenModal(handleModal);
  }, [handleModal]);

  const handleClose = () => {
    limparModal();
    setIndexEdit(-1);
    setOpenModal(false);
  };

  const limparModal = () => {
    setNome("");
    setDescricao("");
    setConsoleX("");
    setGenero("");
  };

  function editarCadastro() {
    const novoJogo: IJogo = {
      nome: nome,
      descricao: descricao,
      consoleX: consoleX,
      genero: genero,
    };

    const listaJogos = [...jogosRedux, novoJogo];
    dispatch(create(listaJogos));

    handleClose();
  }

  function salvarCadastro() {
    //criar o novo objeto
    const novoJogo: IJogo = {
      nome: nome,
      descricao: descricao,
      consoleX: consoleX,
      genero: genero,
    };
    //salvar no array e na store;
    const listaJogos = [...jogosRedux, novoJogo];
    dispatch(create(listaJogos));

    handleClose();
  }

  return (
    <div>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {indexEdit > -1
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
              indexEdit > -1 ? editarCadastro() : salvarCadastro()
            }
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalJogos;
