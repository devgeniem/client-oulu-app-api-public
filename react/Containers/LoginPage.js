import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import LoginActions from '../Redux/LoginRedux';

const mapStateToProps = state => ({
  fetching: state.login.fetching,
  user: state.login.user,
  error: state.login.error,
});

const mapDispatchToProps = dispatch => ({
  loginRequest: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
  clearLoginError: () => dispatch(LoginActions.clearLoginError()),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common'])
export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      error: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.fetching && newProps.user !== null) {
      if (this.props.location.state && this.props.location.state.nextPathname) {
        window.location.replace(this.props.location.state.nextPathname);
      } else {
        window.location.replace('/admin');
      }
    } else if (!newProps.fetching && newProps.error !== null) {
      this.setState({
        error: true,
      });
    }
  }

  onFormSubmit(e) {
    const { username, password } = this.state;
    e.preventDefault();

    if (username && password) {
      this.props.loginRequest(username, password);
    } else {
      console.log('dont send form');
    }
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  render() {
    const { t } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={6} md={4} />
          <Col xs={6} md={4}>
            <h1>{t('login')}</h1>
          </Col>
          <Col xs={6} md={4} />
        </Row>
        <Row>
          <Col xs={6} md={3} />
          <Col xs={6} md={5}>
            {
              this.state.error ?
                <Alert bsStyle="danger">{t('error_001')}</Alert>
              :
              null
            }
            <Form horizontal onSubmit={this.onFormSubmit}>
              <FormGroup controlId="formHorizontalUsername">
                <Col sm={4} componentClass={ControlLabel}>
                  {t('username')}
                </Col>
                <Col sm={8}>
                  <FormControl onChange={this.onInputChange} name="username" type="username" placeholder={t('username')} />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalPassword">
                <Col sm={4} componentClass={ControlLabel}>
                  {t('password')}
                </Col>
                <Col sm={8}>
                  <FormControl onChange={this.onInputChange} name="password" type="password" placeholder={t('password')} />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    {t('login')}
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Col xs={6} md={4} />
        </Row>
      </Grid>
    );
  }
}
