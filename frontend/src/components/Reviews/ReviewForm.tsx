import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useAuth } from "../AuthProvider";
import { sendNewReviewData } from "../../oldRedux/actions/reviewActions";
import { fetchTagData } from "../../oldRedux/actions/tagActions";
import NewTagForm from "../Tags/NewTagForm";
import { NewTagData } from "../../oldRedux/types/tagTypes";
import { RootState } from "../../oldRedux/store";
import { Button, Container, Divider, Dropdown, Form, Message, TextArea } from 'semantic-ui-react';
import { TagData } from "../../oldRedux/types/tagTypes";
import { useParams } from "react-router";

interface NewReviewData {
    userId: string;
    skiAreaSlug: string;
    header: string;
    body: string;
    stars: number;
    photos: string[];
    tagIds: string[];
};

interface NewReviewProps {
    newReview: NewReviewData | null;
    error: string;
    tags: TagData[] | null;
    sendNewReviewData: ( userId: string,
                            skiAreaSlug: string,
                            header: string,
                            body: string,
                            stars: number,
                            photos: string[],
                            tagIds: string[]) => Promise<void>;
    fetchTagData: () => Promise<void>
};

const ReviewForm: React.FC<NewReviewProps> = ({ newReview, error, tags, sendNewReviewData, fetchTagData }) => {
    const { skiAreaSlug } = useParams<{ skiAreaSlug: string }>();
    const { userId } = useAuth();
    const initialReviewState = { userId: userId ?? '',
                                    skiAreaSlug: skiAreaSlug,
                                    header: '',
                                    body: '',
                                    stars: 0,
                                    photos: [],
                                    tagIds: []}

    const [formData, setFormData] = useState(initialReviewState);
    // const [tags, setTags] = useState<TagData[]>([]);
    const [photoLinks, setPhotoLinks] = useState<string[]>(['']);
    const [showCreateNewTagForm, setShowCreateNewTagForm] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchTagData();
            } catch (error: any) {
                return `Can't retrieve tag data: error ${error.message}`
            }
        };
        fetchData();
    }, [fetchTagData]);

    const dropdownOptions = [
        { key: 1, text: '1', value: 1 },
        { key: 2, text: '2', value: 2 },
        { key: 3, text: '3', value: 3 },
        { key: 4, text: '4', value: 4 },
        { key: 5, text: '5', value: 5 },
    ]

    const tagOptions = (tags || []).map((tag) => ({ key: tag.id, text: tag.tag, value: tag.id}))

    console.log(tagOptions);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await sendNewReviewData(formData.userId,
                                    formData.skiAreaSlug ?? '',
                                    formData.header,
                                    formData.body,
                                    formData.stars,
                                    formData.photos,
                                    formData.tagIds);
                
        setFormData(initialReviewState);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePhotoChange = (index: number, value: string) => {
        const updatedPhotoLinks = [...photoLinks];
        updatedPhotoLinks[index] = value;
        setPhotoLinks(updatedPhotoLinks);
    };

    const handleAddPhotoInput = () => {
        setPhotoLinks([...photoLinks, '']);
    };

    const handleRemovePhotoInput = (index: number) => {
        const updatedPhotoLinks = [...photoLinks];
        updatedPhotoLinks.splice(index, 1);
        setPhotoLinks(updatedPhotoLinks);
    };

    const initialNewTagData: NewTagData = {
        tag: 'New Tag'
    };

    return (
        <Container fluid>
            <Form onSubmit={handleSubmit} error>
                <Form.Field>
                    <label>Header</label>
                    <input name="header" value={formData.header} onChange={handleChange} />
                </Form.Field>
                <Form.Field
                    id='form-textarea-control-review'
                    control={TextArea}
                    label='Review'
                    placeholder='How Was It?'
                    name='body'
                    value={formData.body}
                    onChange={handleChange}
                />
                {photoLinks.map((photoLink, index) => (
                    <Form.Field key={index}>
                        <label>Photo Links</label>
                        <input 
                            type="text" 
                            value={photoLink} 
                            onChange={(e) => handlePhotoChange(index, e.target.value)} 
                        />
                        {index === photoLinks.length - 1 && (
                            <Button icon='plus' onClick={handleAddPhotoInput} />
                        )}
                        {(index > 0 && (
                            <Button icon='minus' onClick={() => handleRemovePhotoInput(index)} />
                        ))}
                    </Form.Field>
                ))}
                <Button type="submit">Send It!</Button>
                <Message 
                    error
                    header={error}
                    content={error}
                />
            </Form>
            <Divider />
            <label>Tags</label>
            <Dropdown clearable options={tagOptions} multiple fluid selection value={formData.tagIds} />
            <Button onClick={() => setShowCreateNewTagForm(true)} size="small">Create New Tag?</Button>
            {showCreateNewTagForm && <NewTagForm newTag={initialNewTagData} />}
            <Divider />
            <label>How would you rate your experience?</label>
            <Dropdown clearable options={dropdownOptions} selection fluid value={formData.stars} />
            <Divider />
        </Container>
    )
};

const mapStateToProps = (state: RootState) => ({
    tags: state.tag.data,
    tagError: state.tag.error,
    newReview: state.newReview.data,
    reviewError: state.newReview.error
});

const mapDispatchToProps = {
    sendNewReviewData,
    fetchTagData
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm)