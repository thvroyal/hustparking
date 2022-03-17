import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getInfo } from '../store/notifySlice';

export default function SlotFiled({
  className, id, listSlots,
}) {
  const [check, setCheck] = useState(false);
  const [stateSlot, setStateSlot] = useState(false);
  const [convertId, setConvertId] = useState(id);
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {};

    if (listSlots.statusCam) setStateSlot(true);
    if (id >= 13 && id <= 16) {
      setConvertId(id * 10 - 80);
      setCheck(true);
    }
    if (stateSlot === true && check === false) {
      data = {
        info: `Bạn đã đỗ xe tại ${id} có carNum: ${listSlots.carNumber}`,
        status: 'Y',
      };
      dispatch(getInfo(data));
    }
    if (check === true && stateSlot === true) {
      data = {
        info: `Đang có xe biển số ${listSlots.carNumber} tại ô ${convertId} không được đỗ`,
        status: 'W',
      };
      dispatch(getInfo(data));
    }
    if (check === true && stateSlot === false) {
      data = {
        info: `Bạn không đỗ xe tại ${convertId}`,
        status: 'W-N',
      };
      dispatch(getInfo(data));
    }
    if (stateSlot === false && check === false) {
      data = {
        info: `Không có xe tại ${id}`,
        status: 'N',
      };
      dispatch(getInfo(data));
    }
  }, [dispatch, id, listSlots]);
  return (
    <>
      <div
        className={`${stateSlot && !check ? 'change__background__color' : ''} ${className}`}
      >
        <div className="number__id">{convertId}</div>
        {
          check ? (
            <div className={stateSlot ? 'icon__car__hori fas fa-car' : 'icon__xmark'}>x</div>
          )
            : (
              <i className={`${stateSlot ? '' : 'd-none'} icon__car__ver fas fa-car`} />
            )
        }
      </div>
    </>
  );
}

SlotFiled.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  listSlots: PropTypes.string.isRequired,
  // LIST_SLOT: PropTypes.string.isRequired,
};
