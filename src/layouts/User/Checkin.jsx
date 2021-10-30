import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { getInfo } from '../../apis/auth';
import { getFieldUser } from '../../apis/fieldApi';

function Checkin() {
  const dispatch = useDispatch();
  const selectRef = useRef();
  const listField = useSelector((state) => state.field.data);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShow] = useState([-1, null]);
  const { info } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getFieldUser());
    dispatch(getInfo());
  }, [dispatch]);
  function findField(id) {
    if (listField) {
      const fieldMatch = listField.find((e) => e.id === parseInt(id, 10));
      console.log(fieldMatch);
      if (fieldMatch && fieldMatch.name) return fieldMatch.name; return '';
    }
    return '';
  }
  function convertNum(d) {
    if (parseInt(d, 10) < 10) return `0${parseInt(d, 10)}`;
    return d;
  }
  function formatDateNow() {
    const timeNow = new Date();
    const timeNowArray = timeNow.toLocaleString('vi-VN').split(', ');
    const date = timeNowArray[1].split('/');
    const time = timeNowArray[0].split(':');
    const dateFormatted = `${date[2]}-${convertNum(date[1])}-${convertNum(date[0])}T${convertNum(time[0])}:${convertNum(time[1])}`;
    return dateFormatted;
  }
  async function checkIn() {
    if (selectRef.current.value !== -1) {
      setLoading(true);
      const timeNow = formatDateNow();
      const data = {
        equipment: info.equipment ?? '',
        fieldId: selectRef.current.value,
        timeCarIn: timeNow,
      };
      try {
        const response = await Axios({
          method: 'POST',
          url: `${process.env.REACT_APP_BASE_URL}/api/us/parking`,
          headers: {
            token: localStorage.AccessToken,
            'Content-Type': 'application/json',
          },
          data: JSON.stringify(data),
        });
        setLoading(false);
        if (response.data.message === 'success') {
          setShow([1, timeNow]);
        } else {
          setShow([0, null]);
        }
      } catch (error) {
        setLoading(false);
        setShow([0, null]);
        console.error(error);
      }
    }
  }
  return (
    <>
      <div className="input-group user input-group-lg mt-5 mb-3">
        <select className="custom-select" id="fieldList" ref={selectRef}>
          <option value={-1} defaultChecked>What field do you want to park?</option>
          {listField && listField.map((f) => (
            <option value={f.id} key={f.id}>{f.name}</option>
          ))}
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-primary btn-lg" type="button" disabled={loading} onClick={checkIn}>
            {' '}
            {loading && (
              <Spinner
                animation="border"
                color="primary"
                size="sm"
                className="mr-3"
              />
            )}
            Check in now

          </button>
        </div>
      </div>
      {showAlert[0] === 1 && (
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Wellcome!</h4>
          <p>
            {`You parked at area ${findField(selectRef.current.value)} at ${showAlert[1]}. Go to`}
            <Link to="/home/contracts" className="alert-link"> your contract page </Link>
            for details.
          </p>
        </div>
      )}
      {showAlert[0] === 0 && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Sorry!</h4>
          <p>
            Something wrong, please try again!
          </p>
        </div>
      )}
    </>
  );
}

export default React.memo(Checkin);
