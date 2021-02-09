export const authForm = [
  {
    title: 'LOGIN',
    type: 'login',
    ref: 'loginModal',
    fields: [
      {
        ref: 'email',
        label: 'EMAIL',
        type: 'email'
      },
      {
        ref: 'password',
        label: 'PASSWORD',
        type: 'password'
      }
    ]
  },
  {
    title: 'SIGNUP',
    type: 'signup',
    ref: 'signupModal',
    fields: [
      {
        ref: 'firstName',
        label: 'FIRST NAME',
        type: 'text'
      },
      {
        ref: 'lastName',
        label: 'LAST NAME',
        type: 'text'
      },
      {
        ref: 'email',
        label: 'EMAIL',
        type: 'email'
      },
      {
        ref: 'password',
        label: 'PASSWORD',
        type: 'password'
      },
      {
        ref: 'passwordConfirm',
        label: 'CONFIRM PASSWORD',
        type: 'password'
      }
    ]
  },
  {
    title: 'VERIFY CODE',
    type: 'verify',
    ref: 'verifyModal',
    fields: [
      {
        ref: 'verifyCode',
        label: 'CONFIRMATION NUMBER',
        type: 'text'
      }
    ]
  },
  {
    title: 'RESET PASSWORD',
    type: 'forgotPassword',
    ref: 'forgotPasswordModal',
    fields: [
      {
        ref: 'email',
        label: 'EMAIL',
        type: 'email'
      }
    ]
  },
  {
    title: 'SUBMIT NEW PASSWORD',
    type: 'submitNewPassword',
    ref: 'submitNewPasswordModal',
    fields: [
      {
        ref: 'password',
        label: 'PASSWORD',
        type: 'password'
      },
      {
        ref: 'passwordConfirm',
        label: 'CONFIRM PASSWORD',
        type: 'password'
      },
      {
        ref: 'verifyCode',
        label: 'CONFIRMATION NUMBER',
        type: 'text'
      }
    ]
  }
]

export const jobsForm = [
  {
    ref: 'firstName',
    label: 'FIRST NAME',
    type: 'text'
  },
  {
    ref: 'lastName',
    label: 'LAST NAME',
    type: 'text'
  },
  {
    ref: 'email',
    label: 'EMAIL',
    type: 'email'
  },
  {
    ref: 'phone',
    label: 'MOBILE PHONE',
    type: 'phone'
  }
]
