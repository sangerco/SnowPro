import React, { useState, useEffect } from "react";
import {
  Container,
  Dimmer,
  Loader,
  Segment,
  Image,
  Grid,
  List,
  Header,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { URL } from "../../utils/config";
import axios from "axios";
import {
  SkiResort,
  SkiResortDataResponse,
} from "../../interfaces/skiAreaInterfaces";
import { useDispatch } from "react-redux";

interface AnonHomeProps {
  fetchAllReviewsData: () => void;
}

const AnonHome: React.FC<AnonHomeProps> = ({ fetchAllReviewsData }) => {
  const [skiAreaResponse, setSkiAreaResponse] = useState<SkiResort[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
    dispatch(fetchAllReviewsData() as any);
  }, [dispatch, fetchAllReviewsData]);

  const skiAreas = skiAreaResponse.map((skiArea) => {
    return (
      <List key={skiArea.slug}>
        <List.Item>
          <Link to={`/ski-areas/${skiArea.slug}`}>
            <Header as="h3">{skiArea.name}</Header>
          </Link>
        </List.Item>
      </List>
    );
  });

  if (skiAreaResponse === null) {
    return (
      <Segment>
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>

        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    );
  } else {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>{skiAreas}</Grid.Column>
            <Grid.Column width={8}>
              <Container>
                <Grid>
                  <Grid.Row>
                    <Grid.Column>
                      <Header as="h1">Welcome to SnowPro!</Header>
                      <Header as="h3">
                        <i>
                          Get snow conditions, lift info, ski area reviews, and
                          more!
                        </i>
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Container>
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
};

export default AnonHome;
