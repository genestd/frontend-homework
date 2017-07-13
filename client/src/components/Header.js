/*
*  The header is it's own component so that it can be made into
*  a beautiful navbar...for now it's just a title and icon.
*/
import React from 'react'
import {Link} from 'react-router-dom'

const Header = (props) => {
    return(
      <div data-sticky-container>

        <nav className="top-bar row" id="fixnav">
          <div className="columns small-1 text-center"><Link to='/'><i className="icon-chart-line logo text-white"></i></Link></div>
          <div className="columns small-11 text-center text-white">
            <h3>{props.title}</h3>
          </div>
        </nav>
      </div>
    )
}

export default Header
