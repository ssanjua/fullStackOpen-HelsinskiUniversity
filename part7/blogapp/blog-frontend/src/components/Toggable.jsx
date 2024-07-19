import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Toggable = forwardRef(({ children, buttonLabel, cancelLabel }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{cancelLabel}</button>
      </div>
    </div>
  );
});

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
};

Toggable.displayName = "Togglable";

export default Toggable;
