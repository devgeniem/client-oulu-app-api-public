import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BooleanResult extends Component {
  constructor(p) {
    super(p);
    this.state = {
      labels: [
        `${this.props.block.data.trueText} (${this.props.block.trueCount})`,
        `${this.props.block.data.falseText} (${this.props.block.falseCount})`,
      ],
      datasets: [
        {
          label: this.props.block.title,
          backgroundColor: 'rgba(86, 204, 242, 0.9)',
          borderColor: 'rgba(224, 224, 224, 1)',
          borderWidth: 1,
          data: [parseInt(this.props.block.trueCount, 10), parseInt(this.props.block.falseCount, 10)],
        },
      ],
    };
  }
  render() {
    return (<div><Bar
      height={300}
      data={this.state}
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
