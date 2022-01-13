import AuthForm from "./AuthForm";
import {connect} from "react-redux";
import {authThunk} from "../redux/authReducer";
import React from "react";

const Auth = (props) => {
    const onSubmit = (formData) => {
        props.authThunk(formData.login, formData.password, formData.passwordConfirmation)
    }

    return (
        <AuthForm onSubmit={onSubmit}/>
    )
}

export default connect(null, {authThunk}) (Auth)