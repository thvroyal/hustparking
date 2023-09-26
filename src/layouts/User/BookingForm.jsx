import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import Axios from 'axios';
import { Link } from 'react-router-dom';
import { getFieldUser } from '../../apis/fieldApi';

function BookingForm() {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.field.data);
  const loadingField = useSelector((state) => state.field.loading);
  const [fieldSelected, selectField] = useState(null);
  const [timeNow, setTimeNow] = useState('');
  const [loadingBook, setLoadingBook] = useState(false);
  const [mess, setMess] = useState({ type: null, content: null });
  // success: type = 1 , err: type = 0
  const timeInRef = useRef();
  const timeOutRef = useRef();

  useEffect(() => {
    dispatch(getFieldUser());
  }, [dispatch]);

  function handleSelectField(id) {
    selectField(id);
  }
  function convertNum(d) {
    if (parseInt(d, 10) < 10) return `0${parseInt(d, 10)}`;
    return d;
  }
  function getDateNow() {
    // format date: yyyy-MM-ddThh:mm
    const ptimeNow = new Date(Date.now() + 30 * 60 * 1000); // + 30p
    const timeNowString = ptimeNow.toLocaleString('vi-VN'); // format: hh:mm:ss, dd/mm/yyyy
    const timeNowArray = timeNowString.split(', ');
    const date = timeNowArray[1].split('/');
    const time = timeNowArray[0].split(':');
    const dateFormatted = `${date[2]}-${convertNum(date[1])}-${convertNum(date[0])}T${convertNum(time[0])}:${convertNum(time[1])}`;
    setTimeNow(dateFormatted);
  }
  // return the time value in miliseconds, if no params return now time
  function getTime(string = '') {
    if (!string) return Date.now();
    return new Date(string).getTime();
  }
  async function handleBooking() {
    const data = {
      fieldId: fieldSelected,
      timeInBook: `${timeInRef.current.value}:00.000Z`,
      timeOutBook: `${timeOutRef.current.value}:00.000Z`,
      carNumber: '',
    };
    // validate time : timeInBook > time OutBook && timeInBook  < timeNow + 30p
    if (getTime(data.timeInBook) >= getTime(data.timeOutBook)) {
      setMess({
        type: 0,
        content: 'Time in must greater than time out. Change your time out!',
      });
      return;
    }
    if (getTime(data.timeInBook) <= getTime() + 30 * 60 * 1000) {
      setMess({
        type: 0,
        content:
          'Bookings are only available 30 minutes after the current time. Change your time in!',
      });
      return;
    }
    setLoadingBook(true);
    try {
      const response = await Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URL}/api/us/book`,
        headers: {
          token: localStorage.getItem('AccessToken'),
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      });
      setLoadingBook(false);
      if (response.data.message === 'success' && response.data.data) {
        setMess({ type: 1, content: `Successful booking! Booking is available from ${timeInRef.current.value.split('T')[1]} + 30mins` });
      } else {
        setMess({ type: 0, content: 'Fail booking. Try again!' });
      }
    } catch (error) {
      setLoadingBook(false);
      setMess({ type: 0, content: 'Failure. Try again' });
    }
  }
  return (
    <div
      className="card m-5"
      style={{
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      }}
    >
      <div className="card-header bg-primary">
        <div className="h5 text-white mb-0 p-2">
          <i className="fa fa-bookmark mr-3" />
          Booking
        </div>
      </div>
      <div className="card-body">
        <div>
          List of Parking Field
          {!loadingField ? (
            <div id="listField" className="row">
              {fields
                ? fields.listOfFields.map((field) => (
                  <div
                    className="col-md-2 d-flex justify-content-center mt-2"
                    key={field.id}
                  >
                    <button
                      type="button"
                      className={`btn ${field.id === fieldSelected
                        ? 'btn-dark' : 'btn-outline-dark'}`}
                      style={{
                        width: '-webkit-fill-available',
                      }}
                      onClick={() => handleSelectField(field.id)}
                    >
                      {field.name}
                    </button>
                  </div>
                ))
                : null}
            </div>
          ) : (
            <Spinner animation="border" color="primary" className="mt-3" />
          )}
        </div>
        {/* Pick time */}
        <hr className="mt-3" />
        <div className="mt-3">
          <div className="row">
            <div className="col">
              Time In
              <input
                className="form-control form-control mt-2"
                type="datetime-local"
                onFocus={getDateNow}
                min={timeNow}
                required
                ref={timeInRef}
              />
            </div>
            <div className="col">
              Time Out
              <input
                className="form-control form-control mt-2"
                type="datetime-local"
                min={timeNow}
                onFocus={getDateNow}
                ref={timeOutRef}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary btn-lg pl-3 pr-3"
            onClick={handleBooking}
            disabled={loadingBook}
            type="button"
          >
            {loadingBook ? (
              <Spinner
                animation="border"
                color="primary"
                className="mr-2"
                size="sm"
              />
            ) : null}
            Booking
          </button>
        </div>
        {mess.type != null && (
          <div
            className={`d-flex justify-content-between align-items-center alert mt-3 ${mess.type ? 'alert-success' : 'alert-danger'}`}
            role="alert"
          >
            <div>
              {mess.content}
            </div>
            <div>
              <Link to="/home/livemap">
                <i className="fas fa-map" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingForm;
