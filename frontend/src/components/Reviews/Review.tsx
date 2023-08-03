import React, { useEffect } from "react";
import { fetchReviewDataById } from '../../redux/actions/reviewActions';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader, Header, Divider, Image, Label } from 'semantic-ui-react';
import { ReviewReplyData } from "../../redux/types/reviewReplyTypes";
import ReviewReply from "./ReviewReply";

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
    replyData: ReviewReplyData[]
};

interface ReviewProps {
    id: string;
    slug: string;
    review: ReviewData | null;
    loading: boolean;
    error: string | null;
    fetchReviewDataById: (id: string, slug: string) => void;
};

const Review: React.FC<ReviewProps> = ({ id, slug, review, loading, error, fetchReviewDataById }) => {
    useEffect(() => {
        fetchReviewDataById(id, slug);
    }, [id, slug, fetchReviewDataById]);

    const formatDate = (date: Date) => {
        const newDate = new Date(date);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return newDate.toLocaleDateString('en-US', options);
    }

    if(loading) {
        return (
            <div>
                <Dimmer active>
                    <Loader>Loading...</Loader>
                </Dimmer>
            </div>
        )
    }

    if(error) return `Error! ${error}`

    if(review) {
        const date = formatDate(review.createdAt)

        return (
            <div>
                <Container textAlign='left'><Header as='h2'>{review.header}</Header></Container>
                <Container textAlign='left'><Header as='h5'>{review.skiAreaName}</Header></Container>
                <Container textAlign="left"><Header as='h6'>By {review.username}</Header></Container>                
                <Container textAlign='right'><i>{date}</i></Container>   
                    
                <Container text>   
                    <p>{review.body}</p>
                    <Divider />
                    {review.tags.length > 0 ? review.tags.map(tag => 
                    <Label.Group green>
                            <Label as='a'>{tag}</Label>
                    </Label.Group>) : <Divider />}
                    <Divider />
                    {review.photos.length > 0 ? review.photos.map(photo => 
                    <Image src={photo} fluid />) : <p>No photos yet.</p>}
                </Container>


                {review.replyData.length > 0 ? review.replyData.map(reviewReply =>
                  <ReviewReply
                        key={reviewReply.id}
                        id={reviewReply.id}
                        slug={reviewReply.slug}
                        reviewReply={reviewReply} 
                    /> ) : <Divider /> }
            </div>
        )

    }

    return null;
};

const mapStateToProps = (state: any) => ({
    review: state.review.data,
    loading: state.review.loading,
    error: state.review.error
});

const mapDispatchToProps = {
    fetchReviewDataById
};

export default connect(mapStateToProps, mapDispatchToProps)(Review);