import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInfo } from '../store/notifySlice';

export default function SlotFiledC9({
  className, id, listSlots, stateSlot,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {};

    if (stateSlot === true) {
      data = {
        info: listSlots.carNumber ? listSlots.carNumber : 'null',
        status: 'Y-C9',
        id,
      };
      dispatch(getInfo(data));
    }
    if (stateSlot === false) {
      data = {
        info: 'X',
        status: 'N-C9',
        id,
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
  stateSlot: PropTypes.bool.isRequired,
};
