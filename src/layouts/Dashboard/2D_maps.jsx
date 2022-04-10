import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { getSlotOfFieldViewMin } from '../../apis/slotApi';
import CarBannerImg from '../../assets/img/2D_thư_viện_D35.drawio.png';
import SlotFiled from '../../components/SlotField';

const Maps2D = React.memo(() => {
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
          <div className="card-header text-lg text-primary">
            D35-Library
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="card-body text-left p-2">
              <img
                src={CarBannerImg}
                alt=""
                style={{
                  width: '650px',
                  position: 'relative',
                }}
              />
            </div>
            <div
              className="card-body text-center p-2 rounded shadow-lg"
              style={{
                width: '100%',
                height: '500px',
                overflow: 'scroll',
              }}
            >
              <h2 className="card-header">Parking slot notify</h2>
              <hr />
              <div className="list-group">
                {listNotify ? (
                  listNotify.slice(listNotify.length - 16, listNotify.length).map((item) => (
                    <button type="button" className="list-group-item list-group-item-action text-left">
                      {item.status === 'W' || item.status === 'W-N' ? (<i className={`${item.status === 'W-N' ? 'text-warning' : 'text-danger'} fas fa-exclamation-triangle mr-2`} />)
                        : item.status === 'N' ? (<i className="text-info fas fa-info-circle mr-2" />)
                          : (<i className="text-primary fas fa-check-circle mr-2" />)}
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
              let checkColorSlot = false;
              let checkIdSlotHori = false;
              let checkIdSlotNoParking = false;
              if (changeId === 11 || changeId === 12) {
                checkIdSlotHori = true;
              }
              if (changeId >= 13 && changeId <= 16) {
                checkIdSlotNoParking = true;
              }
              if (changeId >= 1 && changeId <= 5) {
                checkColorSlot = true;
              }
              return (
                <>
                  <SlotFiled
                    className={checkIdSlotHori ? `box box${changeId}_D35 box__color__D35`
                      : checkIdSlotNoParking ? `box__library box${changeId}_library box__color__library`
                        : checkColorSlot ? `box box_road${changeId} box__color__road2`
                          : `box box_road${changeId} box__color__road1`}
                    id={changeId}
                    listSlots={item}
                  />
                </>
              );
            })
          ) : ''}
        </div>
      </div>
    </>
  );
});

export default Maps2D;
