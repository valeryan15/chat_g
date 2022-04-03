import {createContext, useEffect, useState} from 'react'
import { TypesTheme } from '../components/support/constants'
import { connect } from 'react-redux'
import {updateThemeThunk} from "../redux/settingsReducer";

export const ThemeContext = createContext({
  theme: TypesTheme.Light,
  changeTheme: () => {},
  toggleTheme: () => {},
})

const ThemeProvider = ({ children, ...props }) => {
  const [theme, setTheme] = useState(props.theme)
  const toggleTheme = () => {
    const newTheme = theme === TypesTheme.Dark ? TypesTheme.Light : TypesTheme.Dark
      props.updateThemeThunk(props.id, newTheme)
  }

  const changeTheme = (value) => {
    setTheme(value)
  }

  useEffect(() => {
    setTheme(props.theme)
  },[props.theme])

  return (
    <ThemeContext.Provider
      value={{ theme, changeTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

const mapStateToProps = (state) => ({
  theme: state.settings.settings.theme,
  id: state.settings.settings.id
})

export default connect(mapStateToProps, {updateThemeThunk})(ThemeProvider)
