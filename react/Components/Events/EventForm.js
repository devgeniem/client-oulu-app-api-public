import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Row, Col, Alert } from 'react-bootstrap';
import { translate } from 'react-i18next';
import Geosuggest from 'react-geosuggest';
import { DatePicker, ImageUpload, CategoryPicker } from '../../Components';

@translate(['common', 'events'])
export default class EventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      desc: '',
      startDate: new Date().getTime(),
      endDate: new Date().getTime(),
      currentDate: new Date().getTime(),
      cat: '',
      subcats: [],
      place: '',
      lat: '',
      long: '',
      status: 'published',
      content_type: 'event',
      price: '',
      organiser: '',
      picture: '',
      error: false,
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { title, desc, cat, place, organiser, startDate, endDate, currentDate } = this.state;
    const { newpic } = this.props;

    let dateSet = false;

    if (startDate !== currentDate && endDate !== currentDate) {
      dateSet = true;
    }

    if (title !== '' && desc !== '' && cat !== '' && place !== '' && organiser !== '' && newpic !== null && dateSet) {
      this.props.submitForm(this.state);
      this.setState({
        title: '',
        desc: '',
        startDate: new Date().getTime(),
        endDate: new Date().getTime(),
        currentDate: new Date().getTime(),
        cat: '',
        subcats: [],
        place: '',
        lat: '',
        long: '',
        status: 'published',
        content_type: 'event',
        price: '',
        organiser: '',
        picture: '',
        error: false,
      });
    } else {
      this.setState({
        error: true,
      });
    }
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
      <Row>
        <Col xs={12} className="addForm">
          <h3>{t('events:add_new_event')}</h3>
          {
          this.state.error === true ?
            <Alert bsStyle="danger">
              <strong>{t('events:add_error')}</strong>
            </Alert>
          : null
        }

          <form onSubmit={this.onSubmit}>
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
                &nbsp;
              </Col>
              <Col sm={6}>
                <FormGroup controlId="image">
                  <ControlLabel>{t('events:image')}</ControlLabel>
                  <ImageUpload onChange={this.props.onUpload} currentPicture={this.state.picture} />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Button bsStyle="success" type="submit">
                {t('events:add_new_event')}
              </Button>
              {'   '}
              <Button bsStyle="warning" onClick={this.props.toggleForm}>
                {t('cancel')}
              </Button>
            </FormGroup>

          </form>
        </Col>
      </Row>
    );
  }
}
