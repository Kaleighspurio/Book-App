import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Navbar.css';

export default function Navbar({ setRender }) {
  const { isAuth, logout } = useContext(AuthContext);
  const history = useHistory();

  return (
    <>
      <div>
        <AppBar position="static" className="nav-bar">
          <Toolbar>
            <Grid justify="space-between" container>
              <Grid item>
                <Typography className="golden-font nav-brand" variant="h4">
                  My Bookshelf
                </Typography>
              </Grid>
              <Grid item>
                {!isAuth ? (
                  <>
                    <Button
                      className="search-button"
                      aria-label="search"
                      size="small"
                      variant="contained"
                      onClick={() => setRender('search')}
                    >
                      <SearchIcon />{" "}Search
                    </Button>
                    <Button
                      className="nav-buttons"
                      size="small"
                      variant="contained"
                      onClick={() => setRender('login')}
                    >
                      Login
                    </Button>
                    <Button
                      className="nav-buttons"
                      size="small"
                      variant="contained"
                      onClick={() => setRender('signup')}
                    >
                      Sign up
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="search-button"
                      aria-label="search"
                      size="small"
                      variant="contained"
                      onClick={() => history.push('/')}
                    >
                      <SearchIcon />{" "}Search
                    </Button>
                    <Button
                      className="nav-buttons"
                      size="small"
                      variant="contained"
                      onClick={() => history.push('/mybooks')}
                    >
                      My Books
                    </Button>
                    <Button
                      className="nav-buttons"
                      size="small"
                      variant="contained"
                      onClick={() => history.push('/myfavorites')}
                    >
                      <FavoriteIcon className="fav-icon-nav" fontSize="small" />
                      My Favorites
                    </Button>
                    <Button
                      className="nav-buttons log-out-button"
                      size="small"
                      variant="contained"
                      onClick={logout}
                    >
                      logout
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
