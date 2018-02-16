import React, { Component } from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, Radio, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { translate } from 'react-i18next';
import { VoteEditor, ImageUpload } from '..';

@translate(['common', 'voting'])
export default class VoteEdit extends Component {
  constructor(p) {
    super(p);

    this.state = {
      id: this.props.poll.id,
      title: this.props.poll.title,
      link: this.props.poll.link,
      image: this.props.poll.image,
      poll: this.props.poll.poll,
      organiser: this.props.poll.organiser,
      linkedEvent: this.props.poll.linkedEvent === null ? '' : this.props.poll.linkedEvent,
      pollType: this.props.poll.pollType,
      error: false,
    };
  }

  onFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.organiser !== '') {
      const newpoll = this.state;

      if (newpoll.linkedEvent === '') {
        delete newpoll.linkedEvent;
      }
      delete newpoll.error;
      this.props.onSave(newpoll);
    } else {
      this.setState({
        error: true,
      });
    }
  }

  onBlockChange = (block) => {
    this.setState({
      poll: block,
    });
  }

  uploadPicture = (result, type) => {
    // console.log(result, type);
    this.props.upload(this.props.token, result, type);
  }

  renderItems = () => {
    if (this.props.events.length > 0) {
      return this.props.events.map((item) => {
        return (
          <option key={item.id} value={item.id}>{item.title}</option>
        );
      });
    }
    return null;
  }

  renderError = () => {
    if (this.state.error) {
      return (<Alert bsStyle="danger">Järjestäjä on pakollinen kenttä.</Alert>);
    }
    return null;
  }

  render() {
    const { t } = this.props;

    return (
      <form onSubmit={this.onFormSubmit}>
        {this.renderError()}
        <Row>
          <Col sm={6}>
            <FormGroup controlId="title">
              <ControlLabel>{t('voting:title')}</ControlLabel>
              <FormControl
                onChange={this.onFieldChange}
                placeholder={t('voting:title')}
                value={this.state.title}
                name="title"
              />
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup controlId="link">
              <ControlLabel>{t('voting:link')}</ControlLabel>
              <FormControl
                onChange={this.onFieldChange}
                placeholder={t('voting:link')}
                value={this.state.link}
                name="link"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormGroup controlId="organiser">
              <ControlLabel>{t('voting:organiser')}</ControlLabel>
              <FormControl
                onChange={this.onFieldChange}
                placeholder={t('voting:organiser')}
                value={this.state.organiser}
                name="organiser"
              />
            </FormGroup>
          </Col>
          <Col sm={6}>
            &nbsp;
            <FormGroup controlId="pollType">
              <ControlLabel>{t('voting:pollType')}</ControlLabel>
              <br /><br />
              <Radio onChange={this.onFieldChange} checked={this.state.pollType === 'poll'} name="pollType" value="poll" inline>
                {t('voting:poll')}
              </Radio>{' '}
              <Radio onChange={this.onFieldChange} checked={this.state.pollType === 'questionnaire'} name="pollType" value="questionnaire" inline>
                {t('voting:questionnaire')}
              </Radio>
            </FormGroup>
          </Col>
          <Col sm={6}>
            <FormGroup controlId="linkedEvent">
              <ControlLabel>{t('voting:linkedEvent')}</ControlLabel>
              <FormControl
                onChange={this.onFieldChange}
                componentClass="select"
                placeholder={t('voting:linkedEvent')}
                value={this.state.linkedEvent}
                name="linkedEvent"
              >
                <option value="">{t('choose')}</option>
                {this.renderItems()}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <FormGroup controlId="image">
              <ControlLabel>{t('voting:image')}</ControlLabel>
              <ImageUpload onChange={this.uploadPicture} currentPicture={this.state.image} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <VoteEditor onChange={this.onBlockChange} blocks={this.state.poll} />
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <br />
            <FormGroup>
              <Button bsStyle="success" type="submit">
                {t('save')}
              </Button>
              {'   '}
              <LinkContainer to="/voting">
                <Button bsStyle="warning">
                  {t('cancel')}
                </Button>
              </LinkContainer>
            </FormGroup>
          </Col>
        </Row>
      </form>
    );
  }
}
