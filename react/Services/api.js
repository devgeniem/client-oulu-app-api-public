// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// our "constructor"
const create = (baseURL = '/api/') => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  /* API Calls for user */
  const login = (username, password) => api.post('login', { username, password });
  const listUsers = (token, params) => {
    const userlevel = params.userlevel;
    const active = params.active;
    return api.get('user', { userlevel, active }, { headers: { Authorization: `Bearer ${token}` } });
  };
  const getUser = (token, id) => api.get(`user/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  const removeUser = (token, id) => api.delete(`user/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  const saveUser = (token, user) => {
    return api.post(
      `user/${user.id}`,
      {
        username: user.username,
        email: user.email,
        userlevel: user.userlevel,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  };
  const createUser = (token, user) => {
    return api.post(
      'user',
      {
        username: user.username,
        password: user.password,
        email: user.email,
        userlevel: user.userlevel,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  const listEvents = (token, params) => {
    return api.get('event', { listOld: true, limit: 99999, status: params.status }, { headers: { Authorization: `Bearer ${token}` } });
  };
  const createEvent = (token, event) => {
    return api.post(
      'event',
      event,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  };
  const getEvent = (token, id) => api.get(`event/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  const saveEvent = (token, event) => {
    return api.post(
      `event/${event.id}`,
      event,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  const uploadFile = (token, uri, type) => {
    return api.post('imageupload',
      { data_uri: uri, filename: 'temp', filetype: type },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  };

  const listAds = (token, params) => {
    return api.get('ad', params, { headers: { Authorization: `Bearer ${token}` } });
  };
  const createAd = (token, newad) => {
    return api.post(
      'ad',
      newad,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  };
  const getAd = (token, id) => api.get(`ad/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  const saveAd = (token, ad) => {
    return api.post(
      `ad/${ad.id}`,
      ad,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  };
  const listVotes = () => {
    return api.get(
      'voting',
      {
        listAll: true,
      },
    );
  };
  const createVote = (token, vote) => {
    return api.post(
      'voting',
      vote,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  };
  const getVote = (id) => {
    return api.get(
      `voting/${id}`,
    );
  };
  const saveVote = (token, vote) => {
    return api.post(
      `voting/${vote.id}`,
      vote,
      {
        headers: { Authorization: `Bearer ${token}` },
      });
  };

  const getVoteResults = (token, id) => {
    return api.get(
      `votingresult/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  };

  const getStats = (token) => {
    return api.get(
      'stats',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  };

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    login,
    listUsers,
    getUser,
    saveUser,
    createUser,
    listEvents,
    createEvent,
    removeUser,
    getEvent,
    saveEvent,
    uploadFile,
    listAds,
    createAd,
    getAd,
    saveAd,
    listVotes,
    createVote,
    getVote,
    saveVote,
    getVoteResults,
    getStats,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
