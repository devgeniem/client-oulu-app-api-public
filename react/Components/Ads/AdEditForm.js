import React, { Component } from 'react';
import { Row, Col, FormGroup, Button, ControlLabel, FormControl, Checkbox, Alert, Radio } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { translate } from 'react-i18next';
import { DatePicker, ImageUpload } from '../../Components';

@translate(['common', 'ads'])
export default class AdEditForm extends Component {

  constructor(p) {
    super(p);

    this.state = {
      id: this.props.ad.id,
      desc: this.props.ad.desc,
      title: this.props.ad.title,
      publishDate: this.props.ad.publishDate,
      expireDate: this.props.ad.expireDate,
      picture: this.props.ad.picture,
      modifier: this.props.ad.modifier,
      advertiser: this.props.ad.advertiser,
      showDates: this.props.ad.showDates,
      link: this.props.ad.link,
      adtype: this.props.ad.adtype,
      error: false,
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.title !== '') {
      this.props.onSave(this.state);

      this.setState({
        error: false,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  }

  onFieldChange = (e) => {
    const target = e.target;

    this.setState({
      [target.name]: target.value,
    });
  }

  onDateChange = (date, field) => {
    this.setState({
      [field]: new Date(date).getTime(),
    });
  }

  onCheckboxChange = (e) => {
    // console.log(x.target.value);
    if (e.target.value) {
      this.setState({
        showDates: true,
      });
    } else {
      this.setState({
        showDates: false,
      });
    }
  }


  render() {
    const { t } = this.props;

    return (
      <Col sm={10}>
        <form onSubmit={this.onFormSubmit}>
          {
            this.state.error === true ?
              <Alert bsStyle="danger">
                <strong>{t('ads:fill_required_fields')}</strong>
              </Alert>
            : null
          }
          <Row>
            <Col sm={6}>
              <FormGroup controlId="title">
                <ControlLabel>{t('ads:title')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('ads:title')}
                  value={this.state.title}
                  name="title"
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="advertiser">
                <ControlLabel>{t('ads:advertiser')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('ads:advertiser')}
                  value={this.state.advertiser}
                  name="advertiser"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="desc">
                <ControlLabel>{t('ads:description')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('ads:description')}
                  value={this.state.desc}
                  name="desc"
                  componentClass="textarea"
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="link">
                <ControlLabel>{t('ads:link')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('ads:link')}
                  value={this.state.link}
                  name="link"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="adtype">
                <ControlLabel>{t('ads:adtype')}</ControlLabel>
                <br /><br />
                <Radio checked={this.state.adtype === 'sponsored'} onChange={this.onFieldChange} name="adtype" value="sponsored" inline>
                  {t('ads:sponsored')}
                </Radio>{' '}
                <Radio checked={this.state.adtype === 'announcement'} onChange={this.onFieldChange} name="adtype" value="announcement" inline>
                  {t('ads:announcement')}
                </Radio>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="start">
                <ControlLabel>{t('ads:publishdate')}</ControlLabel>
                <DatePicker fieldName="publishDate" current={this.state.publishDate} onChange={this.onDateChange} />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="end">
                <ControlLabel>{t('ads:expiredate')}</ControlLabel>
                <DatePicker fieldName="expireDate" current={this.state.expireDate} onChange={this.onDateChange} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="showDates">
                <Checkbox
                  checked={this.state.showDates === true}
                  onChange={this.onCheckboxChange}
                >
                  {t('ads:showDates')}
                </Checkbox>
              </FormGroup>
            </Col>
            <Col sm={6}>
              &nbsp;
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="title">
                <ControlLabel>{t('ads:picture')}</ControlLabel>
                <ImageUpload onChange={this.props.onUpload} currentPicture={this.state.picture} />
              </FormGroup>
            </Col>
            <Col sm={6}>
              &nbsp;
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <FormGroup>
                <Button bsStyle="success" type="submit">
                  {t('save')}
                </Button>
                {'   '}
                <LinkContainer to="/ads">
                  <Button bsStyle="warning">
                    {t('cancel')}
                  </Button>
                </LinkContainer>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </Col>);
  }
}
