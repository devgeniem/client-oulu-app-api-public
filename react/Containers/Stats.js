import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AdminHeader, MainMenu, StatPanels } from '../Components';
import StatActions from '../Redux/StatRedux';

const mapStateToProps = state => ({
  stats: state.stats.stats,
  fetching: state.stats.fetching,
  error: state.stats.error,
});

const mapDispatchToProps = dispatch => ({
  getStats: token => dispatch(StatActions.getStatsRequest(token)),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate()
export default class Stats extends Component {
  componentWillMount() {
    this.props.getStats(this.props.token);
  }

  renderPanels = () => {
    if (this.props.error) {
      return (this.props.error.message);
    }
    if (this.props.stats && !this.props.fetching) {
      return (<StatPanels stats={this.props.stats} />);
    }
    return (<div>Ladataan...</div>);
  }

  render() {
    const { t } = this.props;

    return ([
      <AdminHeader modules={this.props.modules} user={this.props.user} logout={this.props.logout} key={1} />,
      <MainMenu modules={this.props.modules} userlevel={this.props.user.userlevel} key={2}>
        <Row>
          <Col xs={12}>
            <h3>{t('stats')}</h3>
          </Col>
        </Row>
        <Row>
          {this.renderPanels()}
        </Row>
      </MainMenu>,
    ]
    );
  }
}
