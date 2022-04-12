import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../footer/Footer'
import DialogUsers from './DialogUsers'

const Dialog = (props) => {
  const state = props.dialogsPage

  let userElement = state.dialogs.map((d) => (
    <DialogUsers login={d.login} key={d.id} />
  ))
  return (
    <div>
      <Link to={'/main/chatWindow/[user_id]'}>
          <div>{userElement}</div>
      </Link>

      <Footer />
    </div>
  )
}

export default Dialog
