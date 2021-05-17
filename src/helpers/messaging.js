import { ToastProgrammatic as Toast } from 'buefy'

const defaultOptions = {
  toast: {
    type: 'is-info',
    timeout: 3000
  },
  debug: {
    display: false,
    console: true
  }
}

const sendToast = (message, options = {}) => {
  let opts = {...defaultOptions.toast, ...options}

  Toast.open(message, opts)
}

const sendDebug = (message, options = {}) => {
  let opts = {...defaultOptions.debug, ...options}

  if(opts.display) {
    sendToast(message)
  }

  if(opts.console) {
    console.log(message)
  }
}

export {
  sendToast,
  sendDebug
}