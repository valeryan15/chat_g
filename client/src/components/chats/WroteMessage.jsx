import checked from '../../img/free-icon-checkmark-outline-54346.png'
import m from '../../css/message.module.css'


const WroteMessage = (props) => {
  const time = new Date(props.time)

  const isCurrentUser = props.id === props.userId
  const isCurrentUserStyle = isCurrentUser
    ? ` my-4 px-2 break-words rounded-lg bg-blue-200 dark:bg-blue-800 dark:text-white ${m.rightMessage}`
    : ` bg-gray-200 break-words my-4 px-2 rounded-lg dark:bg-black ${m.leftMessage}`

  const editWroteMessage = () => {
    props.editMessage(props.mess, props.messId)
  }
  return (
    <>
      <div className={isCurrentUserStyle}>
        <div className="flex justify-between ">
          {props.mess}
          {isCurrentUser ? (
            <button
              className="bg-gray-200 dark:bg-gray-400 mr-2 ml-[15px] min-w-[38px] h-[23px] text-xs mt-2 rounded-lg px-2 "
              onClick={editWroteMessage}
            >
              edit
            </button>
          ) : null}
        </div>
        <div className="text-xs font-thin mt-2 flex justify-between">
          {time.toLocaleString()}
          {isCurrentUser ? (
            <img src={checked} alt="checked" className="w-4 ml-4" />
          ) : null}
        </div>
      </div>
    </>
  )
}

export default WroteMessage
