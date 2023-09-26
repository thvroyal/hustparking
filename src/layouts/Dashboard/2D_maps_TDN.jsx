import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getSlotOfFieldViewMin } from '../../apis/slotApi';
import CarBannerImg from '../../assets/img/TDN.png';
import Camera from '../../assets/img/camera.png';
import SlotFiledTDN from '../../components/SlotFiledTDN';

const Maps2D = () => {
  const match = useLocation();
  const fieldId = match.pathname.split('/')[3];
  const listSlots = useSelector((state) => state.slot.data);
  const listNotify = useSelector((state) => state.notify.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getSlotOfFieldViewMin(fieldId));
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  console.log(listSlots);

  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header text-lg text-primary d-flex align-items-center justify-content-between">
            <div>Trần Đại Nghĩa Campus</div>
            <Link to="/dashboard/imageView?tab=TĐN">
              <button type="button" className="btn btn-primary">View camera</button>
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <img
                role="presentation"
                src="http://202.191.56.104:5518/original-tdn-right"
                alt=""
                style={{
                  width: "100%",
                  height: "400px"
                }}
              />
            </div>
            <div
              className="card-body text-left p-2 position-relative"
            >

              <img
                src={CarBannerImg}
                alt=""
                style={{
                  width: '600px',
                  height: '400px',
                }}
              />
              <div>
                <img
                  src={Camera}
                  alt=""
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: "50%",
                    position: "absolute",
                    transform: "translate(141px, -122px)"
                  }}
                />
                <img
                  src={Camera}
                  alt=""
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: "50%",
                    position: "absolute",
                    transform: "translate(122px, -151px)"
                  }
                  }
                />
              </div>
              {listSlots ? (
                listSlots.map((item) => {
                  const changeId = parseInt(item.id, 10) - parseInt(fieldId, 10) * 1000;
                  let stateSlot = false;
                  if (item.statusCam === true || item.carNumber !== null) stateSlot = true;
                  return (
                    <div style={{ position: "absolute" }}>
                      <SlotFiledTDN
                        className={`box_TDN box_TDN_${changeId}`}
                        id={changeId}
                        listSlots={item}
                        stateSlot={stateSlot}
                      />
                    </div>
                  );
                })
              ) : ''}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Maps2D;
