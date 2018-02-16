import React, { Component } from 'react';
import { Row, Col, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { translate } from 'react-i18next';

@translate('voting')
export default class CheckBoxBlock extends Component {
  constructor(p) {
    super(p);
    this.state = this.props.block;
    if (!this.state.data.value1) {
      this.state.data = {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
      };
    }
  }

  onFieldChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      this.props.onChange(this.state, this.props.arrayKey);
    });
  }

  onFieldChange2 = (e) => {
    const currentData = this.state.data;
    currentData[e.target.name] = e.target.value;
    // console.log('x', e.target.name);

    this.setState({
      data: currentData,
    }, () => {
      this.props.onChange(this.state, this.props.arrayKey);
    });
  }

  render() {
    const { t } = this.props;
    const questionNumber = this.props.arrayKey + 1;

    return (
    [<Row key={1}>
      <Col xs={4}>
        <h4>{t('question')} {questionNumber}/{this.props.totalNumber}:</h4>
        <h5>{t('checkbox')}</h5>
        <FormGroup controlId="title">
          <ControlLabel>{t('question')}</ControlLabel>
          <FormControl
            onChange={this.onFieldChange}
            placeholder={t('question')}
            value={this.state.title}
            name="title"
          />
        </FormGroup>
      </Col>
    </Row>,
      <Row key={2}>
        <Col xs={4}>
          <FormGroup controlId="value1">
            <ControlLabel>{t('option')} 1.</ControlLabel>
            <FormControl
              onChange={this.onFieldChange2}
              placeholder={t('option')}
              value={this.state.data.value1}
              name="value1"
            />
          </FormGroup>
        </Col>
        <Col xs={4}>
          <FormGroup controlId="value">
            <ControlLabel>{t('option')} 2.</ControlLabel>
            <FormControl
              onChange={this.onFieldChange2}
              placeholder={t('option')}
              value={this.state.data.value2}
              name="value2"
            />
          </FormGroup>
        </Col>
        <Col xs={4}>
          <FormGroup controlId="value">
            <ControlLabel>{t('option')} 3.</ControlLabel>
            <FormControl
              onChange={this.onFieldChange2}
              placeholder={t('option')}
              value={this.state.data.value3}
              name="value3"
            />
          </FormGroup>
        </Col>
        <Col xs={4}>
          <FormGroup controlId="value">
            <ControlLabel>{t('option')} 4.</ControlLabel>
            <FormControl
              onChange={this.onFieldChange2}
              placeholder={t('option')}
              value={this.state.data.value4}
              name="value4"
            />
          </FormGroup>
        </Col>
        <Col xs={4}>
          <FormGroup controlId="value">
            <ControlLabel>{t('option')} 5.</ControlLabel>
            <FormControl
              onChange={this.onFieldChange2}
              placeholder={t('option')}
              value={this.state.data.value5}
              name="value5"
            />
          </FormGroup>
        </Col>
        <Col xs={4}>
          <FormGroup controlId="value">
            <ControlLabel>{t('option')} 6.</ControlLabel>
            <FormControl
              onChange={this.onFieldChange2}
              placeholder={t('option')}
              value={this.state.data.value6}
              name="value6"
            />
          </FormGroup>
        </Col>
      </Row>,
    ]);
  }
}
