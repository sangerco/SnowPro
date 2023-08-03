import { FetchUserDataRequestAction,
    FetchUserDataSuccessAction,
    FetchUserDataFailureAction,
    SendNewUserDataRequestAction,
    SendNewUserDataSuccessAction,
    SendNewUserDataFailureAction,
    UpdateUserDataRequestAction,
    UpdateUserDataSuccessAction,
    UpdateUserDataFailureAction,
    DeleteUserRequestAction,
    DeleteUserSuccessAction,
    DeleteUserFailureAction,
    SendLoginDataRequestAction,
    SendLoginDataSuccessAction,
    SendLoginDataFailureAction,
    SetTokenAction,
    MakeUserAdminRequestAction, 
    MakeUserAdminSuccessAction, 
    MakeUserAdminFailureAction } from './userTypes';
import { Dispatch } from 'redux';

export type UserAction = FetchUserDataRequestAction
| FetchUserDataSuccessAction
| FetchUserDataFailureAction
| SendNewUserDataRequestAction
| SendNewUserDataSuccessAction
| SendNewUserDataFailureAction
| UpdateUserDataRequestAction
| UpdateUserDataSuccessAction
| UpdateUserDataFailureAction
| DeleteUserRequestAction
| DeleteUserSuccessAction
| DeleteUserFailureAction
| SendLoginDataRequestAction
| SendLoginDataSuccessAction
| SendLoginDataFailureAction
| SetTokenAction
| MakeUserAdminRequestAction
| MakeUserAdminSuccessAction
| MakeUserAdminFailureAction;

export type UserDispatch = Dispatch<UserAction>