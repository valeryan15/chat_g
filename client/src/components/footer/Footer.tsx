import { Link } from 'react-router-dom'
import { SvgDialogs, SvgSettings, SvgUsers } from '../../img/svg'
import {FC} from "react";


type Props = {
  sumMessages: number
}
const Footer:FC<Props> = (props) => {
  return (
    <div className="absolute bottom-0 min-w-[400px] ">
      <div className="mx-20 flex justify-between pb-2">
        <Link to={'/main'}>
          <div className="flex">
            <SvgDialogs className="h-6 w-8 rounded-full dark:text-white dark:bg-gray-600" />
            {props.sumMessages ? (
              <span className="text-white bg-red-600 rounded-full w-4 text-center min-w-[27px] h-[27px] ml-[-17px] mt-[-17px]">
                {props.sumMessages}
              </span>
            ) : null}
          </div>
        </Link>
        <Link to={'/users'}>
          <SvgUsers className="h-6 w-8 rounded-full dark:text-white dark:bg-gray-600 mx-8" />
        </Link>
        <Link to={'/settings'}>
          <SvgSettings className="h-6 w-8 rounded-full dark:text-white dark:bg-gray-600" />
        </Link>
      </div>
    </div>
  )
}

export default Footer
