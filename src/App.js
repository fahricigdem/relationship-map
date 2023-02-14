import './App.css';
import {SampleData} from './sample-data'

function App() {
  return (
    <div className="App">
      { 
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
      }
    </div>
  );
}

export default App;
