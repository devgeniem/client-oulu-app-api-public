import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { translate } from 'react-i18next';

@translate(['common'])
export default class ToolHeader extends Component {
  render() {
    const { t } = this.props;

    return (
      <Row>
        <Col xs={8}>
          <h2>{this.props.title}</h2>
        </Col>
        <Col xs={4}><br />
          <LinkContainer to="/admin">
            <Button bsClass="btn btn-info pull-right">{t('back')}</Button>
          </LinkContainer>
        </Col>
      </Row>
    );
  }

}
