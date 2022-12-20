import {React} from 'react'
import ConnectForm from '../components/connect-form'

export default {
  title: 'Connect Form',
  component: ConnectForm
}

const Template = (args) => <ConnectForm {...args} />

export const Disconnected = Template.bind({})
Disconnected.args = {}

export const Connecting = Template.bind({})
Connecting.args = {
  isConnecting: true,
}

export const Connected = Template.bind({})
Connected.args = {
  isConnected: true,
}

export const Disconnecting = Template.bind({})
Disconnecting.args = {
  isDisconnecting: true,
  isConnected: true,
}