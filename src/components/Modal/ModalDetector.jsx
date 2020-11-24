import React from "react";
import ReactDOM from 'react-dom';

const ModalDetector = ({isShowing, hide}) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
        <div className="modal" id="exampleModalCenter" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Vertically Centered Modal</h5>
                        <button className="close" type="button" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">×</span></button>
                    </div>
                    <div className="modal-body"><h1>Show Modal Plzzzzzzzzzzzzz</h1></div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" data-dismiss="modal" onClick={hide}>Close
                        </button>
                        <button className="btn btn-primary" type="button">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>, document.getElementById('root')
) : null;

export default ModalDetector;