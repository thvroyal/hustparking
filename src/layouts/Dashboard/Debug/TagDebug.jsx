import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTagPackage } from '../../../apis/packageTagApi';
import ExportExcel from '../../../utils/ExportExcel';

function TagDebug() {
  const dispatch = useDispatch();
  const listTags = useSelector((state) => state.packageTag.data);
  const [listNode, setListFilter] = useState([]);
  useEffect(() => {
    if (listTags) {
      const tempArr = listNode ?? [];
      const tag = listTags.slice(
        listTags.length - 25,
        listTags.length,
      );
      for (const item in tag) {
        if (!tempArr.includes(tag[item].nodeAddress)) {
          tempArr.push(tag[item].nodeAddress);
        }
      }
      setListFilter(tempArr);
    }
  }, [listTags]);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getTagPackage());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Filter Node Address
  // const [toggle, isToggle] = useState(false);
  // const [filter, mapFilter] = useState([]);
  // function handleFilterShow() {
  //   isToggle(!toggle);
  // }
  // function handleFilter(data) {
  //   if (filter.includes(data)) {
  //     mapFilter([...filter.filter((value) => value !== data)]);
  //   } else mapFilter([...filter, data]);
  // }
  // function clearFilter() {
  //   mapFilter([]);
  // }
  function nowDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = mm + dd + yyyy;
    return today;
  }
  //   function getData() {
  //     dispatch(getPacket());
  //   }
  return (
    <>
      {/* // <!-- Page Heading --> */}
      {/* // <!-- DataTales Example --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex justify-content-between align-items-center flex-row-reverse">
          {listTags ? (
            <ExportExcel dataSet={listTags} name={`Tag-${nowDate()}`}>
              <button className="btn-action p-2" type="button">
                <h6 className="m-0 font-weight-bold text-primary text-right">
                  <i className="fa fa-file-export" />
                  {' '}
                  Export Excel
                </h6>
              </button>
            </ExportExcel>
          ) : null}
        </div>
        <div className="card-body">
          <div className="table-responsive table-hover">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>newID</th>
                  <th>Sign</th>
                  <th>Seq</th>
                  <th>mty</th>
                  <th>Tag ID</th>
                  <th>Lat</th>
                  <th>Log</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {listTags ? (
                  listTags
                    .slice(listTags.length - 25, listTags.length)
                    .map((item) => (
                      <tr key={item.newId}>
                        <td>{item.newId}</td>
                        <td>{item.sign}</td>
                        <td>{item.seq}</td>
                        <td>{item.tagId}</td>
                        <td>{item.lat}</td>
                        <td>{item.log}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
                        <td>{item.state}</td>
                      </tr>
                    ))
                ) : (
                  <Spinner
                    animation="border"
                    color="primary"
                    className="mt-3"
                  />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(TagDebug);
