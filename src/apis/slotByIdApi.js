import axios from 'axios';
import {failSlotById, loadingSlotById, successSlotById} from "../store/admin/slotByIdSlice";

export const getSlotById = (id) =>  {
    return (dispatch) => {
        dispatch(loadingSlotById);
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/api/public/slot/find_by_id/${id}`,
        }).then(res => {
            dispatch(successSlotById(res.data.data));
        }).catch(err => {
            dispatch(failSlotById(err));
        })
    }
}