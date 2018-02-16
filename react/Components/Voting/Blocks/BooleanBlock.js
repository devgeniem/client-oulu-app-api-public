import React, { Component } from 'react';
import { Row, Col, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import { translate } from 'react-i18next';

@translate('voting')
export default class BooleanBlock extends Component {
  constructor(p) {
    super(p);

    this.state = this.props.block;
    if (!this.state.data.trueText) {
      this.state.data = {
        trueText: '',
        falseText: '',
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

    this.setState({
      data: currentData,
    }, () => {
      this.props.onChange(this.state, this.props.arrayKey);
    });
  }


  render() {
    const { t } = this.props;
    const questionNumber = this.props.arrayKey + 1;

    return ([
      <Row key={1}>
        <Col xs={4}>
          <h4>{t('question')} {questionNumber}/{this.props.totalNumber}:</h4>
          <h5>{t('bool')}</h5>
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
          <FormGroup controlId="truetext">
            <ControlLabel>{t('positive')}</ControlLabel>
            <FormControl
              onChange={this.onFieldChange2}
              placeholder={t('positive')}
              value={this.state.data.trueText}
              name="trueText"
            />
          </FormGroup>
        </Col>
        <Col xs={4}>
          <FormGroup controlId="truetext">
            <ControlLabel>{t('negative')}</ControlLabel>
            <FormControl
              onChange={this.onFieldChange2}
              placeholder={t('negative')}
              value={this.state.data.falseText}
              name="falseText"
            />
          </FormGroup>
        </Col>
      </Row>,
    ]);
  }
}
