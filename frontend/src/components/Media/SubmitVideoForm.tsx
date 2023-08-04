import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { sendNewVideo } from '../../redux/actions/mediaActions';
import { RootState } from '../../redux/store';
import { Button, Form, Message, Dropdown } from 'semantic-ui-react';
import NewTagForm from '../Tags/NewTagForm';
import { NewTagData } from "../../redux/types/tagTypes";
import { TagData } from "../../redux/types/tagTypes";
import { fetchTagData } from "../../redux/actions/tagActions";


interface NewVideoData {
    username: string;
    link: string;
    about: string;
    tags: string[];
};

interface NewVideoProps {
    newPhoto: NewVideoData | null;
    error: string;
    sendNewVideo: (
        username: string,
        link: string,
        about: string,
        tags: string[]
    ) => Promise<void>;
    fetchTagData: () => Promise<void>
};

const SubmitVideoForm: React.FC<NewVideoProps> = ({ newPhoto, error, sendNewVideo, fetchTagData }) => {
    const username = localStorage.getItem('username') ?? '';

    const initialVideoState = {
            username: username,
            link: '',
            about: '',
            tags: []
    };

    const [ formData, setFormData ] = useState<NewVideoData>(initialVideoState);
    const [ showCreateNewTagForm, setShowCreateNewTagForm ] = useState<boolean>(false);
    const [ tags, setTags ] = useState<TagData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetchTagData();
            } catch (error: any) {
                return `Can't retrieve tag data: error ${error.message}`
            }
        };
        fetchData();
    }, [fetchTagData]);

    useEffect(() => {
        if(tags.length > 0) {
            setTags(tags);
        }
    }, [tags]);

    const tagOptions = tags.map((tag) => ({ key: tag.id, text: tag.tag, value: tag.id}))

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await sendNewVideo(formData.username,
            formData.link,
            formData.about,
            formData.tags);

        setFormData(initialVideoState);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [ name ]: value
        });
    };

    const initialNewTagData: NewTagData = {
        tag: 'New Tag'
    };

    return (
        <div>
            <Form onSubmit={handleSubmit} error>
                <Form.Field required>
                    <label>Place photo link here:</label>
                    <input name='link' value={formData.link} onChange={handleChange} />
                </Form.Field>
                <Form.Field required>
                    <label>Place photo link here:</label>
                    <input name='about' value={formData.about} onChange={handleChange} />
                </Form.Field>
                <Button>Submit</Button>
                <Message
                    error
                    header={error}
                    content={error}
                />
            </Form>
            <label>Tags</label>
            <Dropdown clearable options={tagOptions} multiple fluid selection value={formData.tags} />
            <Button onClick={() => setShowCreateNewTagForm(true)}>Create New Tag?</Button>
            {showCreateNewTagForm && <NewTagForm newTag={initialNewTagData} />}
        </div>
    )
};

const mapStateToProps = (state: RootState) => ({
    video: state.video.data,
    error: state.video.error,
    tags: state.tag.data,
    tagError: state.tag.error
});

const mapDispatchToProps = {
    sendNewVideo,
    fetchTagData
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitVideoForm);