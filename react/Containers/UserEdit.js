import React, { Component } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AdminHeader, MainMenu, UserEditForm } from '../Components';
import UserActions from '../Redux/UserRedux';

const mapStateToProps = state => ({
  selecteduser: state.usermanagement.user,
  fetching: state.usermanagement.fetching,
  error: state.usermanagement.error,
  saveSuccess: state.usermanagement.saved,
});

const mapDispatchToProps = dispatch => ({
  getInfo: (token, id) => dispatch(UserActions.getInfoRequest(token, id)),
  saveInfo: (token, user) => dispatch(UserActions.saveInfoRequest(token, user)),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'users'])
export default class UserEdit extends Component {

  componentWillMount() {
    this.props.getInfo(this.props.token, this.props.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.saveSuccess !== newProps.saveSuccess && newProps.saveSuccess === true) {
      this.props.router.push('/users');
    }
  }

  saveUserInfo = (user) => {
    const userinfo = user;
    userinfo.id = this.props.params.id;
    this.props.saveInfo(this.props.token, userinfo);
  }

  renderMessage = () => {
    const { error, t } = this.props;
    if (error) {
      return (
        <Alert bsStyle="danger">
          <strong>{t(error.error)}</strong>
        </Alert>);
    }

    return null;
  }

  renderForm = () => {
    if (this.props.selecteduser !== null) {
      return (
        <UserEditForm key={this.props.selecteduser.id} submitForm={this.saveUserInfo} user={this.props.selecteduser} />
      );
    }

    return null;
  }

  render() {
    const { t } = this.props;

    return ([
      <AdminHeader modules={this.props.modules} user={this.props.user} logout={this.props.logout} key={1} />,
      <MainMenu modules={this.props.modules} userlevel={this.props.user.userlevel} key={2}>
        <Row>
          <Col xs={12}>
            <h3>{t('users:edit_user')}</h3>
            {this.renderMessage()}
            {this.renderForm()}
          </Col>
        </Row>
      </MainMenu>,
    ]
    );
  }
}
