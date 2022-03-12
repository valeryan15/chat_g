import {Link} from "react-router-dom";

const Footer = () => {
    return (
      <div className="absolute bottom-0">
        <div className="ml-24">
          <span>
            <Link to={'/users'}>A</Link>
          </span>
          <span className="mx-8">
            <Link to={'/chats'}>B</Link>
          </span>
          <span>
            <Link to={'/settings'}>C</Link>
          </span>
        </div>
      </div>
    )
}

export default Footer