import {
  bool, func, number,
} from 'prop-types';
import React, { useEffect, useState } from 'react';

function SwitchToggle({
  onChecked, onUnchecked, scale, toggled,
}) {
  const [isToggled, setIsToggled] = useState(toggled);
  useEffect(() => {
    setIsToggled(toggled);
  }, [toggled]);

  const onToggle = async () => {
    setIsToggled(!isToggled);
    if (!isToggled) await onChecked(); else await onUnchecked();
  };
  return (
    <label className="toggle-switch" style={{ transform: `scale(${scale})` }}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
  );
}
SwitchToggle.propTypes = {
  onChecked: func.isRequired,
  onUnchecked: func.isRequired,
  scale: number,
  toggled: bool,
};
SwitchToggle.defaultProps = {
  scale: 1,
  toggled: false,
};
export default SwitchToggle;
