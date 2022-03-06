import axios from "axios";


//posts
export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";


export const getPosts = (number) => {
    return async (dispatch) => {
        try {
            const res = await axios('/posts');
            res.data.map(post => {
                const comments = post.Comments
                comments.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                const array = res.data.slice(0, number);
                dispatch({ type: GET_POSTS, payload: array });
            });
        } catch (err) {
            return console.log(err);
        }
    }
}

export const addPost = (data) => {
    return () => {
        return axios.post('/posts', data)
    }
}


export const updatePost = (postId, body) => {
    return async (dispatch) => {
        try {
            await axios.put(`/posts/${postId}`, { data: { body } });
            return dispatch({ type: UPDATE_POST, payload: { body, postId } });
        } catch (err) {
            return console.log(err);
        }
    }
}

export const deletePost = (postId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/posts/${postId}`);
            return dispatch({ type: DELETE_POST, payload: { postId } });
        } catch (err) {
            return console.log(err);
        }
    }
}

export const likePost = (post) => {
    return () => {
        return axios.post(`/post/vote/${post.id}`)
    }
}

//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";



export const addComment = (postId, userId, body) => {
    return async (dispatch) => {
        try {
            await axios.post('/comments', { data: { postId, userId, body } });
            return dispatch({ type: ADD_COMMENT, payload: { postId, userId, body } });
        } catch (err) {
            return console.log(err);
        }
    }
}

export const editComment = (commentId, body, postId) => {
    return async (dispatch) => {
        try {
            await axios.put(`/comments/${commentId}`, { data: { body } });
            return dispatch({ type: EDIT_COMMENT, payload: { commentId, body, postId } });
        } catch (err) {
            return console.log(err);
        }
    }
}

export const deleteComment = (commentId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/comments/${commentId}`);
            return dispatch({ type: DELETE_COMMENT, payload: { commentId } });
        } catch (err) {
            return console.log(err);
        }

    }
}
