export const existName = {
  authSuccess: false,
  message: ['User with the same name does already exist'],
  cause: ['duplicate name'],
  field: ['userName'],
  existUserName: true,
};

export const existMail = {
  authSuccess: false,
  message: ['User with the same email does already exist'],
  cause: ['duplicate email'],
  field: ['email'],
  existEmail: true,
};

export const existPhone = {
  authSuccess: false,
  message: ['User with the same phone does already exist'],
  cause: ['duplicate phone'],
  field: ['phone'],
  existPhone: true,
};

export const wrongCredentials = {
  authSuccess: false,
    message: 'incorrect login or password',
    cause:   'incorrect credentials',

  };

export function messageValidator([...messages]) {
  let resObj = {...messages[0]};

  messages.forEach((el, i) => {
    if (i > 0) {
      for (let key in el) {
        if (Array.isArray(resObj[key])) {
          resObj[key] = [...resObj[key], ...el[key]]
        }
        else {
          resObj[key] = el[key]
        }
      }
    }

  })


  return resObj;
}