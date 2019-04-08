import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';




function OnSelectedpage(props){
 var button=["first","prev",1,2,3,4,"next","last"]

 
  return (
    <div>
      {button.map(function(button){
           return (
             <button
             
             style={button===props.selectedpage?{background:"blue"}:null}
              onClick={props.onSelect.bind(null,button)}
              key={button}
              >{button}</button>
           )
      })}


  </div>

  )

}


OnSelectedpage.prototypes={
  onSelectpage:PropTypes.string.isRequired,
  onSelect:PropTypes.func.isRequired
}

function Pagenumber(props){
 return(
   <ul>
     {props.data.map(function(data,index){
     return(  <li>
        <div >{index+1}</div>
         <ul>
           <li><img src={data.avatar} /></li><br />
           <li>{data.first_name} </li><br />
           <li>{data.last_name}</li>
         </ul>
       </li>
     )})}
   </ul>
 )

}
Pagenumber.prototypes={
data:PropTypes.array.isRequired
}


class App extends Component {
  constructor(){
    super();
    this.state={
      data:null,
      selectedpage:"first"

      
    }
    this.updatapage=this.updatapage.bind(this);
  }
  componentDidMount(){
  this.updatapage(this.state.selectedpage)
  }
  updatapage(page){
    this.setState({
        selectedpage:page,
        data:null
      
    });
    fetch('https://reqres.in/api/users?page=1')
    .then((response) => response.json())
    .then((findresponse)=> {
     console.log(findresponse.data);
     this.setState({
       data:findresponse.data,
     

     })
    })
  }


  render() {
  
    const  {data}=this.state

    return (
      <div className="App">
  
          
              {!this.state.data?<p>loading...</p>:  <Pagenumber data={this.state.data} />}
              <OnSelectedpage 
   selectedpage={this.state.selectedpage}
    onSelect={this.updatapage}
   />
   
            </div>
    );
  }
}


export default App;
