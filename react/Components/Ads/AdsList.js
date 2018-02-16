import React, { Component } from 'react';
import { Row, Col, Button, Pagination, Table } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { Link } from 'react-router';
import moment from 'moment';

function paginate(array, pageSize, pageNumber) {
  const pn = pageNumber - 1;
  return array.slice(pn * pageSize, (pn + 1) * pageSize);
}

@translate(['common', 'ads'])
export default class AdsList extends Component {
  constructor(p) {
    super(p);

    moment.locale('fi');
  }

  renderList = () => {
    const events = paginate(this.props.items, this.props.limit, this.props.page);

    return events.map((row) => {
      return (
        <tr key={row.id}>
          <td>{row.advertiser}</td>
          <td><Link to={`/ads/edit/${row.id}`}>{row.title}</Link></td>
          <td>{moment(row.publishDate).format('l')} - {moment(row.expireDate).format('l')}</td>
        </tr>
      );
    });
  }

  render() {
    const { t } = this.props;
    const pages = Math.ceil(this.props.items.length / this.props.limit);

    return ([
      <Row key={1}>
        <Col xs={12}>
          <Table bordered hover striped key={1}>
            <thead>
              <tr>
                <th>{t('ads:advertiser')}</th>
                <th>{t('ads:title')}</th>
                <th>{t('ads:publishdate')} - {t('ads:expiredate')}</th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
            </tbody>
          </Table>
        </Col>
      </Row>,
      <Row key={2}>
        <Col xs={3}>
          <Button
            bsStyle="success"
            style={{ marginTop: '20px' }}
            onClick={this.props.toggleForm}
          >
            {t('add')}
          </Button>
        </Col>
        <Col xs={9}>
          <Pagination
            key={2}
            bsSize="medium"
            items={pages}
            activePage={this.props.page}
            onSelect={this.props.changePage}
          />
        </Col>
      </Row>,
    ]);
  }
}
