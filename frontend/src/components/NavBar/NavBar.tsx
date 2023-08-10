import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';
import { RootState } from '../../redux/store';
import { useAuth } from '../AuthProvider';

interface NavBarProps {
    logoutUser: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ logoutUser }) => {
    const dispatch = useDispatch();
    const { username } = useAuth();

    const isAuthenticated = useSelector((state: RootState) => state.login.token)

    const handleLogout = () => {
        dispatch(logoutUser() as any);
    };

    const userMenuOptions = [
        { key: 'profile', text: 'Profile Page', icon: 'user', as: Link, to: `/users/${username}` },
        { key: 'inbox', text: 'Messages', icon: 'envelope', as: Link, to: `/users/${username}/inbox`},
        { key: 'userlist', text: 'Users', icon: 'users', as: Link, to: `/users` },
        { key: 'logout', text: 'Logout', icon: 'sign-out', onClick: handleLogout},
    ];

    return (
        <Menu inverted color='black' size='large'>
            <Menu.Item header as={Link} to='/'>
                App Logo TBD
            </Menu.Item>

            <Menu.Item as={Link} to='/ski-areas'>
                All Ski Areas
            </Menu.Item>

            {isAuthenticated ? (
                <Menu.Menu position='right'>
                    <Dropdown item text='User Menu' options={userMenuOptions} />
                </Menu.Menu>
            ) : (
                <Menu.Menu position='right'>
                    <Menu.Item as={Link} to='/login'>
                        Login
                    </Menu.Item>
                    <Menu.Item as={Link} to='/register'>
                        Register
                    </Menu.Item>
                </Menu.Menu>
            )}
        </Menu>
    )
};

const mapStatetoProps = (state: RootState) => ({
    user: state.logout.user
});

const mapDispatchToProps = {
    logoutUser
};

export default connect(mapStatetoProps, mapDispatchToProps)(NavBar);