import React from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Footer from "../../components/Footer/Footer";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import StoreIcon from "@mui/icons-material/Store";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface LayoutDefaultPros {
  component: React.FC;
}

const LayoutDefault: React.FC<LayoutDefaultPros> = ({
  component: Component,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            CRUD's com ReactJS TS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="/">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/alunos">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <EmojiPeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Alunos - sem Redux" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/alunosrdx">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <EmojiPeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Alunos - com Redux" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/jogos">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText primary="Jogos - sem Redux" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/jogosrdx">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SportsEsportsIcon />
                </ListItemIcon>
                <ListItemText primary="Jogos - com Redux" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/recados">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SpeakerNotesIcon />
                </ListItemIcon>
                <ListItemText primary="Recados - sem Redux" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/recadosadpt">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SpeakerNotesIcon />
                </ListItemIcon>
                <ListItemText primary="Recados - com Adapter" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/tasksapi">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TaskAltIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks - com Api" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/taskssvc">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TaskAltIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks - com Service Api" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/about">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/faqs">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ContactSupportIcon />
                </ListItemIcon>
                <ListItemText primary="Faqs" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Component />
      </Main>

      <Footer />
    </Box>
  );
};

export default LayoutDefault;
