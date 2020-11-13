import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { useForm } from '../utils/hooks';

export default function PostForm() {

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  })

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result);
      values.body = '';
    },
    variables: {
      body: values.body
    }
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