import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getTagPackage } from '../../../apis/packageTagApi';
import ExportExcel from '../../../utils/ExportExcel';
import { LIST_FILTER } from '../../../helpers/constants';

function TagDebug() {
  const dispatch = useDispatch();
  const listTags = useSelector((state) => state.packageTag.data);
  const [listNode, setListFilter] = useState([]);

  const handlePackageTag = (num = 20) => {
    if (listTags) {
      const tempArr = listNode ?? [];
      const tag = listTags.slice(
        listTags.length - num,
        listTags.length,
      );
      for (const item in tag) {
        if (!tempArr.includes(tag[item].nodeAddress)) {
          tempArr.push(tag[item].nodeAddress);
        }
      }
      setListFilter(tempArr);
    }
  };

  useEffect(() => {
    handlePackageTag();
  }, [listTags]);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getTagPackage());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Filter listTag
  const [toggleTag, setToggleTag] = useState(false);
  const [numFilter, setNumFilter] = useState(20);
  function handleFilterTagShow() {
    setToggleTag(!toggleTag);
  }
  const showAll = () => {
    setNumFilter(listTags.length);
    handlePackageTag(listTags.length);
  };

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
            <>
              <div className="d-flex justify-content-between align-items-center">
                <div style={{ position: 'relative', marginRight: '10px' }}>Filter</div>
                {' '}
                <i
                  className="fas fa-filter text-primary"
                  onClick={handleFilterTagShow}
                  style={{ cursor: 'pointer' }}
                  aria-hidden="true"
                />
              </div>
              <div className="dropdown text-end position-absolute">
                <ul
                  className={`dropdown-menu text-small ${toggleTag ? 'show' : ''}`}
                  aria-labelledby="dropdownUser1"
                  style={
                    toggleTag
                      ? {
                        position: 'absolute',
                        inset: '0px auto auto 0px',
                        margin: '0px',
                        transform: 'translate(-150px, 13px)',
                        overflow: 'auto',
                      }
                      : {}
                  }
                >
                  <li>
                    <a
                      className="dropdown-item text-small text-end text-danger"
                      href="#foo"
                      onClick={showAll}
                    >
                      Show all
                    </a>
                    <hr className="dropdown-divider" />
                  </li>
                  {LIST_FILTER
                    ? LIST_FILTER.map((item) => (
                      <li key={item}>
                        <a
                          className="dropdown-item"
                          href="#foo"
                          onClick={() => {
                            setNumFilter(item);
                            handlePackageTag(item);
                          }}
                        >
                          {item}
                        </a>
                        <hr className="dropdown-divider" />
                      </li>
                    ))
                    : null}
                </ul>
              </div>
              <ExportExcel dataSet={listTags} name={`Tag-${nowDate()}`}>
                <button className="btn-action p-2" type="button">
                  <h6 className="m-0 font-weight-bold text-primary text-right">
                    <i className="fa fa-file-export" />
                    {' '}
                    Export Excel
                  </h6>
                </button>
              </ExportExcel>
            </>
          ) : null}
        </div>
        <div className="card-body" style={{ backgroundColor: '#f8f9fc' }}>
          <div className="table-responsive table-hover">
            <table
              className="list-user"
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
                    .slice(listTags.length - numFilter, listTags.length)
                    .map((item) => (
                      <tr key={item.newsId}>
                        <td>{item.newsId}</td>
                        <td>{item.sign}</td>
                        <td>{item.seq}</td>
                        <td>{item.mty}</td>
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
