import {
  bool,
  func,
  number,
  string,
} from 'prop-types';
import React from 'react';
import SwitchToggle from '../../../components/SwitchToggle';

function UpdateFieldRow({
  title, toggled, listField, fieldId,
}) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span className="w-75">{title}</span>
      <SwitchToggle
        onChecked={() => listField(fieldId)}
        onUnchecked={() => {
          console.log('toggle False');
          listField(fieldId);
        }}
        scale={0.75}
        toggled={toggled}
      />
    </li>
  );
}

UpdateFieldRow.propTypes = {
  title: string.isRequired,
  toggled: bool,
  fieldId: number.isRequired,
  // managerId: number.isRequired,
  listField: func.isRequired,
};
UpdateFieldRow.defaultProps = {
  toggled: false,
};

export default React.memo(UpdateFieldRow);
