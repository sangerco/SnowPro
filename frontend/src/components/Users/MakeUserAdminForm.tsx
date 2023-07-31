import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeUserAdmin } from '../../redux/actions/userActions'
import { RootState } from '../../redux/store'
import { Checkbox, Form, Message } from 'semantic-ui-react'

interface MakeUserAdmin {
    username: string;
    isAdmin: boolean;
};

interface MakeUserAdminProps {
    user: MakeUserAdmin | null;
    error: string;
    makeUserAdmin: (
        username: string,
        isAdmin: boolean
    ) => Promise<void>
};

const MakeUserAdminForm: React.FC<MakeUserAdminProps> = ({ user, error, makeUserAdmin }) => {
    const { username } = useParams();

    const [ formData, setFormData ] = useState({ username: '', isAdmin: false });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await makeUserAdmin(username ?? '', formData.isAdmin);

        setFormData({ username: '', isAdmin: false });
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    return (
        <Form onSubmit={handleSubmit} error>
            <Form.Field 
                control={Checkbox}
                label='Designate Admin'
                onChange={handleChange}
                name='isAdmin'
                checked={formData.isAdmin}
            />
            <Message 
                error
                header={error}
                content={error}
            />
        </Form>
    )
};

const mapStateToProps = (state: RootState) => ({
    userToAdmin: state.makeUserAdmin.data,
    error: state.makeUserAdmin.error
});
  
export default connect(mapStateToProps, { makeUserAdmin })(MakeUserAdminForm);