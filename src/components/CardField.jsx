import React from "react";

function CardField(props) {
    const {name, color} = props;
    return (
        <div className={`card border-left-${color} shadow h-100 py-2 card-field`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        {/*<div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>*/}
                        {/*    {name}*/}
                        {/*</div>*/}
                        <div className={`h5 mb-0 text-${color} font-weight-bold text-uppercase`}>{name}</div>
                    </div>
                    <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CardField);