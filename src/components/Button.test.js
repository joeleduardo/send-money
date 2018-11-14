import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

test('Button component enabled', () => {
  const mockClick = jest.fn();
  const cButton = shallow(<Button test="Send money" enabled onClick={(e) => mockClick(e)}/>);
  cButton.simulate('click');
  expect(mockClick).toHaveBeenCalled();
  expect(cButton).toMatchSnapshot();
});

test('Button component enabled', () => {
  const mockClick = jest.fn();
  const cButton = shallow(<Button test="Send money" enabled={false} onClick={(e) => mockClick(e)}/>);
  expect(mockClick.mock.calls.length).toBe(0);
  expect(cButton).toMatchSnapshot();
});

