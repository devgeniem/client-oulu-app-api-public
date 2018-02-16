import React, { Component } from 'react';
import { Table, Pagination, Button, Row, Col, Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { Link } from 'react-router';

function paginate(array, pageSize, pageNumber) {
  const pn = pageNumber - 1;
  return array.slice(pn * pageSize, (pn + 1) * pageSize);
}

@translate(['common', 'users'])
export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      id: null,
    };
  }

  removeUser = () => {
    this.props.removeUser(this.state.id);
    this.closeModal();
  }

  showModal = (id) => {
    this.setState({
      showModal: true,
      id,
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      id: null,
    });
  }

  renderUsers = () => {
    const users = paginate(this.props.users, this.props.pageitems, this.props.page);
    const { t } = this.props;

    return users.map((user) => {
      return (
        <tr key={user.id}>
          <td><Link to={`/users/edit/${user.id}`}>{user.id}</Link></td>
          <td><Link to={`/users/edit/${user.id}`}>{user.username}</Link></td>
          <td>{user.email}</td>
          <td>{user.userlevel}</td>
          <td><Button bsStyle="warning" onClick={() => this.showModal(user.id)}>{t('remove')}</Button></td>
        </tr>
      );
    });
  }

  renderPagination = () => {
    if (this.props.users.length > this.props.pageitems) {
      const pages = Math.ceil(this.props.users.length / this.props.pageitems);
      return (
        <Pagination
          bsSize="medium"
          items={pages}
          activePage={this.props.page}
          onSelect={this.props.changePage}
        />

      );
    }
    return null;
  }

  render() {
    const { t } = this.props;

    return (
    [<Table bordered hover striped key={1}>
      <thead>
        <tr>
          <th>{t('users:id')}</th>
          <th>{t('username')}</th>
          <th>{t('users:email')}</th>
          <th>{t('users:userlevel')}</th>
          <th>{t('remove')}</th>
        </tr>
      </thead>
      <tbody>
        {this.renderUsers()}
      </tbody>
    </Table>,
      <Row key={2}>
        <Col sm={3}>
          <Button
            bsStyle="success"
            style={{ marginTop: '20px' }}
            onClick={this.props.toggleForm}
          >{t('users:add_new_user')}</Button>
        </Col>
        <Col sm={9}>
          {this.renderPagination()}
        </Col>
      </Row>,
      <Modal key={3} show={this.state.showModal} onHide={this.closeModal}>
        <Modal.Header>
          <Modal.Title>{t('users:remove_confirm')}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button bsStyle="warning" onClick={this.removeUser}>{t('remove')}</Button>
          <Button onClick={this.closeModal}>{t('cancel')}</Button>
        </Modal.Footer>
      </Modal>,
    ]
    );
  }
}
