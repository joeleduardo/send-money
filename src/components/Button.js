import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'

const Button = (props) => {
  const {
    text,
    enabled,
    onClick,
  } = props;

  const style = !enabled ? { backgroundColor: '#efefef', cursor: 'auto', color: '#ccc' } : {};

  return (
    <button onClick={e => onClick(e)} style={style} disabled={!enabled}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  text: '',
  enabled: true
};

export default Button;
