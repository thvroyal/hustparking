import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import {useForm} from "react-hook-form";

const ModalEdit = ({isShowing, hide, item}) => {
    console.log('Edit Modal Open');
    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open')
        }
    })
    const {register, handleSubmit} = useForm();
    const onSubmit = data => console.log(data);
    return isShowing ? ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal fade show" id="staticBackdrop" data-backdrop="static" tabIndex="-1"
                 aria-labelledby="staticBackdropLabel"
                 style={{display: 'block', paddingRight: '17px', background: 'rgba(0,0,0,.65)'}}
                 aria-modal="true"
                 role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-primary"
                                id="staticBackdropLabel">{`Edit Detector ${item.id}`}</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close"
                                    onClick={hide}><span
                                aria-hidden="true">×</span></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-body">
                                {/*Detector Input*/}
                                <div className="form-group">
                                    <label htmlFor="detectorID">Detector ID</label>
                                    <input name="detectorID" className="form-control" ref={register}
                                           placeholder="New ID"
                                           defaultValue={item.id}/>
                                </div>
                                {/*End Detector Input*/}

                                {/*Address Input*/}
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input name="address" className="form-control" ref={register}
                                           placeholder="Address"
                                           defaultValue={item.address}/>
                                </div>
                                {/*End Address Input*/}

                                {/*Status Input Radio*/}
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio"
                                               name="status" ref={register} value="0" id="freeStatus"
                                               defaultChecked={item.status}/>
                                        <label className="custom-control-label" htmlFor="freeStatus">Free</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio"
                                               name="status" ref={register} value="1" id="busyStatus"
                                               defaultChecked={!item.status}/>
                                        <label className="custom-control-label" htmlFor="busyStatus">Busy</label>
                                    </div>
                                </div>
                                {/*End Status Input Radio*/}

                                {/*Battery Input*/}
                                <div className="form-group">
                                    <label htmlFor="battery">Battery Level</label>
                                    <input name="batteryLevel" className="form-control" ref={register}
                                           placeholder="Battery"
                                           defaultValue={item.baterryLevel}/>
                                </div>
                                {/*End Battery Input*/}

                                {/*Mode Input*/}
                                <div className="form-group">
                                    <label htmlFor="battery">Mode</label>
                                    <input name="mode" className="form-control" ref={register}
                                           placeholder="Mode"
                                           defaultValue={item.mode}/>
                                </div>
                                {/*End Mode Input*/}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>, document.body
    ) : null;
}

export default ModalEdit;