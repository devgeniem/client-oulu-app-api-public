import React, { Component } from 'react';
import { Table, Pagination, Row, Col, Button } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { Link } from 'react-router';
import moment from 'moment';

function paginate(array, pageSize, pageNumber) {
  const pn = pageNumber - 1;
  return array.slice(pn * pageSize, (pn + 1) * pageSize);
}

@translate(['common', 'events'])
export default class EventList extends Component {
  constructor(props) {
    super(props);
    moment.locale('fi');

    this.state = {
      page: 1,
    };
  }
  renderList = () => {
    const events = paginate(this.props.events, this.props.limit, this.props.page);
    const { t } = this.props;

    return events.map((row) => {
      return (
        <tr key={row.id}>
          <td><Link to={`/events/edit/${row.id}`}>{row.title}</Link></td>
          <td>{moment(row.startDate).format('l')} - {moment(row.endDate).format('l')}</td>
          <td>{row.place}</td>
          <td>{t(`events:${row.status}`)}</td>
        </tr>
      );
    });
  };

  render() {
    const { t } = this.props;

    const items = Math.ceil(this.props.events.length / this.props.limit);
    return ([
      <Row key={1}>
        <Col xs={12}>
          <Table bordered hover striped key={1}>
            <thead>
              <tr>
                <th>{t('events:title')}</th>
                <th>{t('events:time')}</th>
                <th>{t('events:address')}</th>
                <th>{t('events:status')}</th>
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
            {t('events:add_new_event')}
          </Button>
        </Col>
        <Col xs={9}>
          <Pagination
            key={2}
            bsSize="medium"
            items={items}
            activePage={this.props.page}
            onSelect={this.props.changePage}
          />
        </Col>
      </Row>,
    ]);
  }
}
