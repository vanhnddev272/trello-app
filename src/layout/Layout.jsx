import AppBar from '~/components/AppBar/AppBar.jsx'

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      {children}
    </div>
  )
}

export default Layout