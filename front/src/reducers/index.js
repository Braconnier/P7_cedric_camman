import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import allPostsReducer from "./allPostsReducer";
import trendingReducer from "./trendingReducer";


export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    allPostsReducer,
    trendingReducer

});