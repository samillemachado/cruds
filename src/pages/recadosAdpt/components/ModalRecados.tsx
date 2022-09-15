import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { idText } from "typescript";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectAll,
  setMany,
  updateOne,
} from "../../../store/modules/recados/RecadosSlice";
import IRecado from "../../../types/recado";

interface ModalRecadosAdptProps {
  handleModal: boolean;
  actionCancel: () => void;
  id?: number;
}

const ModalRecadosAdpt: React.FC<ModalRecadosAdptProps> = ({
  handleModal,
  actionCancel,
  id,
}) => {
  const dispatch = useAppDispatch();
  const listaRecadosRedux = useAppSelector(selectAll);

  const [open, setOpen] = useState(false);
  // const [id, setId] = useState<number>();
  const [titulo, setTitulo] = useState<string>("");
  const [detalhamento, setDetalhamento] = useState<string>("");

  useEffect(() => {
    setOpen(handleModal);
    if (id) {
      const recado = listaRecadosRedux.find((item) => item.id === id);
      if (recado) {
        setTitulo(recado.titulo);
        setDetalhamento(recado.detalhamento);
      } else {
        limparModal();
      }
    } else {
      limparModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleModal, id]);

  const handleClose = () => {
    limparModal();
    actionCancel();
  };

  const gerarId = () => {
    Math.ceil(0);
    Math.floor(100);
    return Math.floor(Math.random() * (100 - 0) + 0);
  };

  const salvarNovo = () => {
    const idGerado = gerarId();

    const recado: IRecado = {
      id: idGerado,
      titulo: titulo,
      detalhamento: detalhamento,
    };

    const novaListaRecados = [...listaRecadosRedux, recado];
    dispatch(setMany(novaListaRecados));
    handleClose();
  };

  function editarRecado(id: number) {
    dispatch(
      updateOne({
        id: id,
        changes: { titulo: titulo, detalhamento: detalhamento },
      })
    );
    handleClose();
  }

  const limparModal = () => {
    setTitulo("");
    setDetalhamento("");
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">CRUD RECADOS</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} className="mt-3">
              <TextField
                value={titulo}
                fullWidth
                autoFocus
                margin="dense"
                id="titulo"
                label="Titulo"
                type="text"
                variant="outlined"
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} className="mt-2">
              <TextField
                value={detalhamento}
                fullWidth
                autoFocus
                margin="dense"
                id="descricao"
                label="Descricao"
                type="text"
                variant="outlined"
                onChange={(e) => setDetalhamento(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCELAR</Button>
          <Button onClick={() => (id ? editarRecado(id) : salvarNovo())}>
            SALVAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalRecadosAdpt;
