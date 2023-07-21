import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendLoginData } from '../../redux/actions/userActions';
import { RootState } from '../../redux/store';
import { Button, Input, Form, Message } from 'semantic-ui-react'

interface LoginData {
    username: string,
    password: string
};

interface LoginProps {
    user: LoginData | null;
    loading: boolean;
    error: string;
    sendLoginData: (
      username: string, 
      password: string) => Promise<void>
};

const LoginForm: React.FC<LoginProps> = ({ user, loading, error, sendLoginData }) => {
    const [ formData, setFormData ] = useState<LoginData>({
        username: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await sendLoginData(formData.username, formData.password);

        setFormData({ username: '', password: ''});
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Form onSubmit={handleSubmit} error>
            <Form.Field>
                <label>username</label>
                <input placeholder='username' name='username' value={formData.username} onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
                <label>Choose Password</label>
                <Input type='password' name='password' value={formData.password} onChange={handleChange}/>
            </Form.Field>
            <Button type='submit'>Login</Button>
            {loading && <p>Loading...</p>}
            <Message
                error
                header={error}
                content={error}
            />
        </Form>
    );
}

const mapStateToProps = (state: RootState) => ({
    newUser: state.user.data,
    loading: state.user.loading,
    error: state.user.error
})
  
  export default connect(mapStateToProps, { sendLoginData })(LoginForm);