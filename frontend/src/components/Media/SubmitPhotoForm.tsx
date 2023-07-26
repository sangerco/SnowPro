import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendNewPhoto } from '../../redux/actions/mediaActions';
import { RootState } from '../../redux/store';
import { Button, Form, Message } from 'semantic-ui-react';

interface NewPhotoData {
    link: string;
};

interface NewPhotoProps {
    newPhoto: NewPhotoData | null;
    error: string;
    sendNewPhoto: (
        link: string
    ) => Promise<void>
};

const SubmitPhotoForm: React.FC<NewPhotoProps> = ({ newPhoto, error, sendNewPhoto }) => {
    const [ formData, setFormData ] = useState<NewPhotoData>({ link: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await sendNewPhoto(formData.link);

        setFormData({ link: '' });
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [ name ]: value
        });
    }

    return (
        <Form onSubmit={handleSubmit} error>
            <Form.Field required>
                <label>Place photo link here:</label>
                <input name='link' value={formData.link} onChange={handleChange} />
            </Form.Field>
            <Button>Submit</Button>
            <Message
                error
                header={error}
                content={error}
            />
        </Form>
    )
};

const mapStateToProps = (state: RootState) => ({
    photo: state.photo.data,
    error: state.photo.error
});

export default connect(mapStateToProps, { sendNewPhoto })(SubmitPhotoForm);