import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, color, disabled }) => (
  <button
    onClick={onClick}
    style={{ backgroundColor: color }}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  color: 'blue',
  disabled: false,
};

export default Button;