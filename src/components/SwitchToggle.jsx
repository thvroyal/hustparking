import { bool, func, number } from 'prop-types';
import React, { useState } from 'react';

function SwitchToggle({
  onTrue, onFalse, scale, toggled,
}) {
  const [isToggled, setIsToggled] = useState(toggled);
  const onToggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled) onTrue(); else onFalse();
  };
  return (
    <label className="toggle-switch" style={{ transform: `scale(${scale})` }}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}
SwitchToggle.propTypes = {
  onTrue: func.isRequired,
  onFalse: func.isRequired,
  scale: number,
  toggled: bool,
};
SwitchToggle.defaultProps = {
  scale: 1,
  toggled: false,
};
export default SwitchToggle;
