import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class CheckBoxResult extends Component {
  constructor(p) {
    super(p);

    console.log(this.props.block);

    const labels = [];
    const values = [];

    for (let i = 1; i <= 6; i++) {
      if (this.props.block.data[`value${i}`] !== '') {
        // eslint-disable-next-line
        labels.push(this.props.block.data[`value${i}`] + ' (' + this.props.block.valueCounts[`value${i}`] + ')');
        values.push(this.props.block.valueCounts[`value${i}`]);
      }
    }

    this.state = {
      labels,
      datasets: [
        {
          label: this.props.block.title,
          backgroundColor: 'rgba(86, 204, 242, 0.9)',
          borderColor: 'rgba(224, 224, 224, 1)',
          borderWidth: 1,
          data: values,
        },
      ],
    };
  }

  render() {
    return (<div><Bar
      data={this.state}
      height={300}
      legend={{
        legend: {
          display: false,
        },
      }}
      options={{
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: false,
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      }}
    /></div>);
  }
}
