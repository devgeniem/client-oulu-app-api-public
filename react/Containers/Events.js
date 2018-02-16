import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AdminHeader, MainMenu, EventList, EventForm } from '../Components';
import EventAction from '../Redux/EventRedux';
import FileAction from '../Redux/FileRedux';


const mapStateToProps = state => ({
  fetching: state.events.fetching,
  events: state.events.events,
  newevent: state.events.event,
  adding: state.events.adding,
  uploading: state.file.uploading,
  url: state.file.url,
  error: state.file.error,
});

const mapDispatchToProps = dispatch => ({
  listEvents: (token, params) => dispatch(EventAction.listEventsRequest(token, params)),
  createEvent: (token, event) => dispatch(EventAction.createEventRequest(token, event)),
  uploadPicture: (token, uri, type) => dispatch(FileAction.upload(token, uri, type)),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'events'])
export default class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'pending',
      limit: 10,
      page: 1,
      showadd: false,
      newpic: null,
    };
  }
  componentWillMount() {
    this.props.listEvents(this.props.token, this.state);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.adding === false && newProps.newevent) {
      this.props.listEvents(this.props.token, this.state);
    }

    if (this.props.url !== newProps.url) {
      this.setState({
        newpic: newProps.url,
      });
    }
  }
  componentDidUpdate(nextProps, nextState) {
    if ((nextState.status !== this.state.status)) {
      this.props.listEvents(this.props.token, this.state);
    }
  }

  uploadPicture = (result, type) => {
    this.props.uploadPicture(this.props.token, result, type);
  }

  createEvent = (event) => {
    const newevent = event;
    newevent.creator = this.props.user.id;

    if (this.state.newpic) {
      newevent.picture = this.state.newpic;
    }

    this.props.createEvent(this.props.token, event);
    this.toggleForm();
  }

  changeStatus = (status) => {
    this.setState({
      status,
    });
  }

  changePage = (page) => {
    this.setState({
      page,
    });
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
  renderAddForm = () => {
    if (this.state.showadd) {
      return (<EventForm toggleForm={this.toggleForm} onUpload={this.uploadPicture} submitForm={this.createEvent} newpic={this.state.newpic} />);
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
            <Button onClick={() => this.changeStatus('')} value="*">{t('events:all')}</Button>
            <Button onClick={() => this.changeStatus('pending')}>{t('events:pending')}</Button>
            <Button onClick={() => this.changeStatus('published')}>{t('events:published')}</Button>
            <Button onClick={() => this.changeStatus('removed')}>{t('events:removed')}</Button>
          </Col>
        </Row>
        <EventList
          events={this.props.events}
          limit={this.state.limit}
          page={this.state.page}
          changePage={this.changePage}
          toggleForm={this.toggleForm}
        />
        {this.renderAddForm()}
      </MainMenu>,
    ]);
  }
}
