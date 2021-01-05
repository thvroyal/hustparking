import React, {useState} from "react";
import {Pie} from 'react-chartjs-2'
import {Link} from "react-router-dom";
import {Tooltip} from "reactstrap";


function CardField(props) {
    const {name, id, data, GW} = props;
    const dataPie = {
        datasets: [
            {
                data: data || [0, 10, 100],
                backgroundColor: [
                    '#f6c23e',
                    '#e74a3b',
                    '#1cc88a'
                ],
                borderWidth: 0,
            }
        ]
    }

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);


    return (
        <div className={`card border-left-primary shadow h-100 py-2 card-field`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}>
                            {`Field ${id}`}
                        </div>
                        <Link to={`/dashboard/fields/${id}`} className="card-link">
                            <div className={`h5 mb-0 text-gray-800 font-weight-bold text-uppercase`}>{name}</div>
                        </Link>
                        {/* eslint-disable-next-line array-callback-return */}
                        {GW ? GW.map((item, index) =>
                            (
                                <Link to={`/dashboard/gateway/${item.id}`} className="btn-link">
                                    <div className="badge badge-primary font-weight-normal mr-1" id={`tooltip${index}`}
                                         key={index}>{`GW${item.id}`}</div>
                                    <Tooltip placement="bottom" isOpen={tooltipOpen} target={`tooltip${index}`} toggle={toggle}>
                                        {`Click to show all detectors of Gateway ${item.id}`}
                                    </Tooltip>
                                </Link>
                            )) : null}
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