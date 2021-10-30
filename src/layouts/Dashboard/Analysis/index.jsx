import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { getField } from '../../../apis/fieldApi';

import 'react-datepicker/dist/react-datepicker.css';
import AnalysisBarChart from './AnalysisBarChart';

const UNIT_OPTIONS = ['hour', 'day', 'week', 'month'];
function Analysis() {
  const listField = useSelector((state) => state.field.data);
  const dispatch = useDispatch();
  const [activeUnit, setActiveUnit] = useState(UNIT_OPTIONS[0]);
  const [activeType, setActiveType] = useState('freq');
  const [activeField, setActiveField] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectTypeRef = useRef();
  const selectFieldRef = useRef();

  useEffect(() => {
    dispatch(getField());
  }, []);
  const handleActiveUnit = (id) => {
    setActiveUnit(id);
  };

  const onChangeSelectType = () => {
    setActiveType(selectTypeRef.current.value);
  };

  const onChangeFieldType = () => {
    setActiveField(selectFieldRef.current.value);
  };
  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Analysis Field</h6>
        </div>
        <div className="card-body" style={{ maxHeight: '700px' }}>
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div className="d-flex" style={{ gap: '12px' }}>
              <div className="input-group input-group-sm" style={{ width: 'fit-content' }}>
                <select className="custom-select" ref={selectFieldRef} onChange={onChangeFieldType}>
                  <option value="">---Select field---</option>
                  {listField && listField.map((field) => (
                    <option value={field.id} key={field.id}>{field.name}</option>
                  ))}
                </select>
              </div>
              <div className="input-group input-group-sm" style={{ width: 'fit-content' }}>
                <select className="custom-select" ref={selectTypeRef} onChange={onChangeSelectType}>
                  <option value="freq">Frequency</option>
                  <option value="cost">Cost</option>
                </select>
              </div>
            </div>
            <div className="d-flex align-items-end" style={{ gap: '24px' }}>
              <div className="d-flex" style={{ gap: '6px' }}>
                <div className="input-group">
                  Start time
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="form-control form-control-sm"
                  />
                </div>
                <div className="input-group">
                  End time
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                {UNIT_OPTIONS && UNIT_OPTIONS.map((unit) => (
                  <label
                    className={`btn btn-sm btn-outline-dark ${activeUnit === unit ? 'active' : ''} text-capitalize`}
                    key={unit}
                    onClick={() => handleActiveUnit(unit)}
                    aria-hidden="true"
                  >
                    <input type="radio" name="unit_options" />
                    {unit}
                  </label>
                ))}
              </div>
            </div>
          </div>
          {
            activeField && (
            <AnalysisBarChart
              field={activeField}
              since={startDate}
              until={endDate}
              unit={activeUnit}
              type={activeType}
            />
            )
}
        </div>
      </div>
    </>
  );
}

export default Analysis;
