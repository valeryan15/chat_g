import checked from '../../img/free-icon-checkmark-outline-54346.png'

const WroteMessage = (props) => {
  const time = new Date(props.time)

  return (
    <>
      <div
        className={
          props.id === props.userId
            ? ' my-4 w-1/4 px-2 rounded-lg bg-blue-200 dark:bg-blue-800 dark:text-white ml-[57%]'
            : ' bg-gray-200 w-1/4 my-4 px-2 rounded-lg dark:bg-black'
        }
      >
        <div>{props.mess}</div>
        <div className="text-xs font-thin mt-2 flex justify-between">
          {time.toLocaleString()}
          <img src={checked} alt="checked" className='w-4'/>
        </div>
      </div>
    </>
  )
}

export default WroteMessage
