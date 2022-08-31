import agent from "./agent";

export const isUsernameValid = (username) => {
  return username.length > 5;
}

export const isEmailValid = (email) => {
  return email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
}

export const isPasswordValid = (password) => {
  var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/ // prettier-ignore
  return re.test(password);
}

export const isUsernameInUse = async (username) => {
  return await agent.Account.isUsernameInUse({ username })
    .then(data => data?.data)
}

export const isEmailInUse = async (email) => {
  return await agent.Account.isEmailInUse({ email })
    .then(data => data?.data)
}