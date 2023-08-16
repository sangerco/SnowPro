import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../utils/config";
import { Link } from "react-router-dom";
import { Container, Header, Icon } from "semantic-ui-react";
import { SkiAreaProps, SkiAreaData } from "../../interfaces/skiAreaInterfaces";

const SkiArea: React.FC<SkiAreaProps> = ({
  slug,
  name,
  country,
  region,
  lat,
  long,
  url,
}) => {
  const [skiAreaDataObject, setSkiAreaDataObject] = useState({ href: "" });

  useEffect(() => {
    const fetchSkiAreaData = async () => {
      try {
        const response: SkiAreaData = await axios.get(
          `${URL}/ski-areas/${slug}`
        );
        setSkiAreaDataObject(response.data);
      } catch (e: any) {
        const errorMessage = e.message;
        console.error(e);
        throw new Error(`Error Loading Ski Area! ${errorMessage}`);
      }
    };

    fetchSkiAreaData();
  }, [slug]);

  const href = skiAreaDataObject.href;

  console.log(slug);

  return (
    <Container text>
      <Header size="huge">
        <Link to={`/ski-areas/${slug}`}>{name}</Link>
      </Header>
      <Container textAlign="right">
        <p style={{ color: "royalblue" }}>{country}</p>
        <p style={{ color: "royalblue" }}>{region}</p>
        {/* <a style={{ color: "royalblue" }} href={url}>{ url }</a> */}
      </Container>
      <Container textAlign="right">
        <p>
          <small>
            <span style={{ color: "royalblue" }}>
              <Icon name="map outline" />
            </span>{" "}
            {lat}, {long}
          </small>
        </p>
      </Container>
    </Container>
  );
};

export default SkiArea;
