import React from 'react';
import PropTypes from 'prop-types';
import ReactExport from 'react-export-excel';

const { ExcelFile } = ReactExport;
const { ExcelSheet } = ReactExport.ExcelFile;
const { ExcelColumn } = ReactExport.ExcelFile;

function ExportExcel(props) {
  const { dataSet, name, children } = props;
  return (
    <ExcelFile element={children} filename={name}>
      <ExcelSheet data={dataSet} name={name}>
        {Object.keys(dataSet[0])
          ? Object.keys(dataSet[0]).map((key, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <ExcelColumn label={key} value={key} key={index} />
          ))
          : null}
      </ExcelSheet>
    </ExcelFile>
  );
}
export default ExportExcel;

ExportExcel.propTypes = {
  dataSet: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
