import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText, Grid, TextField } from "@mui/material";
import { Pessoa } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAlunos } from "../../../store/modules/alunos/AlunosSlice";

interface ModalAlunoProps {
  handleModal: boolean;
  indexEditAluno: number;
  actionCancel: () => void;
}

const ModalAluno: React.FC<ModalAlunoProps> = ({
  handleModal,
  indexEditAluno,
  actionCancel,
}) => {
  const dispatch = useAppDispatch();
  const alunosRedux: Pessoa[] = useAppSelector((state) => state.alunos);

  const [openModalAluno, setOpenModalAluno] = useState<boolean>(false);
  const [indexAluno, setIndexAluno] = useState<number>(-1);
  const [nome, setNome] = useState<string>("");
  const [sobrenome, setSobrenome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [idade, setIdade] = useState<number>();

  function cadastrarAluno(): void {
    const aluno: Pessoa = {
      nome: nome,
      sobreNome: sobrenome,
      idade: Number(idade),
      cpf: cpf,
    };

    const novaListaAlunos = [...alunosRedux, aluno];
    dispatch(setAlunos(novaListaAlunos));
    limparModal();
    handleCloseModal();
  }

  function limparModal() {
    setNome("");
    setSobrenome("");
    setIdade(Number(""));
    setCpf("");
  }

  useEffect(() => {
    setOpenModalAluno(handleModal);
  }, [handleModal]);

  useEffect(() => {
    setIndexAluno(indexEditAluno);
    if (indexAluno > -1) {
      setNome(alunosRedux[indexAluno].nome);
      setSobrenome(alunosRedux[indexAluno].sobreNome);
      setIdade(alunosRedux[indexAluno].idade);
      setCpf(alunosRedux[indexAluno].cpf);
    } else {
      limparModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexEditAluno, indexAluno]);

  const handleCloseModal = () => {
    setIndexAluno(-1);
    limparModal();
    actionCancel();
  };

  function editarAluno() {
    const aluno: Pessoa = {
      nome: nome,
      sobreNome: sobrenome,
      idade: Number(idade),
      cpf: cpf,
    };

    const novaListaAlunos = [...alunosRedux];
    novaListaAlunos[indexAluno] = aluno;
    dispatch(setAlunos(novaListaAlunos));
    limparModal();
    handleCloseModal();
  }

  // PROBLEMAS NA EDIÇÃO: se eu edito e não salvo, fica no input se eu abro o modal novamente;
  // SE eu limpo o modal antes de fechar, ele apaga os dados e não puxa mais.

  return (
    <>
      <Dialog open={openModalAluno}>
        <DialogTitle>{indexAluno >= 0 ? "EDITAR" : "CADASTRAR"}</DialogTitle>
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
                onChange={(e) => setIdade(Number(e.target.value))}
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
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button
            onClick={() => (indexAluno > -1 ? editarAluno() : cadastrarAluno())}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalAluno;
