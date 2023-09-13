import React, { useEffect, useState } from "react";
import {
  Card,
  Dimmer,
  Divider,
  Grid,
  Header,
  Loader,
  Rating,
} from "semantic-ui-react";
import { fetchAllReviews } from "../../redux/slices/reviewSlice";
import { URL } from "../../utils/config";
import SkiArea from "./SkiArea";
import axios from "axios";
import {
  SkiResort,
  SkiResortDataResponse,
} from "../interfaces/skiAreaInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Link } from "react-router-dom";

const SkiAreaData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [skiAreaResponse, setSkiAreaResponse] = useState<SkiResort[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkiAreaData = async () => {
      try {
        const response: SkiResortDataResponse = await axios.get(
          `${URL}/ski-areas`
        );
        setSkiAreaResponse(response.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };

    fetchSkiAreaData();
  }, []);

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  const reviewState = useSelector((state: RootState) => state.reviews);
  const reviews = reviewState.reviews;

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  };

  if (skiAreaResponse === null) {
    return (
      <div>
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      </div>
    );
  } else {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4} textAlign="center">
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
            ) : reviews && reviews.length > 0 ? (
              <>
                {reviews.map((review) => (
                  <Card style={{ marginLeft: "10px" }}>
                    <Card.Content key={review.id} id="review-card">
                      <Card.Header>
                        <Link to={`/ski-areas/reviews/${review.id}`}>
                          {review.header}
                        </Link>{" "}
                        <Divider />
                        {review.skiAreaName}
                      </Card.Header>
                      <Card.Description>By {review.username}</Card.Description>
                      <Card.Meta>
                        <Rating
                          icon="star"
                          defaultRating={review.stars}
                          maxRating={5}
                          disabled
                        />
                      </Card.Meta>
                      {formatDate(review.createdAt)}
                    </Card.Content>
                  </Card>
                ))}
              </>
            ) : null}
          </Grid.Column>
          <Grid.Column width={8}>
            {skiAreaResponse.map((skiArea) => (
              <SkiArea
                key={skiArea.slug}
                slug={skiArea.slug}
                name={skiArea.name}
                country={skiArea.country}
                region={skiArea.region}
                lat={skiArea.location.latitude}
                long={skiArea.location.longitude}
                url={skiArea.url}
              />
            ))}
          </Grid.Column>
          <Grid.Column width={4}></Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};

export default SkiAreaData;
