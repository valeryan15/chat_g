export class ServerError {
  value = ''
  msg = ''
  param = ''
  location = ''

  constructor(props) {
    if (props) {
      this.msg = props.msg || ''
      this.value = props.value || ''
      this.param = props.param || ''
      this.location = props.location || ''
    }
  }
}
