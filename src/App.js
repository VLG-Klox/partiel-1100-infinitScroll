import React, { Component } from 'react';
import './App.css';

class Beer extends Component {
  
  render() {
  return (
     <div className="beerDiv">
    <div style={{fontSize:'10pt'}}>{this.props.beer.name}</div>
    <img src={this.props.beer.image_url} alt="" style={{width: '30px', float: 'left',paddingRight: '10px',paddingBottom: '10px'}}/>
    <p style={{fontSize:'10pt'}}>{this.props.beer.tagline}</p>
      </div>
  )
}
}

class App extends Component {
 constructor(props) {
 super(props);
 
 this.state = {
      beers: [],
      page: 1
  }
}

componentDidMount = () => {
  window.addEventListener('scroll', this.infiniteScroll);
  this.fetchData(this.state.page);
}

infiniteScroll = () => {
  // End of the document reached?
  if (
    window.innerHeight + document.documentElement.scrollTop
    === document.documentElement.offsetHeight
  ) 
  {
    let newPage = this.state.page;
    newPage++;
    this.setState({
      page: newPage
    });
    
    this.fetchData(newPage);
  }
}

fetchData = (pageNum) => {

  let beerUrl = 'https://api.punkapi.com/v2/beers?page='+pageNum;

  fetch(beerUrl)
  .then(res=>res.json())
  .then(data => {
    this.setState({
      beers: [...this.state.beers,...data]
    })
  })
}

  render() {
  return (
    <div>
     {this.state.beers.map((beerdata,idx) => (<Beer key={idx} beer={beerdata} />))}
    </div>
  );
}
}

export default App;
