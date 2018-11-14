import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = (props) => {
  const {
    label,
    name,
    value,
    prompt,
    validation,
    currency,
    onChange
  } = props;

  const currencyStyle = currency ? { paddingLeft: '1rem' } : {};
  const validationStyle = validation ? { borderColor: '#F1586B' } : {};

  return (
    <div className='input'>
      {currency && <div className='currency'>{currency}</div>}
      <label htmlFor={name}>
        {label}
        <input style={{...currencyStyle, ...validationStyle}} id={name} name={name} type='text' value={value || ''} placeholder={prompt} onChange={e => onChange(e)} autoComplete='off' />
      </label>
      {validation && <div className='error-msg'>{validation}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  prompt: PropTypes.string,
  value: PropTypes.string,
  validation: PropTypes.string,
  currency: PropTypes.string,
  onChange: PropTypes.func
};

Input.defaultProps = {
  name: 'inputField',
  label: 'My field',
  prompt: '',
  value: '',
  validation: '',
  currency: ''
};

export default Input;
