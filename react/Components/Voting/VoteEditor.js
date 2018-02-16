import React, { Component } from 'react';
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import { translate } from 'react-i18next';
import uuid from 'uuid';
import BooleanBlock from './Blocks/BooleanBlock';
import ChecBoxBlock from './Blocks/CheckBoxBlock';

const components = {
  bool: BooleanBlock,
  checkbox: ChecBoxBlock,
};

@translate('common', 'voting')
export default class VoteEditor extends Component {
  constructor(p) {
    super(p);

    this.state = {
      blocks: this.props.blocks ? this.props.blocks : [],
    };
  }

  onChange = (blocks) => {
    this.props.onChange(blocks);
  }

  addBlock = (type) => {
    const newBlock = {
      type,
      id: uuid.v4(),
      data: {},
      title: '',
    };

    const blocks = this.state.blocks;
    blocks.push(newBlock);

    this.onChange(blocks);

    this.setState({
      blocks,
    });
  }

  moveBlock = () => {

  }

  removeBlock = (id) => {
    const blocks = this.state.blocks.filter((block) => {
      if (block.id !== id) {
        return block;
      }
      return null;
    });

    this.onChange(blocks);

    this.setState({
      blocks,
    });
  }

  saveBlockChange = (block, key) => {
    const blocks = this.state.blocks;
    blocks[key] = block;

    this.onChange(blocks);
  }

  renderBlocks = () => {
    const { t } = this.props;

    return this.state.blocks.map((block, key) => {
      const Block = components[block.type];
      return (
        <Col sm={12} key={block.id} className="voteblock">
          <Block block={block} totalNumber={this.state.blocks.length} arrayKey={key} onChange={this.saveBlockChange} />
          <Button bsStyle="danger" onClick={() => this.removeBlock(block.id)}>{t('remove')}</Button>
        </Col>
      );
    });
  }

  render() {
    const { t } = this.props;

    return ([
      <Row key={1}>
        <Col sm={12}>
          <ButtonToolbar>
            <Button bsStyle="primary" onClick={() => { this.addBlock('checkbox'); }}>{t('voting:add_new_block')}</Button>
          </ButtonToolbar>
        </Col>
      </Row>,
      <Row key={2}>
        {this.renderBlocks()}
      </Row>,
    ]);
  }
}
