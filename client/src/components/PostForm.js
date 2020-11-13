import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

export default function PostForm() {

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  })

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      console.log(result);
      // fetch posts from client data in cache. all the data in our cache is in our data variable now. you can view the cache using apollo dev tools
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      })
      // to update the cache
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: [result.data.createPost, ...data.getPosts]} })
      values.body = '';
    },
  })

  function createPostCallback() {
    createPost();
  }

  return(
    <Form onSubmit={ onSubmit }>
      <h2>Create a Post</h2>
      <Form.Field>
        <Form.Input
          placeholder="Ping"
          name="body"
          onChange={ onChange }
          value={ values.body }
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  )
}

const CREATE_POST = gql`
  mutation createPost(
    $body: String!
  ) {
    createPost(
      body: $body
    ) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`