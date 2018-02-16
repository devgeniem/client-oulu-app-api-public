import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AdminHeader, MainMenu, VoteEdit } from '../Components';
import VotingActions from '../Redux/VotingRedux';
import FileAction from '../Redux/FileRedux';
import EventAction from '../Redux/EventRedux';

const mapStateToProps = state => ({
  fetching: state.voting.fetching,
  vote: state.voting.vote,
  uploading: state.file.uploading,
  url: state.file.url,
  error: state.file.error,
  saving: state.voting.saving,
  events: state.events.events,
});

const mapDispatchToProps = dispatch => ({
  listEvents: (token, params) => dispatch(EventAction.listEventsRequest(token, params)),
  getVote: id => dispatch(VotingActions.getVoteRequest(id)),
  saveVote: (token, vote) => dispatch(VotingActions.saveVoteRequest(token, vote)),
  uploadPicture: (token, uri, type) => dispatch(FileAction.upload(token, uri, type)),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'voting'])
export default class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
    };
  }

  componentWillMount() {
    this.props.getVote(this.props.params.id);

    const eventparams = {
      status: 'published',
    };

    this.props.listEvents(this.props.token, eventparams);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.url !== newProps.url) {
      this.setState({
        imageUrl: newProps.url,
      });
    }

    if (this.props.saving !== newProps.saving && this.props.saving && !newProps.error) {
      this.props.router.push('/voting');
    }
  }

  saveVote = (vote) => {
    // console.log(vote);
    const voteToSave = vote;
    if (this.state.imageUrl) {
      voteToSave.image = this.state.imageUrl;
    }

    this.props.saveVote(this.props.token, voteToSave);
  }

  renderEdit = () => {
    if (this.props.vote) {
      return (<VoteEdit events={this.props.events} upload={this.props.uploadPicture} onSave={this.saveVote} poll={this.props.vote} />);
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
            {this.renderEdit()}
          </Col>
        </Row>
      </MainMenu>,
    ]);
  }
}
