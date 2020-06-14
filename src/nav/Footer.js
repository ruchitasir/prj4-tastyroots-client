import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'



const Footer = () => {
  return (
    <footer>
      Made by RS, RU, SL in 2020
      <div className="float-right"><a href="https://github.com/ruchitasir/prj4-tastyroots-client">Code here </a><Icon name="github"/></div>
    </footer>
  )
}

export default Footer
