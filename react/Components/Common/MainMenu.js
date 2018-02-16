import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

@translate(['common'])
export default class MainMenu extends Component {
  renderModules = () => {
    const modules = this.props.modules.filter((module) => {
      if (this.props.userlevel >= module.userlevel) {
        return module;
      }
      return null;
    });

    return modules.map((module) => {
      return (
        <li key={module.title}><Link to={module.path}>{module.title}</Link></li>
      );
    });
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col sm={3} md={2} className="sidebar">
            <ul className="nav nav-sidebar">
              {this.renderModules()}
            </ul>
          </Col>
          <Col sm={9} smOffset={3} md={10} mdOffset={2} className="main">
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

