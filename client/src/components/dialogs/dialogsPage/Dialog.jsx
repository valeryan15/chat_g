import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../footer/Footer'
import DialogUsers from './DialogUsers'

const Dialog = (props) => {
  let userElement = props.chats.map((d) => (
    <Link to={`/main/chatWindow/${d.id}`} key={d.id}>
      <DialogUsers name={d.name} />
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
