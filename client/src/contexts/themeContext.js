import { createContext, useEffect, useState } from 'react'
import { TypesTheme } from '../components/support/constants'
import { connect } from 'react-redux'
import { updateThemeThunk } from '../redux/settingsReducer.ts'

export const ThemeContext = createContext({
  theme: TypesTheme.Light,
  toggleTheme: () => {},
})

const ThemeProvider = ({ children, ...props }) => {
  const [theme, setTheme] = useState(props.theme)
  const toggleTheme = () => {
    const newTheme =
      theme === TypesTheme.Dark ? TypesTheme.Light : TypesTheme.Dark
    props.updateThemeThunk(props.id, newTheme)
  }

  useEffect(() => {
    setTheme(props.theme)
  }, [props.theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const mapStateToProps = (state) => ({
  theme: state.settings.theme,
  id: state.settings.id,
})

export default connect(mapStateToProps, { updateThemeThunk })(
  ThemeProvider
)
