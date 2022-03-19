import { Link } from 'react-router-dom'
import { SvgDialogs, SvgSettings, SvgUsers } from '../../img/svg'

const Footer = () => {
  return (
    <div className="absolute bottom-0 shrink mb-12">
      <div className="ml-24 flex justify-between pb-2">
        <Link to={'/main'}>
          <SvgDialogs />
        </Link>
        <Link to={'/users'}>
          <SvgUsers />
        </Link>
        <Link to={'/settings'}>
          <SvgSettings />
        </Link>
      </div>
    </div>
  )
}

export default Footer
