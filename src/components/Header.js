import React from 'react'
import PropTypes from 'prop-types';


const Header = (props) => {
	return (
			<h2 className="middle">
		  Hello component -- {props.message}
		  </h2>
		)
}

Header.propTypes = {
	message: PropTypes.string.isRequired
}

export default Header;