import React, { useContext } from 'react'
import { Card, Image, Button } from 'semantic-ui-react';
import moment from 'moment'
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

export default function PostCard({post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
  const context = useContext(AuthContext);

  const likePost = () => {
    console.log(likeCount);
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
        <LikeButton user={ context.user } post={{ id, likes, likeCount }} />
        <Button
          color='blue'
          icon='comments'
          label={{ basic: true, color: 'blue', pointing: 'left', content: commentCount }}
          basic
          as={ Link }
          to={ `/posts/${ id }` }
        />
        { context.user && context.user.username === username && (
          <Button
            color="red"
            as="div"
            onClick={ () => console.log('Delete Post') }
            icon="trash"
            floated="right"
          />
        )}
      </Card.Content>
    </Card>
  )
}
