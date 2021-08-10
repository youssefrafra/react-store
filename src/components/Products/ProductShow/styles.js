import { makeStyles } from "@material-ui/core/styles";
import { NavBar } from "../..";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '64px 0 0 0',
    height: "100vh",
    position: 'relative'
  },
  toolbar: theme.mixins.toolbar,
  image: {
    // backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center',
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    height: 'fit-content',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:'space-between'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  add: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;
