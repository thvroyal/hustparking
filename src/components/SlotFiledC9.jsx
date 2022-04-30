import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInfo } from '../store/notifySlice';

export default function SlotFiledC9({
  className, id, listSlots, fieldId, stateSlot,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {};

    if (stateSlot === true) {
      data = {
        info: `Slot ${id} - Car number ${listSlots.carNumber}`,
        status: 'Y-C9',
        id: parseInt(fieldId, 10),
      };
      dispatch(getInfo(data));
    }
    if (stateSlot === false) {
      data = {
        info: `Slot ${id} has not car`,
        status: 'N-C9',
        id: parseInt(fieldId, 10),
      };
      dispatch(getInfo(data));
    }
  }, [id, listSlots.statusCam]);
  return (
    <>
      <div
        className={`${stateSlot ? 'change__background__color' : ''} ${className}`}
      >
        <div className="number__id">{id}</div>
        <i className={`${stateSlot ? '' : 'd-none'} icon__car__ver__C9 fas fa-car`} />
      </div>
    </>
  );
}

SlotFiledC9.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  listSlots: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
  stateSlot: PropTypes.bool.isRequired,
};
