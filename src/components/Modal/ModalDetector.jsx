import React from 'react';
import {useDispatch} from "react-redux";
import {hideModalDetector} from "../../store/ModalSlice";

const ModalDetector = React.memo((props) => {
    // const {titleModal} = props;
    const dispatch = useDispatch();
    console.log('Hello');

    function handleHideModal() {
        dispatch(hideModalDetector);
    }

    function handleSubmit(data) {
        dispatch(hideModalDetector);
    }

    return (
        <div className="modal" id="exampleModalCenter" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Vertically Centered Modal</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                    </div>
                    <div className="modal-body">...</div>
                    <div className="modal-footer">
                        <button className="btn btn-light" type="button" data-dismiss="modal"
                                onClick={handleHideModal}>Close
                        </button>
                        <button className="btn btn-primary" type="button" onClick={() => handleSubmit()}>Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default ModalDetector;