import {
  FavMountainDataReturn,
  SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST,
  SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS,
  SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE,
  FETCH_FAV_MOUNTAIN_DATA_REQUEST,
  FETCH_FAV_MOUNTAIN_DATA_SUCCESS,
  FETCH_FAV_MOUNTAIN_DATA_FAILURE,
  DELETE_FAV_MOUNTAIN_DATA_REQUEST,
  DELETE_FAV_MOUNTAIN_DATA_SUCCESS,
  DELETE_FAV_MOUNTAIN_DATA_FAILURE,
} from "../types/favMountainsTypes";

interface FavMountainState {
  data: FavMountainDataReturn | null;
  error: string | null;
}

const initialFavMountainState: FavMountainState = {
  data: null,
  error: null,
};

export const favMountainReducer = (
  state = initialFavMountainState,
  action: any
) => {
  switch (action.type) {
    case SEND_NEW_FAV_MOUNTAIN_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case SEND_NEW_FAV_MOUNTAIN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case SEND_NEW_FAV_MOUNTAIN_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_FAV_MOUNTAIN_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case FETCH_FAV_MOUNTAIN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case FETCH_FAV_MOUNTAIN_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_FAV_MOUNTAIN_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };
    case DELETE_FAV_MOUNTAIN_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_FAV_MOUNTAIN_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
