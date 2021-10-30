import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { string, instanceOf } from 'prop-types';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0,
      },
    }],
    xAxes: [{
      grid: {
        display: false,
      },
    }],
  },
};

const format = {
  hour: 'hh:mm MMM DD',
  day: 'MMM DD',
  week: 'MMM DD',
  month: 'MMM',
};

const typeFormat = {
  freq: {
    title: 'Frequency',
    backgroundColor: '#4e73df',
  },
  cost: {
    title: 'Cost',
    backgroundColor: '#f6c23e',
  },
};

function AnalysisBarChart({
  field, since, until, unit, type,
}) {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);
  const { alias } = useSelector((state) => state.auth);

  const getData = async (query) => {
    const sinceMil = (new Date(query.since)).getTime();
    const untilMil = (new Date(query.until)).getTime();

    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_URL}/api/${alias}/analysis?field=${query.field}&since=${sinceMil}&until=${untilMil}&unit=${query.unit}`,
        headers: {
          token: localStorage.getItem('AccessToken'),
        },
      });
      if (response.data.message === 'success') {
        const { data } = response.data;
        const yData = [];
        const xData = [];

        if (data) {
          data.forEach((eachData) => {
            yData.push(eachData[type]);
            xData.push(moment(eachData.time).format(format[unit]));
          });
        }

        setChartData({
          labels: xData,
          datasets: [
            {
              label: typeFormat[type].title,
              data: yData,
              backgroundColor: typeFormat[type].backgroundColor,
            },
          ],
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData({
      field, since, until, unit,
    });
  }, [field, since, until, unit, type]);
  return (
    <div
      className="position-relative"
      style={{
        margin: 'auto',
        height: '500px',
        width: '100%',
      }}
    >
      {
        loading && (
        <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center" style={{ background: 'rgba(0,0,0,.1)' }}>
          <Spinner animation="border" variant="primary" />
        </div>
        )
      }
      <Bar data={chartData} options={options} />
    </div>
  );
}

AnalysisBarChart.propTypes = {
  field: string.isRequired,
  since: instanceOf(Date).isRequired,
  until: instanceOf(Date).isRequired,
  unit: string.isRequired,
  type: string.isRequired,
};

export default React.memo(AnalysisBarChart);
