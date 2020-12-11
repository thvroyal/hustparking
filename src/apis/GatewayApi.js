import axios from 'axios';
import {failedGateway, loadingGateway, successGateway} from "../store/admin/gatewaySlice";

export const getGateway = () => {
    return (dispatch) => {
        dispatch(loadingGateway);
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_BASE_URL}/api/ad/gateway/find_all`,
        }).then(res => {
            dispatch(successGateway(res.data.data));
        }).catch(err => {
            dispatch(failedGateway(err));
        })
    }
}