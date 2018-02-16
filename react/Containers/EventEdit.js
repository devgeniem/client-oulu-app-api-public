import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AdminHeader, MainMenu, EventEditForm } from '../Components';
import EventAction from '../Redux/EventRedux';
import FileAction from '../Redux/FileRedux';

const mapStateToProps = state => ({
  fetching: state.events.fetching,
  event: state.events.event,
  saveError: state.events.error,
  uploading: state.file.uploading,
  url: state.file.url,
  error: state.file.error,
});

const mapDispatchToProps = dispatch => ({
  getEvent: (token, id) => dispatch(EventAction.getEventRequest(token, id)),
  saveEvent: (token, event) => dispatch(EventAction.saveEventRequest(token, event)),
  uploadPicture: (token, uri, type) => dispatch(FileAction.upload(token, uri, type)),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'events'])
export default class EventEdit extends Component {
  constructor(p) {
    super(p);

    this.state = {
      newpic: null,
    };
  }
  componentWillMount() {
    this.props.getEvent(this.props.token, this.props.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.url !== newProps.url) {
      this.setState({
        newpic: newProps.url,
      });
    }
  }

  saveForm = (event) => {
    const eventobject = event;

    if (this.state.newpic) {
      eventobject.picture = this.state.newpic;
    }
    this.props.saveEvent(this.props.token, eventobject);
  }

  uploadPicture = (result, type) => {
    this.props.uploadPicture(this.props.token, result, type);
  }

  renderForm = () => {
    if (this.props.event) {
      return (<EventEditForm
        saveError={this.props.saveError}
        user={this.props.user}
        event={this.props.event}
        onSave={this.saveForm}
        onUpload={this.uploadPicture}
      />);
    }
    return null;
  }

  render() {
    const { t } = this.props;
    console.log('props', this.props);

    return ([
      <AdminHeader modules={this.props.modules} user={this.props.user} logout={this.props.logout} key={1} />,
      <MainMenu modules={this.props.modules} userlevel={this.props.user.userlevel} key={2}>
        <Row>
          <Col xs={12}>
            <h3>{t('events:edit_event')}</h3>
            {this.renderForm()}
          </Col>
        </Row>
      </MainMenu>,
    ]
    );
  }
}
