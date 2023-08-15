import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { sendNewReplyData } from '../../oldRedux/actions/messageReplyActions'
import { RootState } from '../../oldRedux/store';
import { Button, Form, Message } from 'semantic-ui-react';
import { URL } from '../../utils/config';

interface MessageData {
    message_id: string;
    sender_id: string;
    recipient_id: string;
    subject: string;
    body: string;    
}

interface NewReplyData {
    message_id: string;
    sender_id: string;
    recipient_id: string;
    subject: string;
    body: string;
};

interface NewReplyProps {
    newReply: NewReplyData | null;
    error: string;
    sendNewReplyData: (formData: NewReplyData) => Promise<void>
};

const NewMessageReplyForm: React.FC<NewReplyProps> = ({ newReply, error, sendNewReplyData }) => {
    const { message_id } = useParams();
    const [ messageData, setMessageData ] = useState<MessageData | null>(null)

    useEffect(() => {
        const fetchMessageData = async () => {
            try {
                const response = await axios.get(`${URL}/messages/${message_id}`);
                setMessageData(response.data);
            } catch (error) {
                console.error(`Error fetching message data: ${error}`)
            }
        };

        fetchMessageData();
    }, [message_id]);

    const [formData, setFormData] = useState<NewReplyData>({
        message_id: '',
        sender_id: '',
        recipient_id: '',
        subject: '',
        body: ''
    });

    useEffect(() => {
        if(messageData) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                message_id: messageData.message_id,
                sender_id: messageData.recipient_id, /* vital that sender_id and recipient_id are switched here */
                recipient_id: messageData.sender_id,
                subject: `Re: ${messageData.subject}`
            }));
        }
    }, [messageData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await sendNewReplyData(formData);

        setFormData({
            message_id: '',
            sender_id: '',
            recipient_id: '',
            subject: '',
            body: ''
        });
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [ name ]: value
        });
    };

    return (
        <Form onSubmit={handleSubmit} error>
            <Form.Field>
                <input placeholder={`Re: ${formData.subject}`} name='subject' value={formData.subject} onChange={handleChange}/>
            </Form.Field>
            <Form.TextArea>
                <input name='body' value={formData.body} onChange={handleChange}/>
            </Form.TextArea>
            <Button type='submit'>Send</Button>
            <Message
                error
                header={error}
                content={error}
            />
        </Form>
    )
};

const mapStateToProps = (state: RootState) => ({
    newMessage: state.newMessageReply.data,
    error: state.newMessageReply.error
})

export default connect(mapStateToProps, { sendNewReplyData })(NewMessageReplyForm)