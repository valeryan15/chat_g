import {Link} from "react-router-dom";

const Footer = () => {
    return <div className='absolute bottom-0'>
        <div className='ml-28'>
            <span>
                <Link to ={'/settings'}>A</Link>
            </span>
            <span className='mx-4'>
                <Link to ={'/chats'}>B</Link>
            </span>
            <span>
                <Link to ={'/settings'}>C</Link>
            </span>
        </div>
    </div>
}

export default Footer