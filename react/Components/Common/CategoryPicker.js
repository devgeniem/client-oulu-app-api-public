import React, { Component } from 'react';
import { Row, Col, FormGroup, ControlLabel, Radio, Checkbox } from 'react-bootstrap';
import { translate } from 'react-i18next';

@translate(['common', 'events'])
export default class CategoryPicker extends Component {
  constructor(p) {
    super(p);

    this.state = {
      selectedvalues: this.props.subcategories,
    };
  }

  componentWillMount() {
    if (this.state.selectedvalues) {
      this.selectedCats = new Set(this.state.selectedvalues);
    } else {
      this.selectedCats = new Set();
    }
  }

  onCatSelect = (e) => {
    if (this.selectedCats.has(e.target.value)) {
      this.selectedCats.delete(e.target.value);
    } else {
      this.selectedCats.add(e.target.value);
    }

    const array = [...this.selectedCats];

    this.setState({
      selectedvalues: array,
    });

    this.props.onChange(array, false);
  }

  onSelect = (e) => {
    this.props.onChange(e.target.value, true);
  }

  render() {
    const { t } = this.props;
    return (
      <Row>
        <Col xs={6}>
          <ControlLabel>{t('events:maincategories')}</ControlLabel>
          <FormGroup controlId="categories">
            <Radio name="category" value="musiikki" checked={this.props.category === 'musiikki'} onChange={this.onSelect}>
              Musiikki
            </Radio>
            {' '}
            <Radio name="category" value="urheilu" checked={this.props.category === 'urheilu'} onChange={this.onSelect}>
              Urheilu
            </Radio>
            {' '}
            <Radio name="category" value="kulttuuri" checked={this.props.category === 'kulttuuri'} onChange={this.onSelect}>
              Kulttuuri
            </Radio>
          </FormGroup>
        </Col>
        <Col xs={6}>
          <ControlLabel>{t('events:subcategories')}</ControlLabel>
          <FormGroup controlId="categories">
            <Checkbox value="esteeton" checked={this.selectedCats.has('esteeton')} onChange={this.onCatSelect}>
              Esteetön kulku
            </Checkbox>
            <Checkbox value="anniskelu" checked={this.selectedCats.has('anniskelu')} onChange={this.onCatSelect}>
              Anniskelualue
            </Checkbox>
            <Checkbox value="perheille" checked={this.selectedCats.has('perheille')} onChange={this.onCatSelect}>
              Suunnattu perheille
            </Checkbox>
            <Checkbox value="ulkona" checked={this.selectedCats.has('ulkona')} onChange={this.onCatSelect}>
              Tapahtuu ulkona
            </Checkbox>
            <Checkbox value="ilmainen" checked={this.selectedCats.has('ilmainen')} onChange={this.onCatSelect}>
              Ilmainen sisäänpääsy
            </Checkbox>
            <Checkbox value="ikarajaton" checked={this.selectedCats.has('ikarajaton')} onChange={this.onCatSelect}>
              Ikärajaton sisäänpääsy
            </Checkbox>

          </FormGroup>
        </Col>
      </Row>
    );
  }
}
