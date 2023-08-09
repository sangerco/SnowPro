import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../utils/config';
import { connect } from 'react-redux';
import { useAuth } from '../AuthProvider';
import { updateReview, fetchReviewDataById } from '../../redux/actions/reviewActions';
import { fetchTagData } from '../../redux/actions/tagActions';
import NewTagForm from '../Tags/NewTagForm';
import { NewTagData, TagData } from '../../redux/types/tagTypes';
import { RootState } from '../../redux/store'
import { Button, Container, Dropdown, Divider, Form, Message, Header, Label } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router';

interface ReviewData {
    id: string;
    userId: string;
    username: string;
    skiAreaSlug: string;
    skiAreaName: string;
    header: string;
    body: string;
    stars: number;
    photos: string[];
    tags: string[];
    createdAt: Date;
};

interface UpdateReviewData {
    id?: string;
    userId?: string;
    username?: string;
    skiAreaSlug?: string;
    skiAreaName?: string;
    header?: string;
    body?: string;
    stars?: number;
    photos?: string[];
    tags?: string[];
};

interface UpdateReviewProps {
    review: UpdateReviewData | null;
    error: string;
    updateReview: (
        id: string,
        userId: string,
        username: string,
        skiAreaSlug: string,
        skiAreaName: string,
        header: string,
        body: string,
        stars: number,
        photos: string[],
        tags: string[]
    ) => Promise<void>;
    fetchTagData: () => Promise<void>;
};

const UpdateReview: React.FC<UpdateReviewProps> = ({review, error, updateReview, fetchTagData}) => {
    const navigate = useNavigate();
    const { slug, id } = useParams<{ slug: string, id: string }>();
    const { userId } = useAuth();
    const { username } = useAuth();

    const initialUpdateReviewState: UpdateReviewData = {
        id: id || '',
        userId: userId ?? '',
        username: username ?? '',
        skiAreaSlug: slug || '',
        skiAreaName: '',
        header: '',
        body: '',
        stars: 3,
        photos: [],
        tags: []
    };

    const [ formData, setFormData ] = useState(initialUpdateReviewState);
    const [ tags, setTags ] = useState<TagData[]>([]);
    const [ photos, setPhotos ] = useState<string[]>([]);
    const [ showStarsDropdown, setShowStarsDropdown ] = useState(false);
    const [ showCreateNewTagForm, setShowCreateNewTagForm ] = useState(false)

    useEffect(() => {
        const fetchData = async (slug: string, id: string) => {
            try {
                const response = await axios.get(`${URL}/ski-areas/${slug}/reviews/${id}`);
                const reviewData = response.data.review.reviewData;
                setFormData(reviewData)
            } catch (error: any) {
                return <p>{`Review could not be retrieved! Error: ${error.message}`}</p>
            }
        };
        fetchData(slug || '', id || '');
    }, [slug, id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchTagData();
            } catch (error: any) {
                return <p>{`Can't retrieve tag data! Error: ${error.message}`}</p>
            }
        };
        fetchData()
    }, [fetchTagData]);

    useEffect(() => {
        if(tags.length > 0) {
            setTags(tags);
        }
    }, [tags]);

    useEffect(() => {
        if(formData.photos  && formData.photos.length > 0) {
            setPhotos(formData.photos)
        }
    }, [formData.photos]);

    const dropdownOptions = [
        { key: 1, text: '1', value: 1 },
        { key: 2, text: '2', value: 2 },
        { key: 3, text: '3', value: 3 },
        { key: 4, text: '4', value: 4 },
        { key: 5, text: '5', value: 5 },
    ];

    const tagOptions = tags.map((tag) => ({ key: tag.id, text: tag.tag, value: tag.id}));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await updateReview( id || '',
                            userId ?? '',
                            username ?? '',
                            slug || '',
                            formData.skiAreaName || '',
                            formData.header || '',
                            formData.body || '',
                            formData.stars || 3,
                            formData.photos || [],
                            formData.tags || []);

        setFormData(initialUpdateReviewState);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [ name ]: value
        });
    };

    const handlePhotoChange = (index: number, value: string) => {
        const updatedPhotos = [...photos];
        updatedPhotos[index] = value;
        setPhotos(updatedPhotos);
    };

    const handleAddPhotos = () => {
        setPhotos([...photos, '']);
    };

    const handleRemovePhotos = (index: number) => {
        const updatedPhotos = [...photos];
        updatedPhotos.splice(index, 1);
        setPhotos(updatedPhotos);
    }

    const initialNewTagData: NewTagData = {
        tag: 'New Tag'
    };

    const handleCancel = () => {
        navigate(-1);
    }

    return (
        <Container fluid>
            <Form onSubmit={handleSubmit} error>
                <Form.Field>
                    <label>Header</label>
                    <input name='header' value={formData.header} placeholder={formData.header} onChange={handleChange} />
                </Form.Field>
                <Form.TextArea>
                    <label>Review</label>
                    <input name='body' value={formData.body} placeholder={formData.header} onChange={handleChange} />
                </Form.TextArea>
                {photos.map((photo, index) => (
                    <Form.Field key={index}>
                        <label>Photo Links</label>
                        <input
                            type="text"
                            value={photo}
                            onChange={(e) => handlePhotoChange(index, e.target.value)}
                        />
                        {index === photos.length - 1 && (
                            <Button icon='plus' onClick={handleAddPhotos} />
                        )}
                        {(index > 0 && (
                            <Button icon='minus' onClick={() => handleRemovePhotos(index)} />
                        ))}
                    </Form.Field>
                ))}
                <Button type='submit' green>Update</Button>
                <Button type='submit' red onClick={handleCancel}>Cancel</Button>
                <Message
                    error
                    header={error}
                    content={error}
                />
            </Form>
            <Divider />
            <Header as='h6'>{`You rated this ski resort ${formData.stars}.`}</Header>
            <Button onClick={() => setShowStarsDropdown(true)} green>Change rating?</Button>
            {showStarsDropdown && <Dropdown clearable options={dropdownOptions} selection fluid value={formData.stars} />}
            {formData.tags?.map(tag => <Label key={tag} green>{tag}</Label>)}
            <Dropdown clearable options={tagOptions} multiple fluid selection value={formData.tags} />
            <Button onClick={() => setShowCreateNewTagForm(true)}>Create New Tag?</Button>
            {showCreateNewTagForm && <NewTagForm newTag={initialNewTagData} />}
        </Container>
    )
};

const mapStateToProps = (state: RootState) => ({
    tags: state.tag.data,
    tagError: state.tag.error,
    review: state.review.data,
    reviewError: state.review.error
});

const mapDispatchToProps = {
    updateReview,
    fetchTagData,
    fetchReviewDataById
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReview)
