import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../footer/Footer'
import DialogUsers from './DialogUsers'

const Dialog = (props) => {
  const state = props.dialogsPage

  let userElement = state.dialogs.map((d) => (
    <Link to={`/main/chatWindow/${d.login}`} key={d.id} >
    <DialogUsers login={d.login} />
    </Link>
  ))
  return (
    <div>
          <div>{userElement}</div>
      <Footer />
    </div>
  )
}

export default Dialog
