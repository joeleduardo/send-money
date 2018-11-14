import React from 'react';
import PropTypes from 'prop-types';
import './List.css';

const List = (props) => {
  const { items } = props;

  const numberWithCommas = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return(
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <div className='name'>{item.name}</div>
          <div className='email'>{item.email}</div>
          <span>£ {numberWithCommas(item.amount)}</span>
        </li>
      ))}
    </ul>
  )
}

List.propTypes = {
  items: PropTypes.array.isRequired,
};

List.defaultProps = {
  items: []
};

export default List;