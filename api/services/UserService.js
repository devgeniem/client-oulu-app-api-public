import bcrypt from 'bcrypt-nodejs';

export default {
  comparePassword(passwordHash, password) {
    return bcrypt.compareSync(password, passwordHash);
  },

  generatePasswordHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
};
