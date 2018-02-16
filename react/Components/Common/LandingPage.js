import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Row, Col, Panel } from 'react-bootstrap';
import { Link } from 'react-router';

@translate(['common'])
export default class LandingPage extends Component {

  renderPanels = () => {
    const modules = this.props.modules.filter((module) => {
      if (this.props.userlevel >= module.userlevel) {
        return module;
      }
      return null;
    });

    return modules.map((module) => {
      return (
        <Col key={module.title} xs={4}>
          <Panel>
            <Link to={module.path}><h4>{module.title}</h4></Link>
            <p>{module.infotext}</p>
          </Panel>
        </Col>
      );
    });
  }

  render() {
    return (
    [
      <Row key={1}>
        <Col xs={12}>
          <h1>Oulu Admin</h1>
        </Col>
      </Row>,
      <Row key={2}>
        {this.renderPanels()}
      </Row>,
    ]
    );
  }

}
