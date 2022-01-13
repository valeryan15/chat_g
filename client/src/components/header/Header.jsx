import {Link} from "react-router-dom";

const Header = (props) => {
    return <div className={'w-full bg-gray-600 h-8 flex justify-end pr-4'}>
        <div>
            <Link to={'/auth'}>Authorize</Link>
        </div>
    </div>
}

export  default Header


