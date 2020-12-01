import axios from 'axios';
import {failedGatewayField, loadingGatewayField, successGatewayField} from "../store/admin/gatewayfieldSlice";

export const getGWField = () => {
    return (dispatch) => {
        dispatch(loadingGatewayField);
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/api/ad/fieldGateway/find_all`,
        }).then(res => {
            dispatch(successGatewayField(res.data.data));
        }).catch(err => {
            dispatch(failedGatewayField(err));
        })
    }
}