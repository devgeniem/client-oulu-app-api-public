import React, { Component } from 'react';
import { FormControl, Row, Col, Image } from 'react-bootstrap';


export default class ImageUpload extends Component {
  constructor(p) {
    super(p);

    this.state = {
      url: this.props.currentPicture,
      data: '',
      size: null,
      type: null,
    };
  }

  handleFile = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      if (upload.total < 5000000 && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) {
        this.props.onChange(upload.target.result, file.type);
        this.setState({
          size: upload.total,
          type: file.type,
          data: upload.target.result,
        });
      } else {
        this.setState({
          size: upload.total,
          type: file.type,
        });
      }
    };

    reader.readAsDataURL(file);
  }

  renderPicture = () => {
    if (this.state.data) {
      return (
        <Col>
          <Image src={this.state.data} responsive />
          <br /><br />
        </Col>
      );
    }
    if (this.state.url) {
      return (
        <Col>
          <Image src={this.state.url} responsive />
          <br /><br />
        </Col>
      );
    }

    return null;
  }

  render() {
    return (
      <Row>
        {this.renderPicture()}
        <Col xs={12}>
          <FormControl
            onChange={this.handleFile}
            name="asa"
            type="file"
          />
        </Col>
      </Row>
    );
  }
}

