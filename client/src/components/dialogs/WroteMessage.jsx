import checked from '../../img/free-icon-checkmark-outline-54346.png'

const WroteMessage = (props) => {
  const time = new Date(props.time)

  const editWroteMessage = () => {
    props.editMessage(props.mess, props.messId)
  }
  return (
    <>
      <div
        className={
          props.id === props.userId
            ? ' my-4 w-1/4 px-2 break-all rounded-lg bg-blue-200 dark:bg-blue-800 dark:text-white ml-[49%]'
            : ' bg-gray-200 w-1/4 my-4 px-2 rounded-lg dark:bg-black ml-24'
        }
      >
        <div className="flex justify-between ">
          {props.mess}
          {props.id === props.userId ? (
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
          <img src={checked} alt="checked" className="w-4" />
        </div>
      </div>
    </>
  )
}

export default WroteMessage
