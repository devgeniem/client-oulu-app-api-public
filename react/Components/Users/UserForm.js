import React, { Component } from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, Radio, Button, Alert } from 'react-bootstrap';
import { translate } from 'react-i18next';

@translate(['common', 'users'])
export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      userlevel: '',
      password1: '',
      password2: '',
      error: false,
      password_error: false,
    };
  }

  onFieldChange = (e) => {
    const element = e.target;

    this.setState({
      [element.name]: element.value,
    });
  }

  onRadioChange = (e) => {
    const userlevel = parseInt(e.target.value, 10);

    this.setState({
      [e.target.name]: userlevel,
    });
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const user = this.state;
    user.password = this.state.password1;

    if (user.username !== '' && user.userlevel !== '' && user.email !== '' && user.password !== '') {
      this.props.submitForm(this.state);
      this.setState({
        error: false,
        username: '',
        email: '',
        userlevel: '',
        password1: '',
        password2: '',
      });
    } else {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const { t } = this.props;
    return (
      <Col xs={10} className="addForm">
        <h3>{t('users:add_new_user')}</h3>

        {
          this.state.error === true ?
            <Alert bsStyle="danger">
              <strong>{t('users:fill_required_fields')}</strong>
            </Alert>
          : null
        }

        {
          this.props.errorKey ?
            <Alert bsStyle="danger">
              <strong>{t(this.props.errorKey.error)}</strong>
            </Alert>
          : null
        }

        <form onSubmit={this.onFormSubmit}>

          <Row>
            <Col sm={6}>
              <FormGroup controlId="username">
                <ControlLabel>{t('username')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('username')}
                  value={this.state.username}
                  name="username"
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="email">
                <ControlLabel>{t('users:email')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('users:email')}
                  value={this.state.email}
                  name="email"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup controlId="password1">
                <ControlLabel>{t('users:password')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('users:password')}
                  value={this.state.password1}
                  type="password"
                  name="password1"
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup controlId="password2">
                <ControlLabel>{t('users:password_again')}</ControlLabel>
                <FormControl
                  onChange={this.onFieldChange}
                  placeholder={t('users:password_again')}
                  value={this.state.password2}
                  type="password"
                  name="password2"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <ControlLabel>{t('users:userlevel')}</ControlLabel>
                <br />
                <div className="radio-control">
                  <Radio
                    checked={this.state.userlevel === 3}
                    name="userlevel"
                    onChange={this.onRadioChange}
                    value={3}
                  >
                    {t('users:userlevel_3')}
                  </Radio>
                  {' '}
                  <Radio
                    checked={this.state.userlevel === 2}
                    name="userlevel"
                    onChange={this.onRadioChange}
                    value={2}
                  >
                    {t('users:userlevel_2')}
                  </Radio>
                  {' '}
                  <Radio
                    checked={this.state.userlevel === 1}
                    name="userlevel"
                    onChange={this.onRadioChange}
                    value={1}
                  >
                    {t('users:userlevel_1')}
                  </Radio>
                </div>
              </FormGroup>
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
    );
  }
}
