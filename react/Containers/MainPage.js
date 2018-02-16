import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { AdminHeader, MainMenu, LandingPage } from '../Components';

@translate()
export default class MainPage extends Component {

  render() {
    return ([
      <AdminHeader modules={this.props.modules} user={this.props.user} logout={this.props.logout} key={1} />,
      <MainMenu modules={this.props.modules} userlevel={this.props.user.userlevel} key={2}>
        <LandingPage modules={this.props.modules} userlevel={this.props.user.userlevel} />
      </MainMenu>,
    ]);
  }

}
