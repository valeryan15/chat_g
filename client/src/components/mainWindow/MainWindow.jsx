import React from "react";
import Test2 from "../test2";

const MainWindow = () => {
    return <div className='flex h-full absolute w-full'>
        <div className='w-72 bg-gray-200 h-full'>
            <div className="flex justify-center m-8">
            </div>
        </div>
        <div className='bg-red-200 w-full h-full'>
            <Test2/>
        </div>
    </div>
}

export default MainWindow