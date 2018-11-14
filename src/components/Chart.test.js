import React from 'react';
import { shallow } from 'enzyme';
import Chart from './Chart';

const chartLabels = ['Total sent', 'Left available']
const chartData = [0.00, 5000.00];

test('Chart component', () => {
  const cChart = shallow(<Chart chartLabels={chartLabels} chartData={chartData}/>);
  expect(cChart).toMatchSnapshot();
  cChart.setProps({ chartData: [100.00, 4900.00] });
  expect(cChart).toMatchSnapshot();
});
