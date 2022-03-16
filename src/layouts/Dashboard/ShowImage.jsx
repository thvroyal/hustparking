import React from 'react';
import CarBannerImg from '../../assets/img/2D_thư_viện_D35.drawio.png';

function ShowImage() {
  return (
    <>
      <div className="table-responsive table-hover">
        <table
          className="list-user"
          id="dataTable"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Car number image</th>
              <th>Car number</th>
              <th>Time car in</th>
              <th>Time car out</th>
              <th>Field name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td style={{ width: '110px', height: '60px' }}>
                <img
                  className="image"
                  style={{
                    width: '100px',
                    height: '50px',
                    cursor: 'pointer',
                  }}
                  src={CarBannerImg}
                  alt=""
                />
              </td>
              <td>30A-12345</td>
              <td>2021-05-05T05:06:00.000+07:00</td>
              <td>2021-05-05T05:06:00.000+07:00</td>
              <td>D35-Library</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowImage;
