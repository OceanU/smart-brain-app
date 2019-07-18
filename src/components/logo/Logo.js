import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import icon from './icon.png';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2 " options={{ max : 45 }} style={{ height: 150, width: 150 }} >
			    <div className="Tilt-inner pa4"> 
			    	<img src={icon} alt='brain icon'/> 
			    </div>
			</Tilt>
		</div>
		)
}

export default Logo;