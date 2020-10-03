import React, { useState, useContext } from 'react';
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

export default function BookCard({ info }) {
  const { isAuth, userId } = useContext(AuthContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setSnackbarMessage();
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

  const openMoreInfoModal = () => {};

  return (
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
                  <IconButton>
                    <InfoIcon
                      aria-label="more info"
                      onClick={openMoreInfoModal}
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </>
          ) : (
            <Tooltip title="Learn more">
              <IconButton>
                <InfoIcon aria-label="more info" onClick={openMoreInfoModal} />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}
