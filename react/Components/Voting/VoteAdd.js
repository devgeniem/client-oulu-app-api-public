import React, { Component } from 'react';
import { Col, Row, Button, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { translate } from 'react-i18next';

@translate(['common', 'voting'])
export default class VoteAdd extends Component {
  constructor(p) {
    super(p);

    this.state = {
      title: '',
      error: false,
    };
  }

  onFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.title !== '') {
      this.props.onSubmit(this.state);
    } else {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const { t } = this.props;

    return ([
      <Row key={1}>
        <Col xs={10} className="addForm">
          <form onSubmit={this.onFormSubmit}>
            <h3>{t('voting:add_new')}</h3>
            {
              this.state.error === true ?
                <Alert bsStyle="danger">
                  <strong>{t('users:fill_required_fields')}</strong>
                </Alert>
              : null
            }
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
                &nbsp;
              </Col>
            </Row>
            <FormGroup>
              <Button bsStyle="success" type="submit">
                {t('add')}
              </Button>
              {'   '}
              <Button bsStyle="warning" onClick={this.props.toggleForm}>
                {t('cancel')}
              </Button>
            </FormGroup>
          </form>
        </Col>
      </Row>,
    ]
    );
  }

}
