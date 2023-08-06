import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useAuth } from '../AuthProvider';
import { sendNewReviewReplyData } from '../../redux/actions/replyReviewActions';
import { RootState } from '../../redux/store';
import { Button, Container, Form, Message } from 'semantic-ui-react';
import { useParams } from 'react-router';

interface NewReviewReplyData {
    userId: string;
    reviewId: string;
    body: string;
}

interface NewReviewReplyProps {
    newReviewReply: NewReviewReplyData | null;
    error: string;
    sendNewReviewReplyData: ( userId: string,
                                review: string,
                                body: string) => Promise<void>;
}

const ReviewReplyForm: React.FC<NewReviewReplyProps> = ({ newReviewReply, error, sendNewReviewReplyData }) => {
    const { reviewId } = useParams<{ reviewId: string }>();
    const { userId } = useAuth();
    const initialReviewReplyState = {   userId: userId ?? '',
                                        reviewId: reviewId,
                                        body: '' };

    const [ formData, setFormData ] = useState(initialReviewReplyState);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await sendNewReviewReplyData(   formData.userId,
                                        formData.reviewId ?? '',
                                        formData.body);

        setFormData(initialReviewReplyState);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Container fluid>
            <Form onSubmit={handleSubmit} error>
                <Form.TextArea>
                    <label>Reply to this review.</label>
                    <input name='body' value={formData.body} onChange={handleChange} />
                </Form.TextArea>
            <Button type='submit' color='green'>Reply</Button>
            <Message 
                error
                header={error}
                content={error}
            />
            </Form>
        </Container>
    )
};

const mapStateToProps = (state: RootState) => ({
    newReviewReply: state.newReviewReply.data,
    error: state.newReviewReply.error
});

const mapDispatchToProps = {
    sendNewReviewReplyData
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export default connect(mapStateToProps, mapDispatchToProps)(ReviewReplyForm)