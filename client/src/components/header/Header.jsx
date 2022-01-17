import {Link} from "react-router-dom";

const Header = () => {
    return <div className={'w-full bg-gray-600 h-8 flex justify-end pr-4 mb-1'}>
        <div className='text-white'>
            <span className='mx-4'>
                <Link to={'/auth'}>Sing up</Link>
            </span>
            <span>
                <Link to={'/login'}>Sing in</Link>
            </span>
        </div>
    </div>
}

export  default Header


