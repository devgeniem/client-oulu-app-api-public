const moment = require('moment-timezone');
const loopResults = (events, message, ttl) => {
  events.forEach((event) => {
    const info = {};
    const starttime = moment(event.startDate).tz("Europe/Helsinki").format('HH:mm');
    info.body = `${message} ${starttime}.`;
    info.title = event.title;
    info.id = event.id;

    event.anonparticipants.forEach((anon) => {
      sails.log('AnonNotification', anon.device);
      if (anon.active === true && anon.allowNotifications === true && anon.deviceid !== '') {
        sails.helpers.sendNotification({
          device: anon.deviceid,
          body: info.body,
          title: info.title,
          eventID: info.id,
          ttl,
        })
        .exec((err) => {
          if (err) {
            sails.log.error('NotificationError', err);
          }
        });
      }
    });
    event.participants.forEach((participant) => {
      sails.log('Participants', participant.id);

      if (participant.allowNotifications === true && participant.active === true) {
        sails.helpers.findUser({ userId: participant.id })
        .exec((err, user) => {
          if (err) {
            sails.log.error('NotificationError', err);
          } else {
            user.devices.forEach((device) => {
              if (device.active === true && device.deviceid !== '') {
                sails.helpers.sendNotification({
                  device: device.deviceid,
                  body: info.body,
                  title: info.title,
                  eventID: info.id,
                  ttl,
                })
                .exec((error) => {
                  if (error) {
                    sails.log.error('NotificationError', error);
                  }
                });
              }
            });
          }
        });
      }
    });
  });
};


module.exports.cron = {

  findEvents: {
    schedule: '0 */10 * * * *',
    onTick: async () => {
      const timenow = new Date().getTime();

      // Notifications for events starting in 3 hours
      const threehours = (timenow + (3 * 3600000)) - 1000;
      const tenminutes = threehours + 600000;

      sails.log('alkuaika', new Date(threehours));
      sails.log('loppuaika', new Date(tenminutes));
      const searchparams = {
        where: {},
      };
      searchparams.where.startDate = { '>=': new Date(threehours), '<=': new Date(tenminutes) };
      searchparams.where.status = 'published';
      try {
        const result = await Event.find(searchparams)
        .populate('participants')
        .populate('anonparticipants');

        if (result.length > 0) {
          loopResults(result, 'Tapahtuma alkaa kello', 10800);
        }

        sails.log('tapahtumat', result);
      } catch (e) {
        sails.log.error('cron error', e);
      }

      // Notifications for events starting in 24 hours

      const day = (timenow + (24 * 3600000)) - 1000;
      const tenminutes2 = day + 600000;

      sails.log('24h alkuaika', new Date(day));
      sails.log('24h loppuaika', new Date(tenminutes2));
      const searchparams2 = {
        where: {},
      };
      searchparams2.where.startDate = { '>=': new Date(day), '<=': new Date(tenminutes2) };
      searchparams.where.status = 'published';
      try {
        const result = await Event.find(searchparams2)
        .populate('participants')
        .populate('anonparticipants');
        if (result.length > 0) {
          loopResults(result, 'Tapahtuma alkaa huomenna kello', 86400);
        }

        sails.log('24h tapahtumat', result);
      } catch (e) {
        sails.log.error('cron error', e);
      }
    },
  },

};
