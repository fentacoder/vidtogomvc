import React, { Component } from 'react'
import SearchBar from './SearchBar'
import axios from 'axios'
import {withRouter,Redirect} from 'react-router-dom'
import '../App.css'
import {AppContext} from '../context/state/AppState'

class MovieGrid extends Component {

    static contextType = AppContext;

    state = {
        movieList: [],
        gridItemList: [],
        redirect: false
    }

    componentDidMount(){
        //redirect to /login if the userId is not present yet using this.context
        let {userId} = this.context;


        if(userId !== ''){
            this.mapInitialMovies();
        }else{
            this.setState({redirect: true});
        }
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState !== this.state){

        }
    }

    mapInitialMovies(){
        //fetch movie metadata from omdb api using axios
        let tempList = [];
        for(let i = 0; i < 10; i++){
            axios.get(`http://www.omdbapi.com/?i=tt${i + 3896198}&apikey=384f790d`)
                .then(responseObj => {
                    
                    if(responseObj.data.Response !== 'False'){
                        //console.log(responseObj.data);
                        tempList.push(responseObj.data);
                    }
                    
                })
                .catch(err => console.log(err));
        }

        this.setState({movieList: tempList});

        //console.log(this.state.movieList);
        
        this.formatMovies(tempList);
    }

    searchMovie(movieName){
        //fetch specific movie
        axios.get(`http://www.omdbapi.com/?t=${movieName}&apikey=384f790d`)
            .then(responseObj => {
                this.setState({movieList: responseObj.data});
                this.formatMovies([responseObj.data]);
            })
            .catch(err => console.log(err));
    }

    formatMovies(formatList = []){
        let filmList = [];
        filmList = formatList;
        console.log('filmList: ',filmList);
        

        let gridItemList = [];
        
        gridItemList = filmList.map(movie => {
            return(
                <div className='movie-grid-item'>
                    <img style={{border: '1px black solid', borderRadius: '10px'}} src={movie.Poster} alt={movie.Title}/>
                    <article style={{color: 'white',width: '100%', textAlign: 'center',
                        margin: '1vh 0'}}>{movie.Title}</article>
                    <article style={{marginBottom: '1vh', width: '100%', textAlign: 'center',
                        color: 'white'}}>Actors: {movie.Actors}</article>
                    <article style={{marginBottom: '1vh', width: '100%', textAlign: 'center',
                        color: 'white', height: '10vh',overflowY: 'scroll'}}>Plot: {movie.Plot}</article>
                </div>
            );
            }
        );

        console.log('formatting list: ',gridItemList);
        

        this.setState({gridItemList: gridItemList},
            () => this.forceUpdate());
    }

    render() {
        const {gridItemList} = this.state;
        console.log('gridItemlist: ',gridItemList);
        
        if (this.state.redirect !== false) {
            return <Redirect to={'/login'} />
        }

        return (
            <div>
                <SearchBar searchMovie={this.searchMovie}/>

                <div className='movie-grid'>
                    {gridItemList}
                </div>
            </div>
        )
    }
}

export default withRouter(MovieGrid);