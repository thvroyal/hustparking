import React from "react";
import {withRouter} from "react-router";
import CarBannerImg from "../../assets/img/car_banner.svg"

function DashboardHome(props) {
    return (
        <>
            <div className="container-fluid">
                <div className="card mb-3">
                    <div className="card-body text-center p-5">
                        <img src={CarBannerImg} alt="" style={{
                            width: "50%",
                        }}/>
                        <h5 className="font-weight-bold text-primary">Dashboard Page Admin</h5>
                        <p>You can create, edit, delete anything here.</p>
                        <button className="btn btn-primary btn-lg" type="button">Get Start</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(withRouter(DashboardHome));