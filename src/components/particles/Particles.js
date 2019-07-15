import React from 'react';
import Particles from 'react-particles-js';
import '../../App.css';


const Particle = () => {
	return (
		<div> 
			{/*<Particles className='particles'
			                params={{
			                    particles: {
			                    	number: {
			                    		value:80,
			                    		density: {
			                    			enable: true,
			                    			value_area: 400
			                    		}
			                    	},
			                    onhover: {
			                    	enable:true,
			                    	mode: {
			                    		repulse: true
			                    	}
			                    }	
			                    }
			                    }
			                } />*/}
			<Particles className='particles'
    params={{
	    "particles": {
	        "number": {
	            "value": 100
	        },
	        "size": {
	            "value": 2
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "repulse"
	            },
	            "onclick": {
	            	"enable": true,
	            	"mode": "push"
	            } 
	        }
	    }
	}} />                
		</div>
		)
}

export default Particle;