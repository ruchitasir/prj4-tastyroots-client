import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



const Footer = () => {
  return (
    <footer>
      Made by RS, RU, SL in 2020
      <div className="float-right"><Icon name="github"/><a href="https://github.com/ruchitasir/prj4-tastyroots-client">Code here</a></div>
    </footer>
  )
}

export default Footer
