import React from "react";

export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  let tokenProfile = localStorage.getItem('token')
  if (tokenProfile) {
    return { Authorization: `Bearer ${tokenProfile}` }
  } else {
    return ''
  }
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

