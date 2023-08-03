import React, { useEffect } from 'react';
import { fetchNewReviewReplyDataByReviewId } from '../../redux/actions/replyReviewActions';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { Container, Header } from 'semantic-ui-react';

interface ReviewReplyData {
    id: string;
    reviewId: string;
    userId: string;
    username: string;
    body: string,
    slug: string,
    createdAt: Date;
};

interface ReviewReplyProps {
    id: string;
    slug: string;
    reviewReply: ReviewReplyData | null;
    error: string | null;
    fetchNewReviewReplyDataByReviewId: (slug: string, id: string) => void;
}

const ReviewReply: React.FC<ReviewReplyProps> = ({ id, slug, reviewReply, error, fetchNewReviewReplyDataByReviewId }) => {
    useEffect(() => {
        fetchNewReviewReplyDataByReviewId(id, slug);
    }, [id, slug, fetchNewReviewReplyDataByReviewId]);

    const formatDate = (date: Date) => {
        const newDate = new Date(date);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return newDate.toLocaleDateString('en-US', options);
    }

    if(error) return `Error retrieving this reply! ${error}`;

    if(reviewReply) {
        const date = formatDate(reviewReply.createdAt)

        return (
            <div>
                <Container textAlign='left'><Header as='h6'>By {reviewReply.username}</Header></Container>
                <Container textAlign='right'><i>{date}</i></Container>
                <Container text>
                    <p>{reviewReply.body}</p>
                </Container>
            </div>
        );
    };

    return null;
};

const mapStateToProps = (state: RootState) => ({
    reply: state.reviewReply.data,
    error: state.reviewReply.error
});

const mapDispatchToProps = {
    fetchNewReviewReplyDataByReviewId
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewReply);