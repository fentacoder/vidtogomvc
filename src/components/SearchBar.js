import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class SearchBar extends Component {
    state = {
        movieTitle: ''
    }

    updateTitle(e){
        this.setState({movieTitle: e.target.value});
    }

    render() {
        const {searchMovie} = this.props;
        return (
            <div style={{width: '60vh',display: 'block',margin: '1vh auto'}}>
                <input type='search' className='app-input' placeholder='Search a movie here' onChange={this.updateTitle}/>
                <input type='submit' value='Search' className='app-btn' onClick={searchMovie.bind(this.state.movieTitle)}/>
            </div>
        )
    }
}

export default withRouter(SearchBar);
