import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getField } from "../../apis/fieldApi";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { useRef } from "react";
import Axios from "axios";

function BookingForm(props) {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.field.data);
  const loadingField = useSelector((state) => state.field.loading);
  const [fieldSelected, selectField] = useState(null);
  const [timeNow, setTimeNow] = useState("");
  const [loadingBook, setLoadingBook] = useState(false);
  const [mess, setMess] = useState({ type: null, content: null }); // success: type = 1 , err: type = 0
  const timeInRef = useRef();
  const timeOutRef = useRef();

  useEffect(() => {
    dispatch(getField());
  }, [dispatch]);

  function handleSelectField(id) {
    selectField(id);
  }
  function convertNum(d) {
    if (parseInt(d) < 10) return "0" + parseInt(d);
    else return d;
  }
  function getDateNow() {
    // format date: yyyy-MM-ddThh:mm
    let timeNow = new Date(Date.now() + 30 * 60 * 1000); // + 7h30p -> GMT+7
    let timeNowString = timeNow.toLocaleString("vi-VN"); // format: hh:mm:ss, dd/mm/yyyy
    let timeNowArray = timeNowString.split(", ");
    let date = timeNowArray[1].split("/");
    let time = timeNowArray[0].split(":");
    let dateFormatted =
      date[2] +
      "-" +
      convertNum(date[1]) +
      "-" +
      convertNum(date[0]) +
      "T" +
      convertNum(time[0]) +
      ":" +
      convertNum(time[1]);
    setTimeNow(dateFormatted);
    console.log(dateFormatted);
  }
  async function handleBooking() {
    const data = {
      fieldId: fieldSelected,
      timeInBook: new Date(timeInRef.current.value),
      timeOutBook: new Date(timeOutRef.current.value),
    };
    console.log(data);
    setLoadingBook(true);
    try {
      const response = await Axios({
        method: "POST",
        url: `${process.env.REACT_APP_BASE_URL}/api/us/book`,
        headers: {
          token: localStorage.getItem("AccessToken"),
        },
        data: JSON.stringify(data),
      });
      setLoadingBook(false);
      if (response.data.message === "success" && response.data.data) {
        setMess({ type: 1, content: "Successful booking!" });
      } //success booking
      else {
        setMess({ type: 0, content: "Fail booking. Try again!" });
      }
    } catch (error) {
      setLoadingBook(false);
      setMess({ type: 0, content: "Failure. Try again" });
    }
  }
  return (
    <div
      className="card m-5"
      style={{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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
                ? fields.map((field, index) => (
                    <div
                      className="col-md-2 d-flex justify-content-center mt-2"
                      key={index}
                    >
                      <button
                        type="button"
                        className={`btn ${
                          field.id === fieldSelected
                            ? "btn-dark"
                            : "btn-outline-dark"
                        }`}
                        style={{
                          width: "-webkit-fill-available",
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
              ></input>
            </div>
            <div className="col">
              Time Out
              <input
                className="form-control form-control mt-2"
                type="datetime-local"
                min={timeNow}
                onFocus={getDateNow}
                ref={timeOutRef}
              ></input>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary btn-lg pl-3 pr-3"
            onClick={handleBooking}
            disabled={loadingBook}
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
            class={`alert mt-3 ${mess.type ? "alert-success" : "alert-danger"}`}
            role="alert"
          >
            {mess.content}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingForm;
