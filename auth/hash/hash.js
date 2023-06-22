const bcrypt = require('bcrypt');

async function encrypt(password) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing password: ' + error);
    }
  }

async function verifyPassword(password, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error verifying password: ' + error);
    }
}

module.exports = {encrypt, verifyPassword};