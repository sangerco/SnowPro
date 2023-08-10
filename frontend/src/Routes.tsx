import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Photo from './components/Media/Photo';
import ShowPhotos from './components/Media/ShowPhotos';
import ShowVideos from './components/Media/ShowVideos';
import SubmitPhotoForm from './components/Media/SubmitPhotoForm';
import SubmitVideoForm from './components/Media/SubmitVideoForm';
import Video from './components/Media/Video';
import Inbox from './components/Messages/Inbox';
import MessageReplyView from './components/Messages/messageReplyView';
import MessageView from './components/Messages/MessageView';
import NewMessageForm from './components/Messages/NewMessageForm';
import NewMessageReplyForm from './components/Messages/NewMessageReplyForm';
import LoginForm from './components/NavBar/LoginForm';
import NavBar from './components/NavBar/NavBar';
import Review from './components/Reviews/Review';
import ReviewForm from './components/Reviews/ReviewForm';
import ReviewReply from './components/Reviews/ReviewReply';
import ReviewReplyForm from './components/Reviews/ReviewReplyForm';
import UpdateReview from './components/Reviews/UpdateReview';
import FavMountain from './components/SkiAreas/FavMountain';
import SkiArea from './components/SkiAreas/SkiArea';
import SkiAreaData from './components/SkiAreas/SkiAreaData';
import SkiAreaPage from './components/SkiAreas/SkiAreaPage';
import NewTagForm from './components/Tags/NewTagForm';
import CreateNewUser from './components/Users/CreateNewUser';
import MakeUserAdminForm from './components/Users/MakeUserAdminForm';
import UpdateUser from './components/Users/UpdateUser';
import User from './components/Users/User';
import UserList from './components/Users/UserList';
import UserUpdateForm from './components/Users/UserUpdateForm';
import Home from './components/Home/Home'


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Home user={null} fetchUserData={function (username: string): void {
                throw new Error('Function not implemented.');
            } } />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/register' element={<CreateNewUser />} />
            <Route path='/ski-areas' element={<SkiAreaData />} />
            <Route path='/ski-areas/:slug' element={<SkiAreaPage />} />
            <Route path='/users/' element={<UserList />} />
            <Route path='/users/:username' element={<User />} />
            <Route path='/users/:username/update' element={<UserUpdateForm />} />
            <Route path='/ski-areas/:slug/review' element={<ReviewForm error={''} />} />
            <Route path='/ski-areas/:slug/reviews/:id' element={<Review />} />
            <Route path='/ski-areas/:slug/reviews/:id/update' element={<UpdateReview error={''} />} />
            <Route path='/ski-areas/:slug/reviews/:id/reply' element={<ReviewReplyForm />} />
            <Route path='/ski-areas/:slug/reviews/:review-id/reply/:id' element={<ReviewReply reviewReply={null} />} />
            <Route path='/users/:username/inbox' element={<Inbox />} />
            <Route path='/users/:username/message/create-message' element={<NewMessageForm />} />
            <Route path='/messages/:id' element={<MessageView />} />
            <Route path='/messages/:id/reply' element={<NewMessageReplyForm newReply={null} />} />
        </Routes>
    )
};

export default AppRoutes;