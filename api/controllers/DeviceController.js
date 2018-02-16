export default {
  async activateDevice(req, res) {
    const params = req.allParams();
    if (!params.deviceid) {
      return res.status(400).json({ error: true, message: 'deviceid missing' });
    }
    if (req.user.type === 'anon') {
      return res.status(400).json({ error: true, message: 'user is anonymous' });
    }
    const newdevice = {
      deviceid: params.deviceid,
      user: req.user.user.id,
      active: true,
    };

    return Device.findOrCreate({ deviceid: params.deviceid }, newdevice)
    .exec(async (err, device, wasCreated) => {
      if (err) {
        return res.status(400).json({ err, error: true, message: 'activation failed' });
      }

      if (wasCreated) {
        await AnonUser.update({ deviceid: params.deviceid }, { active: false });
        return res.status(200).json(device);
      }
      try {
        const updated = await Device.update({ id: device.id }, { active: true }).fetch();
        await AnonUser.update({ deviceid: params.deviceid }, { active: false });
        return res.status(200).json(updated[0]);
      } catch (e) {
        return res.status(400).json({ e, error: true, message: 'device missing' });
      }
    });
  },

  async deactivateDevice(req, res) {
    const params = req.allParams();
    if (!params.deviceid) {
      return res.status(400).json({ error: true, message: 'deviceid missing' });
    }

    try {
      const updated = await Device.update({ deviceid: params.deviceid }, { active: false }).fetch();
      await AnonUser.update({ deviceid: params.deviceid }, { active: true });
      return res.status(200).json(updated[0]);
    } catch (e) {
      return res.status(400).json({ e, error: true, message: 'device missing' });
    }
  },
};
