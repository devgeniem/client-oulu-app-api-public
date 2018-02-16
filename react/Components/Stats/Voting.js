import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { Bar } from 'react-chartjs-2';

@translate(['common', 'stats'])
export default class Voting extends Component {
  constructor(p) {
    super(p);

    const top10 = this.props.voteStats.topVotes.slice(0, 10);
    const labels = [];
    const data = [];

    top10.forEach((vote) => {
      labels.push(vote.title);
      data.push(vote.resultCount);
    });

    this.state = {
      labels,
      datasets: [
        {
          label: 'Top 10',
          backgroundColor: 'rgba(86, 204, 242, 0.9)',
          borderColor: 'rgba(224, 224, 224, 1)',
          borderWidth: 1,
          data,
        },
      ],
    };
  }

  render() {
    const { t, voteStats } = this.props;


    return ([
      <Col xs={6} key={1}>
        <h4>{t('stats:votescount')}</h4>
        { voteStats.votesCount }
      </Col>,
      <Col xs={12} key={3}>
        <h4>{t('stats:topvotes')}</h4>

        <div><Bar
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
        /></div>

      </Col>,
      <Col xs={12} key={2}>
        <button onClick={this.props.close}>{t('back')}</button>
      </Col>,
    ]);
  }
}
