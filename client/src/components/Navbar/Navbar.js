import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';



export default function Navbar({ setRender }) {
  return (
    <>
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Grid justify="space-between" container>
              <Grid item>
                <Typography variant="h6">My Bookshelf</Typography>
              </Grid>
              <Grid item>
                <IconButton aria-label="search" color="inherit" onClick={() => setRender('search')} >
                  <SearchIcon />
                </IconButton>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setRender('login')}
                >
                  Login
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setRender('signup')}
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
