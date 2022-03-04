import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PROFILE_PICTURE = "UPLOAD_PROFILE_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO"

export const getUser = (uid) => {
    return async (dispatch) => {
        try {
            const res = await axios(`/users/${uid}`);
            dispatch({ type: GET_USER, payload: res.data });
        } catch (err) {
            return console.log(err);
        }
    };
};

export const uploadProfilePicture = (data, uuid) => {
    return async (dispatch) => {
        try {
            await axios.put(`/users/${uuid}`, data);
            const res_1 = await axios.get(`/users/${uuid}`);
            dispatch({ type: UPLOAD_PROFILE_PICTURE, payload: res_1.data.profileImgUrl });
        } catch (err) {
            return console.log(err);
        }
    }
}

export const updateBio = (uuid, bio) => {
    return async (dispatch) => {
        try {
            await axios.put(`/users/${uuid}`, { bio });
            dispatch({ type: UPDATE_BIO, payload: bio });
        } catch (err) {
            return console.log(err);
        }
    }
}