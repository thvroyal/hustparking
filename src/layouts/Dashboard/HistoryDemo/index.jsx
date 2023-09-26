import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import VideoAva from '../../../assets/img/video-1.png';
import { fetchListUser } from '../../../apis/HistoryDemoApi';

function HistoryDemo() {
  const dispatch = useDispatch();
  const listHistoryDemo = useSelector((state) => {
    console.log(state);
    return state.historyDemo?.data;
  });
  useEffect(() => {
    dispatch(fetchListUser());
  }, [dispatch]);

  const [show, setShow] = useState(false);

  const [describe, setDescribe] = useState('');

  const [linkCurrent, setLinkCurrent] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (describeMessage, linkVideo) => {
    setDescribe(describeMessage);
    setLinkCurrent(linkVideo);
    setShow(true);
  };

  // const nowDate = () => {
  //   let today = new Date();
  //   const dd = String(today.getDate()).padStart(2, '0');
  //   const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  //   const yyyy = today.getFullYear();

  //   today = mm + dd + yyyy;
  //   return today;
  // };
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800 pt-2">List Video</h1>
      {/* <p className="mb-4">Update after 10 seconds.</p> */}
      <Modal className="my-modal" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{describe}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            className="center"
            title={describe}
            src={linkCurrent}
            allow="autoplay"
            allowFullScreen
          />
        </Modal.Body>
      </Modal>
      <div className="table-responsive mt-4">
        {listHistoryDemo ? (
          <>
            <table
              className="list-user"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th width="15%">Video Id</th>
                  <th>Describe</th>
                  <th width="30%">Saved Time</th>
                  <th width="15%">Action</th>
                </tr>
              </thead>
              <tbody>
                {listHistoryDemo.map((historyDemo) => (
                  <tr key={historyDemo.id}>
                    <td className="avatar">
                      <img className="avatar-img" src={VideoAva} alt="" />
                      {' '}
                      <p>{historyDemo.id}</p>
                    </td>
                    <td>{historyDemo.describe}</td>
                    <td>{historyDemo.loadTime}</td>
                    <td>
                      <Button onClick={() => handleShow(historyDemo.describe, historyDemo.link)}>
                        Action
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{describe}</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            </Modal> */}
          </>
        ) : (
          <div className="text-center w-100 h3 mt-5">No data</div>
        )}
      </div>
    </>
  );
}

export default React.memo(withRouter(HistoryDemo));
