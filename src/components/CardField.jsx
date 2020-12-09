import React from "react";
import {Pie} from 'react-chartjs-2'


function CardField(props) {
    const {name, id, data, GW} = props;
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
                        <div className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}>
                            {`Field ${id}`}
                        </div>
                        <div className={`h5 mb-0 text-gray-800 font-weight-bold text-uppercase`}>{name}</div>
                        {/* eslint-disable-next-line array-callback-return */}
                        {GW ? GW.map((item, index) => {
                            if (item.fieldId === id) return (
                            <div className="badge badge-primary font-weight-normal mr-1" key={index}>{`GW${item.gatewayId}`}</div>
                        )}):null}

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