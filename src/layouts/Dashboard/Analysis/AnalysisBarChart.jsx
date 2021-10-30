import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { string, instanceOf } from 'prop-types';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';

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
  hour: 'hh:mm',
  day: 'MMM DD',
  week: 'WW',
  month: 'MMM',
};

const typeFormat = {
  freq: 'Frequency',
  cost: 'Cost',
};

function AnalysisBarChart({
  field, since, until, unit, type,
}) {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);

  const getData = async (query) => {
    const sinceMil = (new Date(query.since)).getTime();
    const untilMil = (new Date(query.until)).getTime();

    setLoading(true);

    try {
      const response = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_URL}/api/ad/analysis?field=${query.field}&since=${sinceMil}&until=${untilMil}&unit=${query.unit}`,
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
              label: typeFormat[type],
              data: yData,
              backgroundColor: ['#4e73df'],
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
      {!loading ? <Bar data={chartData} options={options} /> : <Spinner animation="border" color="primary" />}
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
