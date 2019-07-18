import React from 'react';
import Particle from './components/particles/Particles'
import Navigation from './components/navigation/Navigation'
import SignIn from './components/signin/SignIn'
import Register from './components/register/Register'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import './App.css';

const initialState = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    const coordinates = [];

    data.outputs.forEach(output => {
      return output.data.regions.forEach(regions => {
        const clarifaiFace = regions.region_info.bounding_box;
        coordinates.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
        })
      }) 
    })
    return coordinates;
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
     fetch('https://shrouded-lake-18731.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
    .then(response => response.json()) 
    .then(response => { 
      if (response) {
        fetch('https://shrouded-lake-18731.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)


      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })

    .catch(err => console.log(err));  
  }

onRouteChange = (route) => {
  if (route === 'SignOut') {
    this.setState(initialState)
  }else if (route === 'Home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

  render() {
   const {isSignedIn, imageUrl, route, boxes} = this.state;
    return (
      <div>
        <Particle className='particles' />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'Home' 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} 
                             onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div> 
          : (
            this.state.route === 'SignIn' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )  
      }
      </div>
    );
   }
  } 


export default App;
