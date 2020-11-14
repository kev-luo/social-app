import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { Button, Confirm } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utils/graphql';

export default function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    // remember that when we reach update that means the post has been successfully deleted
    update(proxy) {
      setConfirmOpen(false);
      // remove post from cache so that the change is reflecetd on the front end so that we don't have to fetch the posts again
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: data.getPosts.filter(post => post.id !== postId)
        }
      })
      // we need to check if there's a callback since we only pass one if we're deleting a post from the singlepost page, not if we're on the home page
      if(callback) {
        callback();
      }
    },
    variables: {
      postId: postId
    }
  })

  return (
    <>
      <Button
        color="red"
        as="div"
        onClick={ () => setConfirmOpen(true) }
        icon="trash"
        floated="right"
      />
      {/* we want to show a modal before the user actually gets to delete the post */}
      <Confirm
        open={ confirmOpen }
        onCancel={() => setConfirmOpen(false)}
        onConfirm={ deletePost }
      />
    </>
  )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) 
  }
`