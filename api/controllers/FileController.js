import ImageUploader from '../services/ImageUploader';

export default {
  uploadImage: (req, res) => {
    function onGoodImageProcess(resp) {
      res.status(200).json({
        status: 'success',
        uri: resp,
      });
    }

    function onBadImageProcess() {
      res.status(401).json({
        status: 'error',
      });
    }
    // eslint-disable-next-line
    const image = ImageUploader({
      data_uri: req.body.data_uri,
      filename: req.body.filename,
      filetype: req.body.filetype,
    }).then(onGoodImageProcess, onBadImageProcess);
  },
};
