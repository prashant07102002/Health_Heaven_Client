import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

// Define custom styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#333', // Change the background color
  },
  title: {
    flexGrow: 1,
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            HealthHeaven
          </Typography>
          <Button color="inherit" className={classes.navButton}>
            Home
          </Button>
          <Button color="inherit" className={classes.navButton}>
            About
          </Button>
          <Button color="inherit" className={classes.navButton}>
            Services
          </Button>
          <Button color="inherit" className={classes.navButton}>
            Contact
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;