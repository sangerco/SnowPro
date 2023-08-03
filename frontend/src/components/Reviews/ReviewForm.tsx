import React, { useState } from "react";
import { connect } from 'react-redux';
import { sendNewReviewData } from "../../redux/actions/reviewActions";
import { RootState } from "../../redux/store";
import { Button, Container, Dropdown, Form, Message } from 'semantic-ui-react';

interface NewReviewData {
    userId: string;
    skiAreaSlug: string;
    header: string;
    body: string;
    stars: number;
    photos: string[];
    tags: string[];
};

interface NewReviewProps {
    newReview: NewReviewData | null;
    error: string;
    sendNewReviewData: ( userId: string,
                            skiAreaSlug: string,
                            header: string,
                            body: string,
                            stars: number,
                            photos: string[],
                            tags: string[]) => Promise<void>
};

const ReviewForm: React.FC<NewReviewProps> = ({ newReview, error, sendNewReviewData }) => {
    const initialReviewState = { userId: '',
                                    skiAreaSlug: '',
                                    header: '',
                                    body: '',
                                    stars: 3,
                                    photos: [],
                                    tags: []}

    const [formData, setFormData] = useState(initialReviewState);

    const dropdownOptions = [
        { key: 1, text: '1', value: 1 },
        { key: 2, text: '2', value: 2 },
        { key: 3, text: '3', value: 3 },
        { key: 4, text: '4', value: 4 },
        { key: 5, text: '5', value: 5 },
    ]

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await sendNewReviewData(formData.userId,
                                    formData.skiAreaSlug,
                                    formData.header,
                                    formData.body,
                                    formData.stars,
                                    formData.photos,
                                    formData.tags);
                
        setFormData(initialReviewState);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit} error>
                <Form.Field>
                    <label>Header</label>
                    <input name="header" value={formData.header} onChange={handleChange} />
                </Form.Field>
                <Form.TextArea>
                    <label>Review</label>
                    <input placeholder="How Was It?" name="body" value={formData.body} onChange={handleChange} />
                </Form.TextArea>
            </Form>
            <Dropdown />
        </Container>
    )
}