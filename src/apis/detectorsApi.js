import axios from 'axios';
import {failDetector, isDeleteDetector, loadingDetector, successDetector} from "../store/detectorSlice";

export const getDetectors = () => {
    return (dispatch) => {
        dispatch(loadingDetector);
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/detectors`,
        }).then(res => {
            console.log(res);
            dispatch(successDetector(res.data));
        }).catch(err => {
            console.log('err', err);
            dispatch(failDetector(err));
        });
    }
}

export const putDetectors = (data) => {
    return (dispatch) => {
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/detectors/${data.id}`,
            data: JSON.stringify(data),
        }).then(res => {
            getDetectors();
        }).catch(err => {
            console.log('err', err);
        })
    }
}

export const deleteDetectors = (id) => {
    return (dispatch) => {
        dispatch(isDeleteDetector(id));
        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/detectors/${id}`,
        }).then(res => {
            // getDetectors();
            dispatch(isDeleteDetector(false));
        }).catch(err => {
            console.log('err', err);
            dispatch(isDeleteDetector(false));
        })
    }
}