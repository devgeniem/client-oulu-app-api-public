import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AdminHeader, MainMenu, AdsList, AdAddForm, AdBlockDetect } from '../Components';
import AdAction from '../Redux/AdRedux';
import FileAction from '../Redux/FileRedux';

const mapStateToProps = state => ({
  fetching: state.ads.fetching,
  ads: state.ads.ads,
  newad: state.ads.newad,
  adding: state.ads.adding,
  uploading: state.file.uploading,
  url: state.file.url,
});

const mapDispatchToProps = dispatch => ({
  list: (token, params) => dispatch(AdAction.listAdsRequest(token, params)),
  add: (token, newad) => dispatch(AdAction.addAdRequest(token, newad)),
  uploadPicture: (token, uri, type) => dispatch(FileAction.upload(token, uri, type)),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'ads'])
export default class Ads extends Component {
  constructor(p) {
    super(p);

    this.state = {
      showadd: false,
      page: 1,
      picture: null,
    };
  }

  componentWillMount() {
    const params = {};
    this.props.list(this.props.token, params);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.adding === false && newProps.newad) {
      this.props.list(this.props.token, {});
    }

    if (this.props.url !== newProps.url) {
      this.setState({
        picture: newProps.url,
      });
    }
  }

  toggleAddForm = () => {
    if (this.state.showadd) {
      this.setState({
        showadd: false,
      });
    } else {
      this.setState({
        showadd: true,
      });
    }
  }
  changePage = (page) => {
    this.setState({
      page,
    });
  }
  formSubmit = (ad) => {
    const newad = ad;
    if (this.state.picture) {
      newad.picture = this.state.picture;
    }
    this.props.add(this.props.token, newad);
    this.setState({
      showadd: false,
    });
  }

  uploadPicture = (result, type) => {
    this.props.uploadPicture(this.props.token, result, type);
  }

  renderAddForm = () => {
    if (this.state.showadd) {
      return (<AdAddForm onUpload={this.uploadPicture} onSubmit={this.formSubmit} creator={this.props.user.id} toggleForm={this.toggleAddForm} />);
    }

    return null;
  }

  renderList = () => {
    if (!this.props.fetching) {
      return (
        <AdsList
          items={this.props.ads}
          toggleForm={this.toggleAddForm}
          changePage={this.changePage}
          limit={10}
          page={this.state.page}
        />
      );
    }

    return (<div>Ladataan...</div>);
  }

  render() {
    const { t } = this.props;

    return ([
      <AdminHeader modules={this.props.modules} user={this.props.user} logout={this.props.logout} key={1} />,
      <MainMenu modules={this.props.modules} userlevel={this.props.user.userlevel} key={2}>
        <Row>
          <Col xs={12} md={3} lg={2}>
            <h1>{t('ads:maintitle')}</h1>
          </Col>
          <Col xs={12}>
            <AdBlockDetect message={t('ads:remove_adblock')} />
            {this.renderList()}
          </Col>
        </Row>

        {this.renderAddForm()}
      </MainMenu>,
    ]);
  }
}
