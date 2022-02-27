import axios from "axios";


//posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POSTS = "ADD_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";




export const getPosts = (number) => {
    return (dispatch) => {
        return axios('/posts')
            .then((res) => {
                const array = res.data.slice(0, number)
                dispatch({ type: GET_POSTS, payload: array })
            })
            .catch(err => console.log(err))
    }
}

export const addPost = (data) => {
    return (dispatch) => {
        return axios.post('/posts', data)
            .then((res) => {
            })
            .catch(err => console.log(err))
    }
}

export const likePost = (postId, userUuid) => {
    console.log(postId, userUuid)
    return (dispatch) => {
        return axios.post(`/vote/${postId}`)
            .then(() => dispatch({ type: LIKE_POST, payload: { postId, userUuid } }))
            .catch(err => console.log(err))
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
