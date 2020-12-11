import axios from 'axios';
import {failedPackage, loadingPackage, successPackage} from "../store/debug/packageSlice";

export const getPacket = () => {
    return (dispatch) => {
        dispatch(loadingPackage);
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/api/ad/package/find_all`,
        }).then(res => {
            dispatch(successPackage(res.data.data));
        }).catch(err => {
            console.log('err', err);
            dispatch(failedPackage(err));
        });
    }
}