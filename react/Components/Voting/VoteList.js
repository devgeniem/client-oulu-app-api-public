import React, { Component } from 'react';
import { Table, Pagination, Row, Col, Button } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

function paginate(array, pageSize, pageNumber) {
  const pn = pageNumber - 1;
  return array.slice(pn * pageSize, (pn + 1) * pageSize);
}

@translate(['common', 'voting'])
export default class VoteList extends Component {

  constructor(p) {
    super(p);

    this.state = {
      page: 1,
      pageitems: 10,
    };
  }

  changePage = (page) => {
    this.setState({
      page,
    });
  }

  renderList = () => {
    const pagenatedItems = paginate(this.props.items, this.state.pageitems, this.state.page);
    const { t } = this.props;

    return pagenatedItems.map((item) => {
      return (
        <tr key={item.id}>
          <td>
            <Link to={`/voting/edit/${item.id}`}>{item.title}</Link>
          </td>
          <td>
            {item.active ? t('voting:active') : t('voting:inactive')}
          </td>
          <td>
            <LinkContainer to={`/voting/results/${item.id}`}>
              <Button
                bsStyle="info"
              >
                {t('voting:show_results')}
              </Button>
            </LinkContainer>
          </td>
          <td>
            {item.active === false ?
              <Button
                bsStyle="success"
                onClick={() => this.props.updateItem({ active: true, id: parseInt(item.id, 10) })}
              >
                {t('voting:activate')}
              </Button>
             :
              <Button
                bsStyle="warning"
                onClick={() => this.props.updateItem({ active: false, id: parseInt(item.id, 10) })}
              >
                {t('voting:remove')}
              </Button>
          }
          </td>
        </tr>);
    });
  };

  renderPagination = () => {
    if (this.props.items.length > this.state.pageitems) {
      const pages = Math.ceil(this.props.items.length / this.state.pageitems);
      return (
        <Pagination
          bsSize="medium"
          items={pages}
          activePage={this.state.page}
          onSelect={this.changePage}
        />

      );
    }
    return null;
  }

  render() {
    const { t } = this.props;
    return ([
      <Table bordered hover striped key={1}>
        <thead>
          <tr>
            <th>{t('voting:title')}</th>
            <th>{t('voting:status')}</th>
            <th>{t('voting:results')}</th>
            <th>{t('remove')}</th>
          </tr>
        </thead>
        <tbody>
          {this.renderList()}
        </tbody>
      </Table>,
      <Row key={2}>
        <Col sm={3}>
          <Button
            bsStyle="success"
            style={{ marginTop: '20px' }}
            onClick={this.props.toggleForm}
          >{t('voting:add_new')}</Button>
        </Col>
        <Col sm={9}>
          {this.renderPagination()}
        </Col>
      </Row>]
    );
  }
}
