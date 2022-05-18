import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInfo } from '../store/notifySlice';

export default function SlotFiled({
  className, id, stateSlot, check, listSlots,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {};

    if (stateSlot === true && check === false) {
      data = {
        info: listSlots.carNumber ? listSlots.carNumber : 'Null',
        status: 'Y',
        id,
      };
      dispatch(getInfo(data));
    }
    if (check === true && stateSlot === true) {
      data = {
        info: `Car number ${listSlots.carNumber} does not parking`,
        status: 'W',
        id,
      };
      dispatch(getInfo(data));
    }

    if (check === true && stateSlot === false) {
      data = {
        info: `Do not parking at slot ${id}`,
        status: 'W-N',
        id,
      };
      dispatch(getInfo(data));
    }
    if (stateSlot === false && check === false) {
      data = {
        info: 'X',
        status: 'N',
        id,
      };
      dispatch(getInfo(data));
    }
  }, [id, listSlots.statusCam]);
  return (
    <>
      <div
        className={`${stateSlot && !check ? 'change__background__color' : ''} ${className}`}
      >
        {!check ? (
          <div className="number__id">{id}</div>
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
  // fieldId: PropTypes.string.isRequired,
  stateSlot: PropTypes.bool.isRequired,
  check: PropTypes.bool.isRequired,
  listSlots: PropTypes.arrayOf.isRequired,
};
