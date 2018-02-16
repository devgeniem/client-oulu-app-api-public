import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { AdminHeader, MainMenu, AdEditForm, AdBlockDetect } from '../Components';
import AdAction from '../Redux/AdRedux';
import FileAction from '../Redux/FileRedux';

const mapStateToProps = state => ({
  fetching: state.ads.fetching,
  ad: state.ads.ad,
  uploading: state.file.uploading,
  url: state.file.url,
});

const mapDispatchToProps = dispatch => ({
  getAd: (token, id) => dispatch(AdAction.getAdRequest(token, id)),
  saveAd: (token, ad) => dispatch(AdAction.saveAdRequest(token, ad)),
  uploadPicture: (token, uri, type) => dispatch(FileAction.upload(token, uri, type)),
});


@connect(mapStateToProps, mapDispatchToProps)
@translate(['common', 'ads'])
export default class AdsEdit extends Component {
  constructor(p) {
    super(p);

    this.state = {
      url: null,
    };
  }

  componentWillMount() {
    this.props.getAd(this.props.token, this.props.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.url !== newProps.url) {
      this.setState({
        newpic: newProps.url,
      });
    }
  }

  onSave = (modified) => {
    const adobject = modified;
    if (this.state.newpic) {
      adobject.picture = this.state.newpic;
    }

    this.props.saveAd(this.props.token, adobject);
  }

  uploadPicture = (result, type) => {
    this.props.uploadPicture(this.props.token, result, type);
  }

  renderForm = () => {
    const { t } = this.props;
    if (!this.props.fetching && this.props.ad) {
      const ad = this.props.ad;
      ad.modifier = this.props.user.id;

      return ([
        <h3 key={1}>{t('ads:edit_ad')}</h3>,
        <AdEditForm key={2} ad={ad} onSave={this.onSave} onUpload={this.uploadPicture} />,
      ]);
    }
    return (<div>{t('common:loading')}</div>);
  }

  render() {
    const { t } = this.props;

    return ([
      <AdminHeader modules={this.props.modules} user={this.props.user} logout={this.props.logout} key={1} />,
      <MainMenu modules={this.props.modules} userlevel={this.props.user.userlevel} key={2}>
        <AdBlockDetect message={t('ads:remove_adblock')} />
        {this.renderForm()}
      </MainMenu>,
    ]);
  }
}
