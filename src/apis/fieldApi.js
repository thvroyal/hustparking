import axios from 'axios';
import {failedField, loadingField, successField} from "../store/admin/fieldSlice";

export const getField = () => {
    return (dispatch) => {
        dispatch(loadingField);
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/api/ad/field/find_all`,
        }).then(res => {
            dispatch(successField(res.data.data));
        }).catch(err => {
            console.log(err);
            dispatch(failedField(err));
        })
    }
}

export const postField = (data) => {
    return (dispatch) => {
        dispatch(loadingField);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BASE_URL}/api/ad/field/create_and_update`,
            data: JSON.stringify(data)
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
}

export const deleteField = (id) => {
    return (dispatch) => {
        dispatch(loadingField);
        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_BASE_URL}/api/ad/field/delete/${id}`,
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
}