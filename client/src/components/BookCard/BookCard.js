import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './BookCard.css';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../Snackbar/SnackbarComponent';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function BookCard({ info }) {
  const { isAuth, userId } = useContext(AuthContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();
  const [open, setOpen] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setSnackbarMessage();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addToMyBooks = () => {
    const bookObject = {
      title: info.title,
      subtitle: info.subtitle,
      author1: info.authors[0],
      author2: info.authors[1] || null,
      author3: info.authors[2] || null,
      author4: info.authors[3] || null,
      description: info.description,
      image: info.imageLinks.thumbnail,
      link: info.infoLink,
      publisher: info.publisher,
      publish_date: info.publishedDate,
      page_count: info.pageCount,
      isbn: info.industryIdentifiers[0].identifier,
      categories: info.categories[0],
      average_rating: info.averageRating,
      have_read: false,
      is_favorite: false,
    };
    // axios post to book table
    axios.post(`api/addbook/${userId}`, bookObject).then((response) => {
      console.log(response);
      console.log(
        `${response.data.title} was successfully added to your books`
      );
      setSnackbarMessage(`${response.data.title} was added to your books!`);
      setSnackbarOpen(true);
    });
  };

  const openMoreInfoModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Card className="book-card" raised={true}>
        <SnackbarComponent
          snackbarOpen={snackbarOpen}
          handleCloseSnackbar={handleCloseSnackbar}
          message={snackbarMessage}
        />
        {info.imageLinks ? (
          <CardMedia
            className="thumbnail-image"
            component="img"
            image={info.imageLinks.thumbnail || info.image}
            alt="book cover"
          />
        ) : info.image ? (
          <CardMedia
            className="thumbnail-image"
            component="img"
            image={info.image}
            alt="book cover"
          />
        ) : (
          <CardMedia
            component="img"
            className="thumbnail-image"
            image="book-cover-placeholder.jpg"
            alt="placeholder book cover"
          />
        )}
        <CardContent>
          <Typography variant="subtitle2" color="primary" component="p">
            {info.title}
          </Typography>
          {info.authors ? (
            info.authors.map((author) => (
              <Typography variant="body2" color="textSecondary" component="p">
                {author}
              </Typography>
            ))
          ) : info.author1 ? (
            <>
              <Typography variant="body2" color="textSecondary" component="p">
                {info.author1}
              </Typography>{' '}
              <Typography variant="body2" color="textSecondary" component="p">
                {info.author2}
              </Typography>{' '}
              <Typography variant="body2" color="textSecondary" component="p">
                {info.author3}
              </Typography>{' '}
              <Typography variant="body2" color="textSecondary" component="p">
                {info.author4}
              </Typography>
            </>
          ) : null}
        </CardContent>

        <CardActions disableSpacing>
          <Grid container spacing={3}>
            {isAuth ? (
              <>
                <Grid item xs={3}>
                  <Tooltip title="Add to your Books">
                    <IconButton aria-label="add to favorites">
                      <AddCircleOutlineIcon onClick={addToMyBooks} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={9}>
                  <Tooltip title="Learn more">
                    <IconButton onClick={openMoreInfoModal}>
                      <InfoIcon aria-label="more info" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            ) : (
              <Tooltip title="Learn more">
                <IconButton onClick={openMoreInfoModal}>
                  <InfoIcon aria-label="more info" />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </CardActions>
      </Card>

{/* This is the modal! */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">
          About{' '}
          <span className="booktitle-dialog">
            <strong>
              <em>{info.title}</em>
            </strong>
          </span>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <div>
                Author:{' '}
                {info.authors
                  ? info.authors.map((author) => (
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {author}
                      </Typography>
                    ))
                  : null}
              </div>
              <div>
                Pages:
                <Typography variant="body2" color="textSecondary" component="p">
                  {info.pageCount}
                </Typography>
              </div>
              <div>
                Publisher:
                <Typography variant="body2" color="textSecondary" component="p">
                  {info.publisher}
                </Typography>
              </div>
              <div>
                Date of Publish:
                <Typography variant="body2" color="textSecondary" component="p">
                  {info.publishedDate}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={9}>
              {info.description ? (
                <Typography variant="body2" component="p">
                  {info.description}
                </Typography>
              ) : (
                <Typography variant="body2" component="p">
                  No description available...
                </Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
