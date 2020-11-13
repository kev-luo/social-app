import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react';
import moment from 'moment'
import { Link } from 'react-router-dom';

export default function PostCard({post: { body, createdAt, id, username, likeCount, commentCount } }) {
  const likePost = () => {
    console.log(likeCount);
  }

  const commentPost = () => {
    console.log(commentCount);
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{ username }</Card.Header>
        <Card.Meta as={ Link } to={`/posts/${ id }`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{ body }</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          color='teal'
          icon='heart'
          label={{ basic: true, color: 'teal', pointing: 'left', content: likeCount }}
          basic
          onClick={ likePost }
        />
        <Button
          color='blue'
          icon='comments'
          label={{ basic: true, color: 'blue', pointing: 'left', content: commentCount }}
          basic
          onClick={ commentPost }
        />
      </Card.Content>
    </Card>
  )
}
