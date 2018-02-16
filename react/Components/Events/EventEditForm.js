import React, { Component } from 'react';
import { Col, Row, FormGroup, ControlLabel, FormControl, Button, Radio, Alert } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';
import Geosuggest from 'react-geosuggest';

import { DatePicker, CategoryPicker, ImageUpload } from '..';

@translate(['common', 'events'])
export default class EventEditForm extends Component {
  constructor(p) {
    super(p);

    this.state = {
      id: this.props.event.id,
      title: this.props.event.title,
      desc: this.props.event.desc,
      startDate: this.props.event.startDate,
      endDate: this.props.event.endDate,
      cat: this.props.event.cat,
      subcats: this.props.event.subcats,
      place: this.props.event.place,
      lat: this.props.event.lat,
      long: this.props.event.long,
      status: this.props.event.status,
      price: this.props.event.price,
      modifier: this.props.user.id,
      organiser: this.props.event.organiser,
      picture: this.props.event.picture,
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSave(this.state);
  }
  onFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onDateChange = (date, field) => {
    this.setState({
      [field]: new Date(date).getTime(),
    });
  }

  onCatChange = (value, category) => {
    if (category) {
      this.setState({
        cat: value,
      });
    } else {
      this.setState({
        subcats: value,
      });
    }
  }

  onStatusChange = (status) => {
    this.setState({
      status,
    });
  }

  onLocationChange = (loc) => {
    this.setState({
      long: loc.location.lng,
      lat: loc.location.lat,
      place: loc.description,
    });
  }

  render() {
    const { t } = this.props;

    return (
      <Col sm={10}>
        <form onSubmit={this.onFormSubmit}>
          {
            this.props.saveError ?
              <Alert bsStyle="danger">
                <strong>{t(this.props.saveError.error)}</strong>
              </Alert>
            : null
          }

          <Row>
            <Col sm={6}>
              <FormGroup controlId="title">
                <ControlLabel>{t('events:title')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('events:title')}
                  value={this.state.title}
                  name="title"
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="desc">
                <ControlLabel>{t('events:desc')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('events:desc')}
                  value={this.state.desc}
                  name="desc"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="price">
                <ControlLabel>{t('events:price')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('events:price')}
                  value={this.state.price}
                  name="price"
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="end">
                <ControlLabel>{t('events:address')}</ControlLabel>
                <Geosuggest
                  placeholder={t('events:address')}
                  inputClassName="form-control"
                  minLength={3}
                  autoActivateFirstSuggest
                  onSuggestSelect={this.onLocationChange}
                  types={['geocode']}
                  initialValue={this.state.place}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="end">
                <ControlLabel>{t('events:organiser')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('events:organiser')}
                  value={this.state.organiser}
                  name="organiser"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="start">
                <ControlLabel>{t('events:start')}</ControlLabel>
                <DatePicker fieldName="startDate" current={this.state.startDate} onChange={this.onDateChange} />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="end">
                <ControlLabel>{t('events:end')}</ControlLabel>
                <DatePicker fieldName="endDate" current={this.state.endDate} onChange={this.onDateChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <CategoryPicker onChange={this.onCatChange} category={this.state.cat} subcategories={this.state.subcats} />
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="status">
                <ControlLabel>{t('events:status')}</ControlLabel>
                <Radio
                  name="radioGroup"
                  title={t('events:pending')}
                  checked={this.state.status === 'pending'}
                  onChange={() => this.onStatusChange('pending')}
                >
                  {t('events:pending')}
                </Radio>
                {' '}
                <Radio
                  name="radioGroup"
                  title={t('events:published')}
                  checked={this.state.status === 'published'}
                  onChange={() => this.onStatusChange('published')}
                >
                  {t('events:published')}
                </Radio>
                {' '}
                <Radio
                  name="radioGroup"
                  title={t('events:removed')}
                  checked={this.state.status === 'removed'}
                  onChange={() => this.onStatusChange('removed')}
                >
                  {t('events:removed')}
                </Radio>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="image">
                <ControlLabel>{t('events:image')}</ControlLabel>
                <ImageUpload onChange={this.props.onUpload} currentPicture={this.state.picture} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <FormGroup>
                <Button bsStyle="success" type="submit">
                  {t('save')}
                </Button>
                {'   '}
                <LinkContainer to="/events">
                  <Button bsStyle="warning">
                    {t('cancel')}
                  </Button>
                </LinkContainer>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </Col>
    );
  }
}
