import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

const data = {
  loans: []
}

jest.useFakeTimers();

test('Home page', () => {
  const cHome = shallow(<Home data={data}/>);

  cHome.setState({
    amountAvailable: 5000
  })

  cHome.setProps({
    data: {
      loans: [
        {
          name: 'Joel Ortiz',
          email: 'joeleduardo@hotmail.com',
          amount: '1000.00'
        }
      ]
    }
  });

  const nameEmptyEvent = {
    target: {
      name: 'name',
      value: ''
    }
  };

  const emailEmptyEvent = {
    target: {
      name: 'email',
      value: ''
    }
  };

  const amountEmptyEvent = {
    target: {
      name: 'amount',
      value: ''
    }
  };

  cHome.find('Input').at(0).simulate('change', nameEmptyEvent);
  cHome.find('Input').at(1).simulate('change', emailEmptyEvent);
  cHome.find('Input').at(2).simulate('change', amountEmptyEvent);

  const nameEvent = {
    target: {
      name: 'name',
      value: 'Joel Ortiz'
    }
  };

  const emailEvent = {
    target: {
      name: 'email',
      value: 'joeleduardo@hotmail.com'
    }
  };

  const amountEvent = {
    target: {
      name: 'amount',
      value: '100'
    }
  };

  cHome.find('Input').at(0).simulate('change', nameEvent);
  cHome.find('Input').at(1).simulate('change', emailEvent);
  cHome.find('Input').at(2).simulate('change', amountEvent);
  cHome.instance().validateField('', '');

  expect(cHome.state().validationErrors).toEqual({
    name: '',
    email: '',
    amount: ''
  });

  cHome.setState({
    name: 'Joel Ortiz',
    email: 'joeleduardo@hotmail.com',
    amount: '100.00'
  })

  cHome.find('Button').simulate('click');
  expect(parseFloat(cHome.state().amount)).toBeLessThanOrEqual(cHome.state().amountAvailable)

  cHome.setState({
    name: 'Samantha Adriano',
    email: 'sammadrianos@gmail.com',
    amount: '5500.00'
  })

  cHome.find('Button').simulate('click');
  expect(parseFloat(cHome.state().amount)).toBeGreaterThan(cHome.state().amountAvailable);

  jest.runAllTimers()
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  expect(cHome).toMatchSnapshot();
});

