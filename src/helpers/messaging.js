import { EventBus } from '@/helpers/event-bus'

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

  EventBus.$emit('toastMessage', {
    ...opts,
    message: message
  })
}

const sendDebug = (message, options = {}) => {
  let opts = {...defaultOptions.debug, ...options}

  if(opts.display) {
    EventBus.$emit('debugMessage', message)
  }

  if(opts.console) {
    console.log(message)
  }
}

export {
  sendToast,
  sendDebug
}