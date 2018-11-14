import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Chart.css';

class chartComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      labels: props.chartLabels,
      data: props.chartData,
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.chartData !== prevProps.chartData) {
      this.setState({
        data: this.props.chartData
      })
    }
  }

  render() {
    const data = {
      labels: this.state.labels,
      datasets: [{
        data: this.state.data,
        backgroundColor: [
          '#ffb427',
          '#cccccc'
        ]
      }]
    }

    const options = {
      responsive: false,
      legend: {
        display: false
      }
    }

    const numberWithCommas = (amount) => {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
      <div className='status'>
        <div className='amounts'>
          £ {numberWithCommas(this.state.data[0])}
          <span>{this.state.labels[0]}</span>
        </div>
        <Doughnut data={data} options={options} width={180}/>
        <div className='amounts'>
          £ {numberWithCommas(this.state.data[1])}
          <span>{this.state.labels[1]}</span>
        </div>
      </div>
    );
  }
}

export default chartComponent;