import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AdminHeader, MainMenu, VoteList, VoteAdd } from '../Components';
import VotingActions from '../Redux/VotingRedux';

const mapStateToProps = state => ({
  items: state.voting.list,
  adding: state.voting.adding,
  error: state.voting.error,
  saving: state.voting.saving,
  vote: state.voting.vote,
});

const mapDispatchToProps = dispatch => ({
  list: () => dispatch(VotingActions.listVotesRequest()),
  add: (token, vote) => dispatch(VotingActions.addVoteRequest(token, vote)),
  update: (token, vote) => dispatch(VotingActions.saveVoteRequest(token, vote)),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'voting'])
export default class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showadd: false,
    };
  }

  componentWillMount() {
    this.props.list();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.vote === null && newProps.vote !== null) {
      this.props.router.push(`/voting/edit/${newProps.vote.id}`);
    }
    if (this.props.saving !== newProps.saving && this.props.saving && !newProps.error) {
      this.props.list();
    }
  }

  toggleForm = () => {
    if (this.state.showadd) {
      this.setState({
        showadd: false,
      });
    } else {
      this.setState({
        showadd: true,
      });
    }
  }

  addNewVote = (vote) => {
    this.props.add(this.props.token, vote);

    this.setState({
      showadd: false,
    });
  }

  updateVote = (vote) => {
    this.props.update(this.props.token, vote);
  }

  renderForm = () => {
    if (this.state.showadd) {
      return (
        <VoteAdd toggleForm={this.toggleForm} onSubmit={this.addNewVote} />
      );
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
            <h3>{t('voting:module_title')}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <VoteList items={this.props.items} toggleForm={this.toggleForm} updateItem={this.updateVote} />
          </Col>
        </Row>
        {this.renderForm()}
      </MainMenu>,
    ]);
  }
}
