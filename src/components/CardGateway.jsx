import React from "react";
import {Pie} from 'react-chartjs-2'


function CardGateway(props) {
    const {id, totalDetector} = props;

    return (
        <div className={`card border-left-primary shadow h-100 py-2 card-field`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        {/*<div className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}>*/}
                        {/*    {`UPDATED: 20/12/2020 6H:30`}*/}
                        {/*</div>*/}
                        <div className={`h5 mb-0 text-gray-800 font-weight-bold text-uppercase`}>{`Gateway ${id}`}</div>
                        <div className={`text-xs font-weight-bold text-primary mb-1`}>
                            {`Show all detectors   `}
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="feather feather-arrow-right">
                                <line x1="5" y1="12" x2="19" y2="12"/>
                                <polyline points="12 5 19 12 12 19"/>
                            </svg>
                        </div>
                    </div>
                    <div className="col-auto text-gray 800 font-weight-bold text-lg">
                        {totalDetector}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CardGateway);