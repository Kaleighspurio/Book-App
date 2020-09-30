import React, { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookRoundedIcon from '@material-ui/icons/BookRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import './BookCard.css';
import Grid from "@material-ui/core/Grid";

export default function BookCard({ info }) {
  const { isAuth, userId } = useContext(AuthContext);
  console.log(info);

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
      is_favorite: false
    }
// axios post to book table
    axios.post(`api/addbook/${userId}`, bookObject).then((response) => {
      console.log(response)
      console.log(`${response.data.title} was successfully added to your books`)
    })
  }

  const addToFavorites = () => {
    // User can only do this if they already added the book...
// axios put to make favorite true
  }

  const markAsRead = () => {
    // axios put to mark as read, or unread depending on current ...
  }

  return (
    <Card className="book-card" raised={true}>
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
      ) :(
        <CardMedia
          component="img"
          className="thumbnail-image"
          image="book-cover-placeholder.jpg"
          alt='placeholder book cover'
        />
      )}
      <CardContent>
        <Typography variant="subtitle2" color="primary" component="p">
          {info.title}
        </Typography>
        {info.authors ? info.authors.map((author) => (
          <Typography variant="body2" color="textSecondary" component="p">
            {author}
          </Typography>
        )) : info.author1 ? ( <>
        <Typography variant="body2" color="textSecondary" component="p">
        {info.author1}
      </Typography> <Typography variant="body2" color="textSecondary" component="p">
        {info.author2}
      </Typography> <Typography variant="body2" color="textSecondary" component="p">
        {info.author3}
      </Typography> <Typography variant="body2" color="textSecondary" component="p">
        {info.author4}
      </Typography> 
      </>): null}
      </CardContent>
      
      <CardActions disableSpacing>
        <Grid container>
        <Grid item xs={12}>
{ isAuth ? (
          <>
        <IconButton aria-label="add to favorites">
          <AddCircleOutlineIcon onClick={addToMyBooks} />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={addToFavorites}/>
        </IconButton>
        <IconButton aria-label="mark as read">
          <BookRoundedIcon />
        </IconButton>
        </> ) : null }
        </Grid>
        <Grid item xs={12}>
          <Button size="small" color="primary">
          Learn More
        </Button>
        </Grid>
      </Grid>
        

        
      </CardActions>
    </Card>
  );
}
