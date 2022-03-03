import { DELETE_POST, GET_POSTS, UPDATE_POST, DELETE_COMMENT, EDIT_COMMENT } from "../actions/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
    switch (action.type) {

        case GET_POSTS:
            return action.payload;

        case UPDATE_POST:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post, body: action.payload.body
                    }
                } else {
                    return post
                }
            });



        case DELETE_POST:
            return state.filter((post) => post.id !== action.payload.postId)

        case EDIT_COMMENT:
            return state.map((post) => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        Comments: post.Comments.map((comment) => {
                            if (comment.id === action.payload.commentId) {
                                return {
                                    ...comment,
                                    body: action.payload.body
                                }
                            } else {
                                return comment
                            }
                        })
                    }
                } else {
                    return post
                }
            })

        case DELETE_COMMENT:
            return state.filter((comment) => comment.id !== action.payload.commentId)

        default:
            return state;
    }
}
