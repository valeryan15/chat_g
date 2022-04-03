import React from "react";
import Footer from "../footer/Footer";
import LoginUser from "./LoginUser";

const Users = (props) => {
  const loginUser = props.users.map((u) => <LoginUser id={u.id} login={u.login} key ={u.id} /> )
  return <div>
    <div className="flex h-full absolute w-full">
      <div className="min-w-[400px] bg-white border-r-2 border-slate-200 transition duration-1000 dark:bg-gray-600 h-full">
        {loginUser}
      </div>
      <Footer />
      <div className="bg-white dark:bg-gray-600 transition duration-1000  w-full h-full">
        выберите пользователя
      </div>
    </div>
  </div>
}

export default Users