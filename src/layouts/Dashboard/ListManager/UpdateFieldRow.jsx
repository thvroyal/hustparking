import { bool, number, string } from 'prop-types';
import React from 'react';
import axios from 'axios';
import SwitchToggle from '../../../components/SwitchToggle';

function UpdateFieldRow({
  title, toggled, fieldId, managerId,
}) {
  const addFieldForManager = async () => {
    const data = {
      fieldId,
      managerId,
      id: 0,
    };
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URL}/api/ad/managerField/create_and_update`,
        data: JSON.stringify(data),
        headers: {
          token: localStorage.getItem('AccessToken'),
          'Content-Type': 'application/json',
        },
      });
      if (response.data.message !== 'success') {
        console.log('fail');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span className="w-75">{title}</span>
      <SwitchToggle
        onChecked={addFieldForManager}
        onUnchecked={() => console.log('toggle False')}
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
  managerId: number.isRequired,
};
UpdateFieldRow.defaultProps = {
  toggled: false,
};

export default React.memo(UpdateFieldRow);
