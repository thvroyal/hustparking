import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getSlotOfFieldViewMin } from '../../apis/slotApi';
import CarBannerImg from '../../assets/img/C9_2D_maps.drawio.png';
// import CarBannerImgShow from '../../assets/img/D3.jpg';
import SlotFiledC9 from '../../components/SlotFiledC9';

const Maps2D = () => {
  const match = useLocation();
  const fieldId = match.pathname.split('/')[3];
  const listSlots = useSelector((state) => state.slot.data);
  const listNotifyC9 = useSelector((state) => state.notifyC9.data);
  console.log(listNotifyC9);
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
            </div>
            <div
              className="card-body text-center p-2 rounded shadow-lg"
              style={{
                width: '100%',
                height: '700px',
                overflow: 'scroll',
              }}
            >
              <h2 className="card-header">Parking slot notify</h2>
              <hr />
              <div className="list-group">
                {listNotifyC9 ? (
                  listNotifyC9
                    .slice(listNotifyC9.length - 28, listNotifyC9.length)
                    .map((item) => (
                      <button type="button" className="list-group-item list-group-item-action text-left">
                        {item.status === 'N-C9' ? (<i className="text-info fas fa-info-circle mr-2" />)
                          : item.status === 'Y-C9' && (<i className="text-primary fas fa-check-circle mr-2" />)}
                        {item.info}
                      </button>
                    ))
                ) : ''}
              </div>
            </div>
          </div>
          {listSlots ? (
            listSlots.map((item) => {
              const changeId = parseInt(item.id, 10) - parseInt(fieldId, 10) * 1000;
              return (
                <>
                  <SlotFiledC9
                    className={`box_C9 box_${changeId}`}
                    id={changeId}
                    listSlots={item}
                    fieldId={fieldId}
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
