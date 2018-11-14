import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

const items = [
  {
    id: 'rFj2aAOIsILzHmP29VHo',
    name: 'Joel Ortiz',
    email: 'joeleduardo@hotmail.com',
    amount: '1000.00'
  }
];

test('List component', () => {
  const cList = shallow(<List items={items} />);
  expect(cList).toMatchSnapshot();
});
