import axios from "axios";

// comments

export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";


//comments

export const addComment = (postId, userId, body) => {
    return (dispatch) => {
        return axios.post('/comments', { data: { postId, userId, body } })
            .then(() => dispatch({ type: ADD_COMMENT, payload: { postId, userId, body } }))
            .catch(err => console.log(err))
    }
}

export const editComment = (commentId, body) => {
    return (dispatch) => {
        return axios.put(`/comments/${commentId}`, { data: { body } })
            .then(() => dispatch({ type: EDIT_COMMENT, payload: { commentId, body } }))
            .catch(err => console.log(err));
    }
}

export const deleteComment = (commentId) => {
    return (dispatch) => {
        return axios.delete(`/comments/${commentId}`)
            .then(() => dispatch({ type: DELETE_COMMENT, payload: { commentId } }))
            .catch(err => console.log(err))

    }
}