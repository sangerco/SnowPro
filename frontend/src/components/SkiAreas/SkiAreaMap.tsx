import React, { useEffect, useRef, useState } from "react";
import { SkiAreaPageData } from "../../interfaces/skiAreaInterfaces";
import "@googlemaps/js-api-loader";
import { loadMapApi } from "../../utils/googleMapUtils";

interface SkiAreaMapProps {
  skiAreaPageData: SkiAreaPageData | null;
}

const SkiAreaMap: React.FC<SkiAreaMapProps> = ({ skiAreaPageData }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const googleMapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", function () {
      setScriptLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (skiAreaPageData && scriptLoaded) {
      googleMapRef.current = new google.maps.Map(
        document.getElementById(`${skiAreaPageData.slug}`) as HTMLElement,
        {
          zoom: 12,
          center: {
            lat: skiAreaPageData?.location.latitude,
            lng: skiAreaPageData?.location.longitude,
          },
          streetViewControl: false,
        }
      );

      attachMarker(skiAreaPageData);

      return () => {
        if (googleMapRef.current) {
          googleMapRef.current = null;
        }
      };
    }
  }, [skiAreaPageData, scriptLoaded]);

  const attachMarker = (skiAreaPageData: SkiAreaPageData): void => {
    if (googleMapRef.current) {
      const marker = new google.maps.Marker({
        map: googleMapRef.current,
        position: {
          lat: skiAreaPageData.location.latitude,
          lng: skiAreaPageData.location.longitude,
        },
      });

      marker.addListener("click", () => {
        const popup = new google.maps.InfoWindow({
          content: skiAreaPageData.name,
        });
        popup.open(googleMapRef.current, marker);
      });
    }
  };

  if (skiAreaPageData) {
    return (
      <div
        id={`${skiAreaPageData.slug}`}
        style={{
          width: "600px",
          height: "450px",
          margin: "10px",
          padding: "10px",
        }}></div>
    );
  }

  return null;
};

export default SkiAreaMap;
