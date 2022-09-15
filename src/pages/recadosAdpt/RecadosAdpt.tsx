import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { removeOne, selectAll } from "../../store/modules/recados/RecadosSlice";
import ModalRecadosAdpt from "./components/ModalRecados";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const RecadosAdpt: React.FC = () => {
  const dispatch = useAppDispatch();
  const listaRecadosRedux = useAppSelector(selectAll);

  const [stateModal, setStateModal] = useState<boolean>(false);
  const [id, setId] = useState<number>();

  function openModal() {
    setStateModal(true);
    setId(undefined);
  }

  const closeModal = () => {
    setStateModal(false);
  };

  function excluirRecado(id: number) {
    dispatch(removeOne(id));
  }

  function editarRecado(id: number) {
    openModal();
    setId(id);
  }

  return (
    <>
      <div>
        <Typography variant="h5">CRUD de Recados com Adapter</Typography>
        <Typography variant="body1">
          Usando Redux Toolkit Adapter e comunicação de componentes separados
          via props.
        </Typography>
        <Button variant="outlined" sx={{ marginTop: 5 }} onClick={openModal}>
          CADASTRAR
        </Button>
        <div className="mt-5">
          {listaRecadosRedux.map((recado) => {
            return (
              <Grid
                container
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                key={recado.id}
              >
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Paper
                    elevation={3}
                    className="mt-5 p-5"
                    sx={{
                      width: 300,
                      height: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="body1">Id: 00{recado.id}</Typography>
                      <Divider className="my-2" />
                      <Typography variant="body2">
                        Título: {recado.titulo}
                      </Typography>
                      <Typography variant="body2">
                        Descricao: {recado.detalhamento}
                      </Typography>
                    </Box>
                    <Box sx={{ alignSelf: "end" }}>
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => excluirRecado(recado.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        aria-label="editar"
                        size="small"
                        onClick={() => editarRecado(recado.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            );
          })}
        </div>
      </div>
      <ModalRecadosAdpt
        handleModal={stateModal}
        actionCancel={closeModal}
        id={id}
      />
    </>
  );
};

export default RecadosAdpt;
