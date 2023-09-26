import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../../../apis/auth';

function TabProfile() {
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);
  function formatString(str) {
    if (str) return str.split('+')[0].split('T')[0];
    return 'N/A';
  }
  return (
    <div className="row">
      <div className="col-md-5">
        {/*  Avatar card */}
        <div className="flex-center flex-column">
          <div className="position-relative">
            <img className="rounded-circle mb-4" src={info.image ? info.image : `https://i.pravatar.cc/350?u=${info.id}`} alt="Avatar" width="200" />
          </div>
          <h3 className="text-dark">User Name</h3>
          <p>🚗 🚕 🚙</p>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <div className="card-header">
            Detail Information
          </div>
          <div className="card-body">
            <div id="info" className="mb-4">
              <p className="small text-uppercase mb-0 text-primary ">id</p>
              <h5 className="text-dark">{info.id}</h5>
            </div>
            <div id="info" className="mb-4">
              <p className="small text-uppercase mb-0 text-primary ">phone</p>
              <h5 className="text-dark">{info.phone}</h5>
            </div>
            <div id="info" className="mb-4">
              <p className="small text-uppercase mb-0 text-primary ">email</p>
              <h5 className="text-dark">{info.email}</h5>
            </div>
            <div id="info" className="mb-4">
              <p className="small text-uppercase mb-0 text-primary ">date of birth</p>
              <h5 className="text-dark">{formatString(info.birth)}</h5>
            </div>
            <div id="info" className="mb-4">
              <p className="small text-uppercase mb-0 text-primary ">gender</p>
              <h5 className="text-dark">{info.sex === 'M' ? 'Male' : info.sex === 'F' ? 'Female' : 'Other'}</h5>
            </div>
            <div id="info" className="mb-4">
              <p className="small text-uppercase mb-0 text-primary ">address</p>
              <h5 className="text-dark">{info.address}</h5>
            </div>
            <div id="info" className="mb-4">
              <p className="small text-uppercase mb-0 text-primary">id number</p>
              <h5 className="text-dark">{info.idNumber}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TabProfile);
