import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PROFILE_PICTURE = "UPLOAD_PROFILE_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO"

export const getUser = (uid) => {
    return (dispatch) => {
        return axios(`/users/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data })
            })
            .catch((err) => console.log(err))
    };
};

export const uploadProfilePicture = (data, uuid) => {
    return (dispatch) => {
        return axios.put(`/users/${uuid}`, data)
            .then((res) => {
                return axios.get(`/users/${uuid}`)
                    .then((res) => {
                        dispatch({ type: UPLOAD_PROFILE_PICTURE, payload: res.data.profileImgUrl })
                    })
            })
            .catch((err) => console.log(err))
    }
}

export const updateBio = (uuid, bio) => {
    return (dispatch) => {
        console.log(bio)
        return axios.put(`/users/${uuid}`, { bio })
            .then((res) => {
                dispatch({ type: UPDATE_BIO, payload: bio })
            })
            .catch((err) => console.log(err))
    }
}