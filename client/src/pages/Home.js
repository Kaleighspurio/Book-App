import React from 'react';
import Nav from '../components/Navbar/Navbar';
import Search from '../components/Search/Search';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export default function Home() {
  return (
    <>
      <Nav />
      <div>
        <Grid container justify="center" spacing={3}>
          <Grid item xs={10} sm={8} md={8}>
            <p>
              Search for books by keyword, part of a title, author, and/or
              subject. Logged in users can add books to their page and can mark
              them as read or unread, and add them as favorites to keep track of
              their reading history.
            </p>
          </Grid>
        </Grid>
        <Grid container justify="center">
            <Grid item xs={8} sm={6} md={4}>
               <Search /> 
            </Grid>
          
        </Grid>
        <Grid container justify="center">
          <Button color="primary">Login</Button>
          <Button color="primary">Sign up</Button>
        </Grid>
      </div>
    </>
  );
}
