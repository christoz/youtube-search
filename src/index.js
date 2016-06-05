import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import lodash from 'lodash';

const API_KEY = "AIzaSyBXMoZ40Wb5T0HPynEhJOCeUtOJIxl2JnE";

// Create a new component. This Component should produce
// some html
class App extends Component {
   constructor(props) {
      super(props);

      this.state = {
         videos : [],
         selectedVideo : null
      };
      // must make an initial search
      this.videoSearch('michael jordan');
   }

   /** type string **/
   videoSearch(term) {
      YTSearch({key: API_KEY, term : term}, (videos) => {
         // es5 this.setState({ videos : videos });
         this.setState({
            videos : videos,
            selectedVideo : videos[0]
          });
      });
   }

   render() {
      const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

      return (
         /*<SearchBar onSearchTermChange={term => this.videoSearch(term)} />*/
         <div>
            <SearchBar onSearchTermChange={videoSearch} />
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList
               onVideoSelect={(selectedVideo) => this.setState({selectedVideo}) }
               videos={this.state.videos}/>
         </div>
      )
   }
}

//  Take this component's generated HTML and put it
// on the page ( in the DOM )

ReactDOM.render(<App />, document.querySelector('.container'));
