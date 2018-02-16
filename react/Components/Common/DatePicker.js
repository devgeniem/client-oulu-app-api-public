import React, { Component } from 'react';
import { DateTimePicker } from 'react-widgets';
import momentLocalizer from 'react-widgets-moment';
import Moment from 'moment';
import { Row, Col } from 'react-bootstrap';
import { translate } from 'react-i18next';

@translate(['common'])
export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    Moment.locale('fi');
    momentLocalizer();

    this.state = {
      date: this.props.current ? new Date(this.props.current) : new Date(),
      time: this.props.current ? new Date(this.props.current) : new Date(),
    };
  }

  setDate = (value) => {
    this.setState({
      date: value,
    });
    this.changeDate(value, this.state.time);
  }

  setTime = (value) => {
    this.setState({
      time: value,
    });
    this.changeDate(this.state.date, value);
  }

  changeDate = (date, time) => {
    const timestring = `${new Date(time).getHours()}:${new Date(time).getMinutes()}:00`;
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth() + 1;
    const day = new Date(date).getDate();

    const datetime = `${year}-${month}-${day} ${timestring}`;

    this.props.onChange(new Date(datetime), this.props.fieldName);
  }

  render() {
    const { t } = this.props;

    return (
      <Row>
        <Col xs={6}>
          <DateTimePicker
            key={1}
            value={this.state.date}
            time={false}
            messages={{
              dateButton: `${t('choose')} ${t('date')}`,
            }}
            placeholder={t('date')}
            onChange={value => this.setDate(value)}
            views={['month', 'year']}
            min={new Date()}
          />
        </Col>
        <Col xs={6}>
          <DateTimePicker
            key={2}
            date={false}
            value={this.state.time}
            messages={{
              timeButton: `${t('choose')} ${t('time')}`,
            }}
            placeholder={t('time')}
            step={10}
            onChange={value => this.setTime(value)}
          />
        </Col>
      </Row>
    );
  }
}
