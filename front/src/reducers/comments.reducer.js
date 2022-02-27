import { DELETE_COMMENT, EDIT_COMMENT } from '../actions/comments.actions'

const initialState = {};

export default function commentsReducer(state = initialState, action) {
    switch (action.type) {


        case EDIT_COMMENT:
            return state.map((comment) => {
                if (comment.id === action.payload.commentId) {
                    return {
                        ...comment,
                        body: action.payload.body
                    }
                } else {
                    return comment
                }
            });

        case DELETE_COMMENT:
            return state.filter((comment) => comment.id !== action.payload.commentId)


        default:
            return state;
    }


}