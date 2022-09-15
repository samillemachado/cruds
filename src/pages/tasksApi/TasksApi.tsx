import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllTasks, selectAll } from "../../store/modules/tasks/TasksSlice";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TasksApi: React.FC = () => {
  //pegando da store
  const tasksRedux = useAppSelector(selectAll);

  //pega um estado específico
  const loagingRedux = useAppSelector((state) => state.tasks.loading);

  //pega da API
  const dispatch = useAppDispatch();

  //mostra tasks na página quando carregarmos a página (useEffect dispatch)
  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]); // poderia ficar sem a dependencia do dispatch

  return (
    <>
      <div>
        <Typography variant="h5">CRUD de Posts com Adapter</Typography>
        <Typography variant="body1">
          Usando Redux Toolkit Adapter e comunicação de componentes separados
          via props, consumo de free fake API{" "}
          <Link
            href="https://jsonplaceholder.typicode.com/"
            target="_blank"
            rel="noreferrer"
            underline="hover"
          >
            JSONPlaceholder
          </Link>
          .
        </Typography>
      </div>
      <Grid sx={{ margin: 5 }}>
        {loagingRedux ? (
          <LinearProgress />
        ) : (
          <>
            {!tasksRedux.length && <Typography>Nenhuma task.</Typography>}
            {tasksRedux.map((item) => {
              return (
                <Grid
                  container
                  spacing={4}
                  item
                  key={item.id}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <div
                    style={{
                      height: 70,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <IconButton>
                      {item.completed ? (
                        <CheckCircleIcon color={"primary"} />
                      ) : (
                        <RadioButtonUncheckedIcon />
                      )}
                    </IconButton>
                    <Typography variant="body1">{item.title}</Typography>
                  </div>
                </Grid>
              );
            })}
          </>
        )}
      </Grid>
    </>
  );
};

export default TasksApi;
