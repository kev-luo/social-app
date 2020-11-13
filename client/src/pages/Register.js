import React, { useState } from "react";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }

  // we destructured the return of useMutation, and called the function addUser
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // update is triggered if the mutation is successfully executed
    update(proxy, result) {
      console.log(result)
    },
    // variables provided to the mutation
    variables: {
      // shorthand version since our values state has the same keys as the required arguments in our mutation: values
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword
    }
  })

  const onSubmit = (e) => {
    e.preventDefault();
    addUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={`${loading ? "loading" : ""}`}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          type="text"
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`