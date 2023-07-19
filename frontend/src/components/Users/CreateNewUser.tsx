import React, { useState, useEffect }  from 'react'
import { Button, Input, Form } from 'semantic-ui-react'

const CreateUserForm = () => {


    return (
        <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
            <label>Username</label>
            <input placeholder='username' />
        </Form.Field>
        <Form.Field>
            <label>Choose Password</label>
            <Input type='password' />
        </Form.Field>
        <Form.Field>
            <label>Email</label>
            <Input type='email' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )

}

export default CreateUserForm;