import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';

const event = {
  target: { name: 'name', value: 'Joel Ortiz' }
};

test('Input component', () => {
  const mockChange = jest.fn();
  const cInput = shallow(<Input name='name' onChange={(e) => mockChange(e)} label='Name' prompt='Friend name' validation='' currency='' value='' />);
  cInput.find('input').simulate('change', event);
  expect(mockChange).toBeCalledWith(event);
  expect(cInput).toMatchSnapshot();
});

test('Input component currency, validation', () => {
  const cInput = shallow(<Input name='name' label='Name' prompt='Friend name' validation='Please enter a valid name' currency='€' />);
  expect(cInput).toMatchSnapshot();
});