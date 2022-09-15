import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D9077A",
    },
    secondary: {
      main: "#202020",
    },
  },
  //   components: {
  //     // Name of the component
  //     MuiPaper: {
  //       styleOverrides: {
  //         // Name of the slot
  //         root: {
  //           // Some CSS
  //           padding: "20px",
  //           borderRadius: "10px",
  //         },
  //       },
  //     },
  //   },
});

export default defaultTheme;
