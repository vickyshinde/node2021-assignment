import jwt from 'jsonwebtoken';

const appConstants = {
  AUTH_TOKEN: 'token',
};
export const deleteSession = () => {
  // console.log(document.cookie);
  document.cookie = `${appConstants.AUTH_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // console.log(document.cookie);
};

export const isAuthenticated = () => {
  // console.log(appConstants.AUTH_TOKEN);
  return getCookie(appConstants.AUTH_TOKEN);
};

const getCookie = (name) => {
  var dc = document.cookie;
  var prefix = name + '=';
  var begin = dc.indexOf('; ' + prefix);
  if (begin === -1) {
    begin = dc.indexOf(prefix);
    if (begin !== 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(';', begin);
    if (end === -1) {
      end = dc.length;
    }
  }

  return decodeURI(dc.substring(begin + prefix.length, end));
};

export const getUserType = (req, res) => {
  try {
    var decoded = jwt.verify(req, 'the-super-strong-secret-key');
    // console.log(decoded);
    return decoded;
  } catch (e) {
    return;
  }
};
