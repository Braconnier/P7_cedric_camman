import axios from "axios";


//posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";


export const getPosts = (number) => {
    return (dispatch) => {
        return axios('/posts')
            .then((res) => {
                const array = res.data.slice(0, number);
                dispatch({ type: GET_POSTS, payload: array });
                dispatch({ type: GET_ALL_POSTS, payload: res.data });

            })
            .catch(err => console.log(err))
    }
}

export const addPost = (data) => {
    return () => {
        return axios.post('/posts', data)
    }
}


export const updatePost = (postId, body) => {
    return (dispatch) => {
        return axios.put(`/posts/${postId}`, { data: { body } })
            .then(() => dispatch({ type: UPDATE_POST, payload: { body, postId } }))
            .catch(err => console.log(err));
    }
}

export const deletePost = (postId) => {
    console.log(postId)
    return (dispatch) => {
        return axios.delete(`/posts/${postId}`)
            .then(() => dispatch({ type: DELETE_POST, payload: { postId } }))
            .catch(err => console.log(err))
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
    return (dispatch) => {
        return axios.post('/comments', { data: { postId, userId, body } })
            .then(() => dispatch({ type: ADD_COMMENT, payload: { postId, userId, body } }))
            .catch(err => console.log(err))
    }
}

export const editComment = (commentId, body, postId) => {
    return (dispatch) => {
        return axios.put(`/comments/${commentId}`, { data: { body } })
            .then(() => dispatch({ type: EDIT_COMMENT, payload: { commentId, body, postId } }))
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

//Trending

export const GET_TRENDS = "GET_TRENDS";

export const getTrends = (sortedArray) => {
    return (dispatch) => {
        dispatch({ type: GET_TRENDS, payload: sortedArray })
    }
}
