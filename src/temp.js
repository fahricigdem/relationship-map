import './App.css';
import {SampleData} from './sample-data'

function App() {
  return (
    <div className="App">
      {/* { 
        SampleData.map(
          (laptop) => <div key={laptop.id} style={{background:'#aaa',}}> 
                          <p>laptop.name: {laptop.name}</p> 
                          <div style={{background:'#ccc',}}>
                               <p> - persons:</p>
                               {
                                laptop.persons.map(
                                  person =>  
                                          <div key={person.id}>
                                                <p> -- person.name: {person.name}</p>
                                                <div style={{background:'#ddf',}}>
                                                    <p> -- relations:</p>
                                                    <div >
                                                        {
                                                          person.relations.map(
                                                            (relation, i) => <p key={i}> --- {relation} </p>
                                                          )
                                                        }
                                                    </div>                                                        

                                                </div>
                                          </div>
                                )
                               } 
                            
                          </div>
                      </div>
        )
      } */}

      <svg id="MainSvg" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${window.innerWidth}  ${window.innerHeight}`}>

        
      
      </svg> 


    </div>
  );
}

export default App;

//////////////////
/////////////////
////////////////


import './App.css';
import {SampleData} from './sample-data'

function App() {

  let selectedId= 0;

  const ShowRelations = (relations) => {
    console.log(relations)
  }

  const HideRelations = () => {
    console.log("kaybet");
  }

  return (
    <div className="App">
      <svg id="MainSvg" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${window.innerWidth}  ${window.innerHeight}`}>
          { 
            SampleData.map(
              (laptop) => {
                console.log(SampleData.length);
                console.log(laptop.persons.length);
                if(laptop.id != selectedId)
                  return;
                else
                  return(
                    <g key={laptop.id} style={{}}> 
                                <text x="300" y="500">{laptop.name}</text> 
                                <g style={{background:'#ccc',}}>
                                    {
                                      
                                      laptop.persons.map(
                                        (person, i) =>  
                                                {
                                                  let x = 500;
                                                  let y = 300;
                                                  return(
                                                    <g key={person.id}>
                                                      <text x={`${x}`} y={`${i*100+y}`} onMouseEnter={()=>ShowRelations(person.relations)}  onMouseLeave={()=>HideRelations()}>{person.name}</text>
                                                      {/* <g x={`${i*250+x}`} y={`${i*100+y}`}>
                                                          <g >
                                                              {
                                                                person.relations.map(
                                                                  (relation, j) => {
                                                                    let x1 = 200+x ;
                                                                    let y1 = i*100+y-30;
                                                                    return(
                                                                      <text key={i}  x={`${x1}`} y={`${j*30+y1}`}>{relation} </text>
                                                                    )
                                                                  }
                                                                )
                                                              }
                                                          </g>                                                        

                                                      </g> */}
                                                </g>
                                                  )
                                                }
                                      )
                                    } 
                                  
                                </g>
                            </g>
                  )
              }
            )
          } 
      </svg> 


    </div>
  );
}

export default App;


////////////////////////
////////////////////////
////////////////////7/