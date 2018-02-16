import React, { Component } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { translate } from 'react-i18next';
import BooleanResult from './Blocks/BooleanResult';
import CheckBoxResult from './Blocks/CheckBoxResult';

const components = {
  bool: BooleanResult,
  checkbox: CheckBoxResult,
};

@translate(['voting'])
export default class VoteResults extends Component {

  render() {
    const { t } = this.props;
    return ([
      <Row key={1}>
        <Col xs={4}>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>{this.props.results.title}</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>{t('result_count')}</td>
                <td>{this.props.results.totalCount}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>,
      <Row key={2}>
        <Col xs={12}>
          <h4>{t('questions')}</h4>

          <Row>
            {
              this.props.results.questions.map((q) => {
                const Block = components[q.type];
                return (<Col key={q.id} xs={6}><Block block={q} /></Col>);
              })
            }
          </Row>
        </Col>
      </Row>,
    ]);
  }
}
