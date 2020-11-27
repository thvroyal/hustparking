import React from "react";
import {Pie} from 'react-chartjs-2'


function CardField(props) {
    const {name, id, data} = props;
    const dataPie = {
        datasets: [
            {
                data: data || [10, 100],
                backgroundColor: [
                    '#2E59D9',
                    '#fff'
                ],
                borderWidth: 0,
            }
        ]
    }
    return (
        <div className={`card border-left-primary shadow h-100 py-2 card-field`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className={`text-xs font-weight-bold text-gray-800 text-uppercase mb-1`}>
                            {id}
                        </div>
                        <div className={`h5 mb-0 text-primary font-weight-bold text-uppercase`}>{name}</div>
                    </div>
                    <div className="col-auto">
                        <Pie data={dataPie} options={{tooltips: {enabled: false}}} width={58} height={58}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(CardField);