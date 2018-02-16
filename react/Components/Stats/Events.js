import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { Bar } from 'react-chartjs-2';


@translate(['common', 'stats'])
export default class Events extends Component {
  constructor(p) {
    super(p);

    const top10 = this.props.eventStats.topEvents.slice(0, 10);
    const labels = [];
    const data = [];

    top10.forEach((event) => {
      labels.push(event.title);
      data.push(event.participants);
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
    const { t, eventStats } = this.props;
    return ([
      <Col xs={6} key={1}>
        <h4>{t('stats:eventcount')}</h4>
        {eventStats.totalCount}
      </Col>,
      <Col xs={6} key={4}>
        <h4>{t('stats:eventusers')}</h4>
        {eventStats.averageParticipants}
      </Col>,
      <Col xs={12} key={3}>
        <h4>{t('stats:topevents')}</h4>

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
