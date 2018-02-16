import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { translate } from 'react-i18next';

@translate(['common', 'stats'])
export default class Users extends Component {
  render() {
    const { t, userStats } = this.props;
    return (
      <Col xs={12}>
        <h4>{t('stats:usercount')}</h4>
        Rekisteröityjen käyttäjien määrä: { userStats.registeredCount }<br />
        Anonyymien käyttäjien määrä: { userStats.anonymousCount } <br /><br />
        <button onClick={this.props.close}>{t('back')}</button>
      </Col>
    );
  }
}
