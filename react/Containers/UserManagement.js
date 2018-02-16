import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AdminHeader, UserList, MainMenu, UserForm, UserMenu } from '../Components';
import UserActions from '../Redux/UserRedux';


const mapStateToProps = state => ({
  userlist: state.usermanagement.users,
  userfetch: state.usermanagement.fetching,
  created: state.usermanagement.created,
  error: state.usermanagement.error,
});

const mapDispatchToProps = dispatch => ({
  listusers: (token, params) => dispatch(UserActions.listRequest(token, params)),
  createNew: (token, user) => dispatch(UserActions.createUserRequest(token, user)),
  removeUser: (token, id) => dispatch(UserActions.removeUserRequest(token, id)),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'users'])
export default class UserManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      userlevel: 3,
      active: true,
      showadd: false,
    };
  }

  componentWillMount() {
    const params = {
      userlevel: this.state.userlevel,
      active: true,
    };

    this.props.listusers(this.props.token, params);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.created !== newProps.created && newProps.created === true) {
      this.props.listusers(this.props.token, this.state);
    }
  }

  changePage = (page) => {
    this.setState({
      page,
    });
  }

  toggleForm = () => {
    if (this.state.showadd) {
      this.setState({
        showadd: false,
      });
    } else {
      this.setState({
        showadd: true,
      });
    }
  }

  changeUserLevel = (event) => {
    const userlevel = parseInt(event.target.value, 10);

    this.setState({
      userlevel,
    });
    const params = {
      userlevel,
    };

    this.props.listusers(this.props.token, params);
  }

  createNewUser = (user) => {
    const userinfo = user;
    userinfo.id = this.props.params.id;
    this.props.createNew(this.props.token, userinfo);
  }

  removeUser = (id) => {
    this.props.removeUser(this.props.token, id);
  }

  renderUserList = () => {
    if (this.props.userfetch) {
      return (<span>Ladataan..</span>);
    }

    return (<UserList
      users={this.props.userlist}
      page={this.state.page}
      changePage={this.changePage}
      toggleForm={this.toggleForm}
      removeUser={this.removeUser}
      pageitems={10}
    />);
  }

  renderAddForm = () => {
    if (this.state.showadd) {
      return (<UserForm errorKey={this.props.error} toggleForm={this.toggleForm} submitForm={this.createNewUser} />);
    }

    return null;
  }

  render() {
    const { t } = this.props;
    return ([
      <AdminHeader modules={this.props.modules} user={this.props.user} logout={this.props.logout} key={1} />,
      <MainMenu modules={this.props.modules} userlevel={this.props.user.userlevel} key={2}>
        <Row>
          <Col xs={12} md={3} lg={2}>
            <h1>{t('users:title')}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={9} lg={10}>
            <UserMenu changeLevel={this.changeUserLevel} userlevel={this.state.userlevel} />
            {this.renderUserList()}
          </Col>
        </Row>
        <Row>
          {this.renderAddForm()}
        </Row>
      </MainMenu>,
    ]);
  }
}

