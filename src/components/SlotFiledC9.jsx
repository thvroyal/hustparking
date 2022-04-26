import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getInfoC9 } from '../store/notifySliceC9';

export default function SlotFiledC9({
  className, id, listSlots, fieldId,
}) {
  const [stateSlotC9, setStateSlotC9] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {};

    if (listSlots.statusCam === true || listSlots.carNumber !== null) setStateSlotC9(true);
    if (stateSlotC9 === true) {
      data = {
        info: `Slot ${id} - Car number ${listSlots.carNumber}`,
        status: 'Y-C9',
        id: parseInt(fieldId, 10),
      };
      dispatch(getInfoC9(data));
    }
    if (stateSlotC9 === false) {
      data = {
        info: `Slot ${id} has not car`,
        status: 'N-C9',
        id: parseInt(fieldId, 10),
      };
      dispatch(getInfoC9(data));
    }
  }, [dispatch, id, listSlots]);
  return (
    <>
      <div
        className={`${stateSlotC9 ? 'change__background__color' : ''} ${className}`}
      >
        <div className="number__id">{id}</div>
        <i className={`${stateSlotC9 ? '' : 'd-none'} icon__car__ver__C9 fas fa-car`} />
      </div>
    </>
  );
}

SlotFiledC9.propTypes = {
  className: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  listSlots: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
};
