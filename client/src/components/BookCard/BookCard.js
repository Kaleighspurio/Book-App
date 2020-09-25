import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookRoundedIcon from '@material-ui/icons/BookRounded';
import Button from '@material-ui/core/Button';
import './BookCard.css';

export default function BookCard({ info }) {
  console.log(info);
  return (
    <Card className="book-card" raised={true}>
      {info.imageLinks ? (
        <CardMedia
          className="thumbnail-image"
          component="img"
          image={info.imageLinks.smallThumbnail}
        />
      ) : (
        <CardMedia
          component="img"
          className="thumbnail-image"
          image="book-cover-placeholder.jpg"
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
        )) : null}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="mark as read">
          <BookRoundedIcon />
        </IconButton>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
