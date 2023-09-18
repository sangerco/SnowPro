import React, { useEffect, useState } from "react";
import MyPage from "./MyPage";
import { fetchSkiAreas } from "../../redux/slices/skiAreaSlice";
import { fetchAllReviews } from "../../redux/slices/reviewSlice";
import AnonHome from "./AnonHome";
import "./Home.css";
import {
  Card,
  Dimmer,
  Divider,
  Grid,
  Header,
  Loader,
  Pagination,
  PaginationProps,
  Rating,
  Segment,
} from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import Inbox from "../Messages/Inbox";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const username = useSelector((state: RootState) => state.auth.data?.username);

  useEffect(() => {
    dispatch(fetchSkiAreas());
  }, [dispatch]);

  const skiAreaState = useSelector((state: RootState) => state.skiAreas);
  const skiAreas = skiAreaState.skiAreas;

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  const reviewState = useSelector((state: RootState) => state.reviews);
  const reviews = reviewState.reviews;

  let totalReviews;
  let paginatedReviews;

  const itemsPerPage = 3;
  const [activePage, setActivePage] = useState(1);
  reviews ? (totalReviews = reviews.length) : (totalReviews = 1);
  const totalPages = Math.ceil(totalReviews / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalReviews);
  reviews
    ? (paginatedReviews = reviews.slice(startIndex, endIndex))
    : (paginatedReviews = 1);

  const handlePaginationChange = (
    e: React.MouseEvent,
    data: PaginationProps
  ) => {
    setActivePage(data.activePage as number);
  };

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  };

  return (
    <div id="background-container">
      <Grid>
        <Grid.Row>
          <Grid.Column widescreen={4}>
            {skiAreaState.loading ? (
              <Dimmer active>
                <Loader>Loading...</Loader>
              </Dimmer>
            ) : skiAreas && skiAreas.length > 0 ? (
              <Card id="ski-area-card">
                {" "}
                {/* max height overflow auto */}
                {skiAreas.map((sa) => (
                  <Card.Content key={sa.slug}>
                    <Link to={`/ski-areas/${sa.slug}`}>{sa.name}</Link>
                  </Card.Content>
                ))}
              </Card>
            ) : skiAreaState.error ? (
              <Dimmer active>
                <Header as="h1">
                  Error! Ski Area Data cannot be retrieved! {skiAreaState.error}
                </Header>
              </Dimmer>
            ) : null}
          </Grid.Column>
          <Grid.Column width={8}>
            <Segment>{isAuthenticated ? <MyPage /> : <AnonHome />}</Segment>
          </Grid.Column>
          <Grid.Column width={4}>
            {reviewState.loading ? (
              <Dimmer active>
                <Loader>Loading...</Loader>
              </Dimmer>
            ) : reviewState.error ? (
              <Dimmer active>
                <Header as="h1">
                  Error! Review Data cannot be retrieved! {reviewState.error}
                </Header>
              </Dimmer>
            ) : isAuthenticated && username ? (
              <div id="inbox-div">
                <Inbox username={username} />
              </div>
            ) : reviews && reviews.length > 0 ? (
              <div>
                <Grid.Row style={{ width: "250px" }}>
                  {reviews.map((review) => (
                    <Grid.Column>
                      {" "}
                      {/* paginated */}
                      <Segment key={review.id} id="review-card">
                        <Header as="h3">
                          <Link to={`/ski-areas/reviews/${review.id}`}>
                            {review.header}
                          </Link>{" "}
                        </Header>
                        <Header as="h4">{review.skiAreaName}</Header>
                        <p>By {review.username}</p>
                        <Divider />
                        <Rating
                          icon="star"
                          defaultRating={review.stars}
                          maxRating={5}
                          disabled
                        />
                        <Divider />
                        {formatDate(review.createdAt)}
                      </Segment>
                    </Grid.Column>
                  ))}
                </Grid.Row>
                <Pagination
                  activePage={activePage}
                  totalPages={totalPages}
                  onPageChange={handlePaginationChange}
                />
              </div>
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
