import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function ExportExcel(props) {
  const { dataSet, name } = props;
  return (
    <ExcelFile element={props.children} filename={name}>
      <ExcelSheet data={dataSet} name={name}>
        {Object.keys(dataSet[0])
          ? Object.keys(dataSet[0]).map((key, index) => (
              <ExcelColumn label={key} value={key} key={index} />
            ))
          : null}
      </ExcelSheet>
    </ExcelFile>
  );
}
export default ExportExcel;
