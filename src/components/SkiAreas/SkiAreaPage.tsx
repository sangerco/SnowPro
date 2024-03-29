import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  Dimmer,
  Loader,
  Container,
  Grid,
  Divider,
  List,
  Button,
  Card,
  Segment,
} from "semantic-ui-react";
import { URL } from "../../utils/config";
import axios from "axios";
import { SkiAreaPageData } from "../interfaces/skiAreaInterfaces";
import { fetchReviewsBySkiArea } from "../../redux/slices/reviewSlice";
import {
  createFavMountain,
  FavMountainData,
} from "../../redux/slices/favMountainSlice";
import { Link, useParams } from "react-router-dom";
import { Header } from "semantic-ui-react";
import SkiAreaMap from "./SkiAreaMap";
import ReviewView from "../Reviews/ReviewView";

type LiftStats = {
  open: number;
  hold: number;
  scheduled: number;
  closed: number;
};

type PercentageStats = {
  open: number;
  hold: number;
  scheduled: number;
  closed: number;
};

type Stats = {
  stats: LiftStats & { percentage: PercentageStats };
};

type LiftStatus = "closed" | "open" | "hold" | "scheduled";

const SkiAreaPage: React.FC = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = auth.isAuthenticated;
  const userId = auth.data?.id;
  let username;
  if (auth.data) {
    username = auth.data.username;
  }

  const [skiAreaData, setSkiAreaData] = useState<SkiAreaPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkiAreaData = async () => {
      try {
        const response = await axios.get(`${URL}/ski-areas/${slug}`);
        const responseData = response.data;
        setSkiAreaData(responseData);
        setLoading(false);
      } catch (e: any) {
        const errorMessage = e.message;
        setLoading(false);
        console.error(`Error Loading Ski Area! Error: ${errorMessage}`);
      }
    };

    fetchSkiAreaData();
  }, [slug]);

  const favMountainData: FavMountainData = {
    userId: userId || "",
    username: username || "",
    skiAreaSlug: slug || "",
  };

  const favMountainInfo = skiAreaData?.usersFavoritedBy;

  let isFavorited = false;

  if (favMountainInfo) {
    for (let i = 0; i < favMountainInfo.length; i++) {
      if (favMountainInfo[i].username === username) {
        isFavorited = true;
      }
    }
  }

  useEffect(() => {
    if (slug) {
      dispatch(fetchReviewsBySkiArea(slug));
    }
  }, [dispatch, slug]);

  const reviewState = useSelector((state: RootState) => state.reviews);
  const reviews = reviewState.reviews;

  if (loading) {
    return (
      <div>
        <Dimmer active>
          <Loader>Loading...</Loader>
        </Dimmer>
      </div>
    );
  } else if (skiAreaData !== null) {
    const statsObject = skiAreaData.lifts.stats;
    const { percentage, ...statsWithoutPercentObject } = statsObject;
    const percentageObject = statsObject.percentage;

    const statusColor = (status: LiftStatus): string => {
      switch (status) {
        case "closed":
          return "red";
        case "open":
          return "green";
        case "hold":
          return "yellow";
        case "scheduled":
          return "blue";
      }
    };

    const stats = Object.keys(statsWithoutPercentObject).map((key) => {
      const value = statsObject[key as keyof LiftStats];
      return (
        <List.Item
          key={key}
          style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{key}: </span>
          <span>{value}</span>
        </List.Item>
      );
    });

    const percent = Object.keys(percentageObject).map((key) => {
      const value = percentageObject[key as keyof PercentageStats];
      return (
        <List.Item
          key={key}
          style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{key}: </span>
          <span>{value}%</span>
        </List.Item>
      );
    });

    const liftsObject = skiAreaData.lifts.status;

    const lifts = Object.keys(liftsObject).map((liftName) => {
      const liftStatus = liftsObject[liftName];
      const color = statusColor(liftStatus as LiftStatus);
      return (
        <>
          <List.Item
            key={liftName}
            style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{liftName}</span>
            <span style={{ color }}>{liftStatus}</span>
          </List.Item>
          <Divider />
        </>
      );
    });

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Container
              style={{
                margin: "10px",
                border: "red solid 1px",
                padding: "10px",
              }}>
              <Header as="h3" style={{ margin: "20px" }}>
                Users who favorited this ski area:
              </Header>
              <Card.Group>
                {favMountainInfo && favMountainInfo.length > 0 ? (
                  favMountainInfo.map((fm) => (
                    <Card
                      key={fm.userId}
                      style={{ marginTop: "20px", padding: "10px" }}>
                      <Header>{fm.username}</Header>
                      <Card.Meta as={Link} to={`/users/${fm.username}`}>
                        {fm.username}'s Page
                      </Card.Meta>
                    </Card>
                  ))
                ) : (
                  <Segment
                    textAlign="center"
                    raised
                    style={{ marginTop: "20px", marginLeft: "20px" }}>
                    <p>No one has favorited this mountain yet!</p>
                  </Segment>
                )}
              </Card.Group>
            </Container>
          </Grid.Column>
          <Grid.Column width={5}>
            <a href={skiAreaData.href}>
              <Header as="h1" color="green" style={{ padding: "10px" }}>
                {skiAreaData.name}
              </Header>
            </a>
            <Divider />
            <Header as="h4" textAlign="right">
              Country: {skiAreaData.country}
            </Header>
            <Header as="h4" textAlign="right">
              Region: {skiAreaData.region}
            </Header>
            <Divider />
            {isAuthenticated && !isFavorited ? (
              <Button
                color="green"
                size="small"
                floated="right"
                onClick={() => dispatch(createFavMountain(favMountainData))}
                style={{ marginTop: "10px", marginBottom: "10px" }}>
                Save as favorite mountain?
              </Button>
            ) : null}
            <Divider />
            <Segment raised>
              <span style={{ margin: "10px", padding: "10px" }}>
                Visited this resort?
              </span>
              <Link to={`/ski-areas/${skiAreaData.slug}/review`}>
                <Button size="mini" color="blue">
                  Leave a Review!
                </Button>
              </Link>
            </Segment>
            <Header as="h4" textAlign="left">
              Reviews of {skiAreaData.name}
            </Header>
            {reviews && reviews.length > 0
              ? reviews.map((review) => <ReviewView review={review} />)
              : null}
          </Grid.Column>
          <Grid.Column width={7}>
            <SkiAreaMap skiAreaPageData={skiAreaData} />
            <Divider />
            <div
              style={{
                backgroundColor: "antiquewhite",
                width: "450px",
                padding: "10px",
              }}>
              <Header as="h2">Lift Status</Header>
              {stats}
              <Divider />
              {percent}
              <Divider />
              <Header as="h3">Lifts</Header>
              {lifts}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return null;
};

export default SkiAreaPage;
