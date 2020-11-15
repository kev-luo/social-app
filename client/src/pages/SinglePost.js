import React, { useContext } from 'react'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Card, Grid, Image, Button } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

export default function SinglePost(props) {
  // get postId from url
  const postId = props.match.params.postId;
  const context = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId: postId,
    }
  })

  function deletePostCb() {
    props.history.push('/');
  }

  let postMarkup
  if(loading) {
    // optionally add spinner to represent loading
    postMarkup = <p>Loading post...</p>
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image 
              src="https://react.semantic-ui.com/images/avatar/large/molly.png" 
              size="small" 
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{ username }</Card.Header>
                <Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
                <Card.Description>{ body }</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={context.user} post={{ id, likeCount, likes }}/>
                <Button 
                  color='blue'
                  as="div" 
                  icon="comments"
                  onClick={() => console.log('Comment on post')}
                  label={{ basic: true, color: 'blue', pointing: 'left', content: commentCount }}
                  basic
                />
                { context.user && context.user.username === username && (
                  <DeleteButton postId={ id } callback={ deletePostCb }/>
                )}
              </Card.Content>
            </Card>
            {/* TODO: look into separating comments into it's own component */}
            {comments.map(comment => {
              return(
                <Card fluid key={comment.id}>
                  <Card.Content>
                    { context.user && context.user.username === comment.username && 
                      (<DeleteButton postId={ id } commentId={ comment.id } />
                      )}
                    <Card.Header>{ comment.username }</Card.Header>
                    <Card.Meta> { moment(comment.createdAt).fromNow() }</Card.Meta>
                    <Card.Description>{ comment.body }</Card.Description>
                  </Card.Content>
                </Card>
              )
            })}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  return (
    postMarkup
  )
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`