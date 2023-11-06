# SnowPro Capstone Project

This application is a tool for users to both find and share information about ski resorts around the world. It also allow users to communicate with others, share pictures and videos, and provide their own insights and reviews of ski resorts and ski areas. It incorporates data from skiapi.com, google maps, and its own API. 

## Functionalities

Using data from skiapi.com, google maps, and the application's reviews data, anonymous users can use this app to search ski areas, find data on individual ski areas, see the ski area's location on a map, click through on the map to use the google maps directions functionality, and read reviews of ski areas by SnowPro users.

Users can create an account, which gives them the ability to create a user account, post photos and videos, create reviews, and message other users. The above functionalities that are available to anonymous users are also to registered users. Registered users also have the ability to reply to ski area reviews. User accounts, photos, videos, reviews, and review replies are also editable and deleteable by the user that created them.

Admin users are given the added functionality to create/edit/delete all information on the app, except that information provided by external APIs. Admins can also give admin privileges to other users.

## Application Structure

This application consists of a SQL database queried by Postgresql, a NodeJs backend written in Typescript, and a React frontend written in Typescript. The frontend state is handled by Redux.

**Database** 

Our database consists of multiple tables, some with direct, others with one-to-many, and some with many-to-many relationships. Using Postgresql, the schema for this database can be created by running the schema sql file found in this repository. 

**Backend**

Our NodeJs backend creates a server that can be accessed at http://localhost:5000. It features json schemas to handle verification of incoming post requests, helper functions to create json web tokens for authentication purposes, and routes and models to create a RESTful API. The API handles requests for ski areas, users, reviews, review replies, messages, message replies, photos, and videos. 

**Frontend**

The front end is created using create-react-app. Styling is mostly handled by Semantic UI React components. Almost 100% of the state for the application is handled by redux, with small portions handled by React hooks. Front end routing is handled by React Router. Google Maps data is handled by making API calls upon loading a ski area's individual page. These calls to the google maps API are handled by the useEffect hook within the component created for individual google maps.

## To Run This Application

Upon cloning this application, running the schema.sql file in the terminal will create the postgresql database snowpro.

Navigating to the /backend directory, npm start will start the NodeJS database at http://localhost:5000.

npm start in the main directory will start the react app at http://localhost.3000.

## Testing

Testing this application was done through jest and supertest. Tests were written in typescript as well. 



