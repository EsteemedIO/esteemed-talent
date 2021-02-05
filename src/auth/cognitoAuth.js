import { Auth } from 'aws-amplify'

export const signUp = async ({ email, password, firstName, lastName }) => {
  await Auth.signUp({
    username: email,
    email: email,
    password: password,
    attributes: {
      email,
      family_name: lastName,
      given_name: firstName
    },
    validationData: []
  })
  return 'verify'
}

export const login = async ({ email, password }) => {
  await Auth.signIn(email, password)
}

export const logout = async () => {
  await Auth.signOut()
}

export const fetchUser = async () => {
  const user = await Auth.currentAuthenticatedUser()
  const expires = user.getSignInUserSession().getIdToken().payload.exp - Math.floor(new Date().getTime() / 1000)
  return { user, expires }
}

export const verify = async ({ email, verifyCode }) => {
  await Auth.confirmSignUp(email, verifyCode, {
    forceAliasCreation: true
  })
}

export const getToken = async () => {
  const user = await Auth.currentAuthenticatedUser()
  const token = user.getSignInUserSession().getIdToken()
  console.log('token==>>', token)
  return token
}
