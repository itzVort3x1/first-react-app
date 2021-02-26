import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './seasonDisplay';
import Spinner from './Spinner';

class App extends Component {

    state = { lat: null, lng: null, errorMessage: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude, lng: position.coords.longitude}),
            err => this.setState({ errorMessage: err.message })
            
        );
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage} </div>;
        }
        if (!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} lng={this.state.lng}/> 
        }
        return <div><Spinner message='Please accept location request'/></div>;
    }
    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        )   
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));