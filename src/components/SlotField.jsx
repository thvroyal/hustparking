import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getInfo } from '../store/notifySlice';

export default function SlotFiled({
  className, id, listSlots, fieldId,
}) {
  const [check, setCheck] = useState(false);
  const [stateSlot, setStateSlot] = useState(false);
  const [convertId, setConvertId] = useState(id);
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {};

    if (listSlots.statusCam === true || listSlots.carNumber !== null) setStateSlot(true);
    if (id >= 13 && id <= 16) {
      setConvertId(id * 10 - 80);
      setCheck(true);
    }
    if (stateSlot === true && check === false) {
      data = {
        info: `Slot ${id} - Car number ${listSlots.carNumber}`,
        status: 'Y',
        id: parseInt(fieldId, 10),
      };
      dispatch(getInfo(data));
    }
    if (check === true && stateSlot === true) {
      data = {
        info: `Car number ${listSlots.carNumber} does not parking`,
        status: 'W',
        id: parseInt(fieldId, 10),
      };
      dispatch(getInfo(data));
    }

    if (check === true && stateSlot === false) {
      data = {
        info: `Do not parking at slot ${convertId}`,
        status: 'W-N',
        id: parseInt(fieldId, 10),
      };
      dispatch(getInfo(data));
    }
    if (stateSlot === false && check === false) {
      data = {
        info: `Slot ${id} has not car`,
        status: 'N',
        id: parseInt(fieldId, 10),
      };
      dispatch(getInfo(data));
    }
  }, [dispatch, id, listSlots]);
  return (
    <>
      <div
        className={`${stateSlot && !check ? 'change__background__color' : ''} ${className}`}
      >
        {!check ? (
          <div className="number__id">{convertId}</div>
        ) : ''}
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
  fieldId: PropTypes.string.isRequired,
};
