/**
 * UserController
 */
export default {

  /**
   * findUser
   */
  createAd: (req, res) => {
    const params = req.allParams();
    Advertisement.create(params).meta({ fetch: true })
    .then(ad => res.status(200).json(ad))
    .catch(e => res.status(400).json({ e, error: 'error_103', message: 'Unable to create Ad.' }));
  },

  getAd: (req, res) => {
    const params = req.allParams();

    Advertisement.findOne({ id: params.id }).meta({ fetch: true })
    .then(ad => res.status(200).json(ad))
    .catch(e => res.status(400).json({ e, error: 'error_103', message: 'Unable to find ad.' }));
  },

  updateAd: (req, res) => {
    const params = req.allParams();
    Advertisement.update({ id: params.id }, params).meta({ fetch: true })
    .then(ad => res.status(200).json(ad[0]))
    .catch(e => res.status(400).json({ e, error: 'error_103', message: 'Unable to modfiy ad.' }));
  },

  list: (req, res) => {
    const params = req.allParams();

    Advertisement.find(params)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
  },

};
