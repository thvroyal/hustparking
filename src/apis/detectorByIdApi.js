import axios from 'axios';
import {failDetectorById, loadingDetectorById, successDetectorById} from "../store/admin/detectorByIdSlice";

export const getDetectorById = (id) =>  {
    return (dispatch) => {
        dispatch(loadingDetectorById);
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/api/ad/detector/find_by_id/${id}`,
        }).then(res => {
            dispatch(successDetectorById(res.data.data));
        }).catch(err => {
            dispatch(failDetectorById(err));
        })
    }
}