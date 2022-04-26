import React from 'react'
import { Link } from 'react-router-dom'
import DialogUsers from './DialogUsers'
import FooterContainer from "../../footer/FooterContainer";

const Dialog = (props) => {
  let userElement = props.chats.map((d) => (
    <Link to={`/main/chatWindow/${d.id}`} key={d.id}>
      <DialogUsers name={d.name} newMessages={d.countNewMessages}/>
    </Link>
  ))
  return (
    <div>
      <div>{userElement}</div>
      <FooterContainer />
    </div>
  )
}

export default Dialog
