import { GET_USER, UPDATE_BIO, UPLOAD_PROFILE_PICTURE } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
    switch (action.type) {

        case GET_USER:
            return action.payload

        case UPLOAD_PROFILE_PICTURE:
            return {
                ...state, profileImgUrl: action.payload
            }

        case UPDATE_BIO:
            return {
                ...state, bio: action.payload
            }

        default:
            return state;
    };
};