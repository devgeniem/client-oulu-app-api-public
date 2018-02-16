import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AdminHeader, MainMenu, VoteResults } from '../Components';
import VotingActions from '../Redux/VotingRedux';

const mapStateToProps = state => ({
  results: state.voting.results,
  vote: state.voting.vote,
});

const mapDispatchToProps = dispatch => ({
  getResults: (token, id) => dispatch(VotingActions.getResultsRequest(token, id)),
  getVote: id => dispatch(VotingActions.getVoteRequest(id)),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'voting'])
export default class Events extends Component {

  componentWillMount() {
    this.props.getResults(this.props.token, this.props.params.id);
  }

  renderResults = () => {
    if (this.props.results.totalCount) {
      return (<VoteResults results={this.props.results} />);
    }
    return null;
  }

  render() {
    const { t } = this.props;
    return ([
      <AdminHeader modules={this.props.modules} user={this.props.user} logout={this.props.logout} key={1} />,
      <MainMenu modules={this.props.modules} userlevel={this.props.user.userlevel} key={2}>
        <Row>
          <Col xs={12}>
            <h3>{t('voting:results')}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.renderResults()}
          </Col>
        </Row>
      </MainMenu>,
    ]);
  }
}
