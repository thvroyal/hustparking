import { bool, string } from 'prop-types';
import React from 'react';
import SwitchToggle from '../../../components/SwitchToggle';

function UpdateFieldRow({ title, toggled }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span className="w-75">{title}</span>
      <SwitchToggle
        onTrue={() => console.log('toggle True')}
        onFalse={() => console.log('toggle False')}
        scale={0.75}
        toggled={toggled}
      />
    </li>
  );
}

UpdateFieldRow.propTypes = {
  title: string.isRequired,
  toggled: bool,
};
UpdateFieldRow.defaultProps = {
  toggled: false,
};

export default React.memo(UpdateFieldRow);
