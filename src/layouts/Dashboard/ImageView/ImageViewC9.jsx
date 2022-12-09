import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getSlotOfFieldViewMin } from '../../../apis/slotApi';
import CarBannerImg from '../../../assets/img/C9_2D.jpg';
import Camera from '../../../assets/img/camera.png';
import SlotFiledC9 from '../../../components/SlotFiledC9';

function ImageViewC9() {
  const listSlots = useSelector((state) => state.slot.data);
  const fieldId = 70;
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getSlotOfFieldViewMin(fieldId));
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-header text-lg text-primary d-flex align-items-center justify-content-between">
            <div>C9 Campus</div>
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
                  transform: 'translate(0px, 10px)',
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
                height: '400px',
                overflow: 'scroll',
              }}
            >
              <h2 className="card-header">
                <h4 className="text-center mt-2">{moment().format()}</h4>
              </h2>
              <img
                role="presentation"
                src="https://771f-27-72-98-49.ap.ngrok.io/process"
                alt=""
                style={{
                  width: '100%',
                }}
              />
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
}

export default ImageViewC9;
