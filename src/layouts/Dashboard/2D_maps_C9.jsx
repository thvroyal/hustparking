import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getSlotOfFieldViewMin } from '../../apis/slotApi';
import CarBannerImg from '../../assets/img/C9_2D.jpg';
import Camera from '../../assets/img/camera.png';
import SlotFiledC9 from '../../components/SlotFiledC9';

const Maps2D = () => {
  const match = useLocation();
  const fieldId = match.pathname.split('/')[3];
  const listSlots = useSelector((state) => state.slot.data);
  const listNotify = useSelector((state) => state.notify.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getSlotOfFieldViewMin(fieldId));
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header text-lg text-primary d-flex align-items-center justify-content-between">
            <div>C9 Campus</div>
            <Link to="/dashboard/imageView?tab=C9">
              <button type="button" className="btn btn-primary">View camera</button>
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div
              className="card-body text-left p-2 position-relative"
            >
              <img
                src={CarBannerImg}
                alt=""
                style={{
                  width: '700px',
                  height: '700px',
                }}
              />
              <img
                className="position-absolute camera-css"
                src={Camera}
                alt=""
              />
            </div>
            <div
              className="card-body text-center p-2 rounded shadow-lg"
              style={{
                width: '100%',
                height: '700px',
                overflow: 'scroll',
              }}
            >
              <h2 className="card-header">
                <h4 className="text-center mt-2">{moment().format()}</h4>
              </h2>
              <hr />
              <h4 className="text-left text-primary">INFO OF PARKING</h4>
              <div className="list-group">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Thứ tự</th>
                      <th scope="col">Biển số</th>
                      <th scope="col">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listNotify ? (
                      listNotify
                        .map((item) => (
                          <tr>
                            <th scope="row">{parseInt(item.id, 10) - parseInt(fieldId, 10) * 1000}</th>
                            <td>{item.carNumber === 'Null' ? 'X' : item.carNumber}</td>
                            <td>
                              {item.carNumber === 'Null' && item.statusCam === true
                                ? 'Có xe nhưng không nhận được biển' : item.statusCam === false
                                  ? 'Không có xe' : item.statusCam === true && item.carNumber !== 'Null'
                                    ? 'Có xe' : ''}
                            </td>
                          </tr>
                        ))
                    ) : ''}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {listSlots ? (
            listSlots.map((item) => {
              const changeId = parseInt(item.id, 10) - parseInt(fieldId, 10) * 1000;
              let stateSlot = false;
              if (item.statusCam === true || item.carNumber !== 'null') stateSlot = true;
              return (
                <>
                  <SlotFiledC9
                    className={`box_C9 box_${changeId}`}
                    id={changeId}
                    listSlots={item}
                    stateSlot={stateSlot}
                  />
                </>
              );
            })
          ) : ''}
        </div>
      </div>
    </>
  );
};

export default Maps2D;
