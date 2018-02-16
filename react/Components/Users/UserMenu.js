import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { translate } from 'react-i18next';

@translate(['common', 'users'])
export default class UserMenu extends Component {
  render() {
    const { t } = this.props;

    return ([
      <Button
        active={this.props.userlevel === 3 ? true : null}
        bsSize="large"
        onClick={this.props.changeLevel}
        value={3}
        key={1}
      >
        {t('users:userlevel_3_plur')}
      </Button>,
      <Button
        active={this.props.userlevel === 2 ? true : null}
        bsSize="large"
        onClick={this.props.changeLevel}
        value={2}
        key={1}
      >
        {t('users:userlevel_2_plur')}
      </Button>,
      <Button
        active={this.props.userlevel === 1 ? true : null}
        bsSize="large"
        onClick={this.props.changeLevel}
        value={1}
        key={3}
      >
        {t('users:userlevel_1_plur')}
      </Button>,
    ]);
  }
}
