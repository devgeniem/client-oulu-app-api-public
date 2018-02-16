import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import LoginActions from '../Redux/LoginRedux';

const mapStateToProps = state => ({
  user: state.login.user,
  token: state.login.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(LoginActions.logout()),
});

@translate()
@connect(mapStateToProps, mapDispatchToProps)
export default class Main extends Component {

  componentWillReceiveProps(newprops) {
    if (newprops.user === null && this.props.user !== null) {
      window.location.replace('/');
    }
  }

  render() {
    const { t } = this.props;
    const modules = [
      {
        title: t('users'),
        path: '/users',
        userlevel: 3,
        infotext: '',
      },
      {
        title: t('events'),
        path: '/events',
        userlevel: 2,
        infotext: '',
      },
      {
        title: t('voting'),
        path: '/voting',
        userlevel: 3,
        infotext: 'Luo uusi äänestyksiä ja tarkastele äänestyksien tuloksia.',
      },
      {
        title: t('ads'),
        path: '/ads',
        userlevel: 3,
        infotext: '',
      },
      {
        title: t('stats'),
        path: '/stats',
        userlevel: 3,
        infotext: '',
      },
    ];

    return (
      <div>
        {React.cloneElement(this.props.children, { ...this.props, modules })}
      </div>
    );
  }
}
