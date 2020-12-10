import React from "react";
import ImgAva from '../../assets/img/profile-1.png'
import {withRouter} from "react-router";

function Users(props) {
    return (
        <>
            <h1 className="h3 mb-2 text-gray-800">List Users</h1>
            {/*<p className="mb-4">Update after 10 seconds.</p>*/}

            <div className="table-responsive mt-4">
                <table className="list-user" id="dataTable" width="100%" cellSpacing="0">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Data 1</th>
                        <th>Data 2</th>
                        <th>Data 3</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="avatar"><img className="avatar-img" src={ImgAva} alt=""/> Nguyen Van A</td>
                        <td>user1@gmail.com</td>
                        <td>999</td>
                        <td>1000</td>
                        <td>1920</td>
                        <td>
                            <div className="badge badge-success badge-pill">Online</div>
                        </td>
                        <td><i className="fa fa-ellipsis-v"/></td>
                    </tr>
                    <tr>
                        <td className="avatar"><img className="avatar-img" src={ImgAva} alt=""/> Nguyen Van A</td>
                        <td>user1@gmail.com</td>
                        <td>999</td>
                        <td>1000</td>
                        <td>1920</td>
                        <td>
                            <div className="badge badge-success badge-pill">Online</div>
                        </td>
                        <td><i className="fa fa-ellipsis-v"/></td>
                    </tr>
                    <tr>
                        <td className="avatar"><img className="avatar-img" src={ImgAva} alt=""/> Nguyen Van A</td>
                        <td>user1@gmail.com</td>
                        <td>999</td>
                        <td>1000</td>
                        <td>1920</td>
                        <td>
                            <div className="badge badge-danger badge-pill">Offline</div>
                        </td>
                        <td><i className="fa fa-ellipsis-v"/></td>
                    </tr>
                    <tr>
                        <td className="avatar"><img className="avatar-img" src={ImgAva} alt=""/> Nguyen Van A</td>
                        <td>user1@gmail.com</td>
                        <td>999</td>
                        <td>1000</td>
                        <td>1920</td>
                        <td>
                            <div className="badge badge-danger badge-pill">Offline</div>
                        </td>
                        <td><i className="fa fa-ellipsis-v"/></td>
                    </tr>
                    <tr>
                        <td className="avatar"><img className="avatar-img" src={ImgAva} alt=""/> Nguyen Van A</td>
                        <td>user1@gmail.com</td>
                        <td>999</td>
                        <td>1000</td>
                        <td>1920</td>
                        <td>
                            <div className="badge badge-danger badge-pill">Offline</div>
                        </td>
                        <td><i className="fa fa-ellipsis-v"/></td>
                    </tr>
                    <tr>
                        <td className="avatar"><img className="avatar-img" src={ImgAva} alt=""/> Nguyen Van A</td>
                        <td>user1@gmail.com</td>
                        <td>999</td>
                        <td>1000</td>
                        <td>1920</td>
                        <td>
                            <div className="badge badge-danger badge-pill">Offline</div>
                        </td>
                        <td><i className="fa fa-ellipsis-v"/></td>
                    </tr>
                    <tr>
                        <td className="avatar"><img className="avatar-img" src={ImgAva} alt=""/> Nguyen Van A</td>
                        <td>user1@gmail.com</td>
                        <td>999</td>
                        <td>1000</td>
                        <td>1920</td>
                        <td>
                            <div className="badge badge-danger badge-pill">Offline</div>
                        </td>
                        <td><i className="fa fa-ellipsis-v"/></td>
                    </tr>
                    <tr>
                        <td className="avatar"><img className="avatar-img" src={ImgAva} alt=""/> Nguyen Van A</td>
                        <td>user1@gmail.com</td>
                        <td>999</td>
                        <td>1000</td>
                        <td>1920</td>
                        <td>
                            <div className="badge badge-danger badge-pill">Offline</div>
                        </td>
                        <td><i className="fa fa-ellipsis-v"/></td>
                    </tr>
                    <tr>
                        <td className="avatar"><img className="avatar-img" src={ImgAva} alt=""/> Nguyen Van A</td>
                        <td>user1@gmail.com</td>
                        <td>999</td>
                        <td>1000</td>
                        <td>1920</td>
                        <td>
                            <div className="badge badge-danger badge-pill">Offline</div>
                        </td>
                        <td><i className="fa fa-ellipsis-v"/></td>
                    </tr>
                    <tr>
                        <td className="avatar"><img className="avatar-img" src={ImgAva} alt=""/> Nguyen Van A</td>
                        <td>user1@gmail.com</td>
                        <td>999</td>
                        <td>1000</td>
                        <td>1920</td>
                        <td>
                            <div className="badge badge-danger badge-pill">Offline</div>
                        </td>
                        <td><i className="fa fa-ellipsis-v"/></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default React.memo(withRouter(Users));