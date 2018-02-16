import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

@translate(['common'])
export default class AdminHeader extends Component {
  renderModules = () => {
    const modules = this.props.modules.filter((module) => {
      if (this.props.user.userlevel >= module.userlevel) {
        return module;
      }
      return null;
    });

    return modules.map((module) => {
      return (
        <LinkContainer to={module.path} key={module.title}><NavItem>{module.title}</NavItem></LinkContainer>
      );
    });
  }

  render() {
    const { t } = this.props;

    return (
      <Navbar fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/admin">Oulu Admin</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="topmenu">
            {this.renderModules()}
          </Nav>
          <Nav pullRight>
            <NavItem onClick={this.props.logout}>{t('logout')}</NavItem>
          </Nav>
          <Navbar.Text pullRight>
            {this.props.user.username}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>);
  }
}
