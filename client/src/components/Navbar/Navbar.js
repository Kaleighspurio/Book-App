import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Navbar() {
  return (
    <>
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6">My Bookshelf</Typography>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
