import {Link} from "react-router-dom";

const Header = (props) => {
    return <div className={'w-full bg-gray-600 h-8 flex justify-end pr-4 '}>
        <div className='text-white'>
            <span className='mx-4'>
                <Link to={'/auth'}>Sing up</Link>
            </span>

            <span className='text-white'>
                { props.isAuth
                    ? <div>
                        {props.login}
                        <div>
                            <button onClick={props.logoutThunk}> Log out</button>
                        </div>
                    </div>
                    : <Link to={'/login'}>Sign in</Link>}
            </span>
        </div>
    </div>
}

export default Header


