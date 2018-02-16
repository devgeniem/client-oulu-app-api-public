import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Col, Panel } from 'react-bootstrap';
import { StatsUsers, StatsVoting, StatsEvents } from '..';

@translate(['common', 'stats'])
export default class Panels extends Component {
  constructor(p) {
    super(p);

    this.state = {
      showStat: null,
    };
  }

  onStatSelect = (e) => {
    this.setState({
      showStat: e,
    });
  }

  onStatClose = () => {
    this.setState({
      showStat: null,
    });
  }

  renderPanels = () => {
    const { t } = this.props;

    const panels = [
      {
        id: 1,
        stat: 'users',
        title: t('stats:users'),
      },
      {
        id: 2,
        stat: 'events',
        title: t('stats:events'),
      },
      {
        id: 3,
        stat: 'votes',
        title: t('stats:votes'),
      },
    ];

    return panels.map((panel) => {
      return (
        <Col key={panel.id} xs={4}>
          <Panel onClick={() => { this.onStatSelect(panel.stat); }}>
            <h4>{panel.title}</h4>
          </Panel>
        </Col>
      );
    });
  }

  renderStat = () => {
    let stat;

    switch (this.state.showStat) {
    case 'users':
      stat = <StatsUsers userStats={this.props.stats.users} close={this.onStatClose} />;
      break;
    case 'events':
      stat = <StatsEvents eventStats={this.props.stats.events} close={this.onStatClose} />;
      break;
    case 'votes':
      stat = <StatsVoting voteStats={this.props.stats.votes} close={this.onStatClose} />;
      break;
    default:
      stat = null;
    }
    return (
      <div>
        {stat}
      </div>
    );
  }

  render() {
    return (
      <div>
        {
          this.state.showStat === null ?
          this.renderPanels() :
          this.renderStat()
        }
      </div>
    );
  }
}
