import { Link } from 'react-router-dom'
import { SvgDialogs, SvgSettings, SvgUsers } from '../../img/svg'

const Footer = () => {
  return (
    <div className="absolute bottom-0 shrink mb-12">
      <div className="ml-24 flex justify-between pb-2">
        <Link to={'/main'}>
          <SvgDialogs className="h-6 w-6 rounded-full dark:text-white dark:bg-gray-600" />
        </Link>
        <Link to={'/users'}>
          <SvgUsers className="h-6 w-6 rounded-full dark:text-white dark:bg-gray-600 mx-8" />
        </Link>
        <Link to={'/settings'}>
          <SvgSettings className="h-6 w-6 rounded-full dark:text-white dark:bg-gray-600" />
        </Link>
      </div>
    </div>
  )
}

export default Footer
