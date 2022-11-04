import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getSlotOfFieldViewMin } from '../../apis/slotApi';
import CarBannerImg from '../../assets/img/2D_thư_viện_D35.drawio_not.png';
// import CarBannerImgShow from '../../assets/img/D3.jpg';
import SlotFiled from '../../components/SlotField';

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
            <div>D35-Library</div>
            <Link to="/dashboard/imageView?tab=D35">
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
                  width: '550px',
                  height: '900px',
                }}
              />
            </div>
            <div
              className="card-body text-center p-2 rounded shadow-lg"
              style={{
                width: '100%',
                height: '900px',
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
              <hr />
              {/* <h4 className="text-left text-warning">WARNING OF PARKING</h4>
              <div className="list-group">
                {listNotify ? (
                  listNotify
                    .slice(listNotify.length - 4, listNotify.length)
                    .map((item) => (
                      <button
                      type="button"
                      className="list-group-item list-group-item-action text-left">
                        {item.status === 'W' || item.status === 'W-N' ?
                        (<i className={`${item.status === 'W-N'
                        ? 'text-warning' : 'text-danger'} fas fa-exclamation-triangle mr-2`} />)
                          : item.status === 'N'
                          ? (<i className="text-info fas fa-info-circle mr-2" />)
                            : (<i className="text-primary fas fa-check-circle mr-2" />)}
                        {item.info}
                      </button>
                    ))
                ) : ''}
              </div> */}
            </div>
          </div>
          {listSlots ? (
            listSlots.map((item) => {
              const changeId = parseInt(item.id, 10) - parseInt(fieldId, 10) * 1000;
              let checkColorSlot = false;
              let checkIdSlotHori = false;
              let checkIdSlotNoParking = false;
              let stateSlot = false;
              let check = false;
              if (item.statusCam === true || item.carNumber !== 'Null') stateSlot = true;
              if (changeId === 11 || changeId === 12) {
                checkIdSlotHori = true;
              }
              if (changeId >= 13 && changeId <= 16) {
                checkIdSlotNoParking = true;
                check = true;
              }
              if (changeId >= 1 && changeId <= 5) {
                checkColorSlot = true;
              }
              return (
                <>
                  <SlotFiled
                    className={checkIdSlotHori ? `box box${changeId}_D35 box__color__D35`
                      : checkIdSlotNoParking ? `box__library box${changeId}_library box__color__library`
                        : checkColorSlot ? `box box_road${changeId} box__color__D35`
                          : `box box_road${changeId} box__color__D35`}
                    id={changeId}
                    listSlots={item}
                    stateSlot={stateSlot}
                    check={check}
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
