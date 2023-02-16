import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {SampleData} from './sample-data'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ReactComponent as Laptop } from './laptop.svg';
import { ReactComponent as Screen } from './screen.svg';
import { ReactComponent as Filter } from './filter.svg';
import { ReactComponent as Person } from './person.svg';
import { ReactComponent as Door } from './door.svg';

function App() {

  const [ data, setData ] = useState(SampleData);
  const [ selectedId, setSelectedId ] = useState(0);
  const [ showRelations, setShowRelations ] = useState(false);
  const [ activeRelation, setActiveRelations] = useState([ "relation0", "relation1", "relation2" ]);
  const [ posOfRelationX, setPosOfRelationX ] = useState(0);
  const [ posOfRelationY, setPosOfRelationY ] = useState(0);
  const [filter, setFilter] = useState("")
  const [ showFilterInput, setShowFilterInput ] = useState(false);
  const [ show, setShow ] = useState(false);
  const [assetName, setAssetName] = useState("")


  const ShowRelations = (relations, x, y) => {
    setPosOfRelationX(x);
    setPosOfRelationY(y);
    setActiveRelations(relations);
    setShowRelations(true);
  }

  const HideRelations = () => {
    setShowRelations(false);
  }

  const SelectLaptop=(id)=>{
    setSelectedId(id);
  }
  
  const HandleFilter = (e) => {
    setFilter(e.target.value.toLowerCase())
  }
  
  const ToggleFilterInput=()=>{
    setShowFilterInput(!showFilterInput);
    setFilter("")
  }
  
  const FilterInput = <input className="form-control filterInput" style={{border:'solid 1px #095aa3'}} onChange={HandleFilter}/>

  const ActiveRelations = 
  <g style={{}} onMouseEnter={()=>setShowRelations(true)} onMouseLeave={()=>HideRelations()}>
      <rect x={posOfRelationX-100} y={posOfRelationY-100} width="200" height={20 + activeRelation.length*25} fill="#767171" stroke="#ebebeb" strokeWidth="2"/>
      {    
        activeRelation.map(
            (relation, i) => <g>
                                <circle cx={posOfRelationX-78} cy={posOfRelationY-79 + i*30} r="3" fill="white"/>
                                <text key={i} x={posOfRelationX-65} y={posOfRelationY-75 + i*30} stroke="white" fill="white" strokeWidth="0">{relation}</text>
                            </g> 
        )
      }
  </g>
const SvgScreen = (x,y) => <svg  x={x} y={y} fill="#055392" width="80px" height="80px"><Screen/></svg>
const SvgLaptop = (x,y) => <svg x={x} y={y} width="5rem" height="5rem"><g fill="#055392"><Laptop/></g></svg>
const IconLaptop =  <svg width="3rem" height="3rem"><g fill="#ccc"><Laptop/></g></svg>
const IconFilter = <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="#fff"><Filter/></svg>
const IconPlus = <svg width="1rem" height="1rem" viewBox="0 0 24 24">
                        <line x1="0" y1="12" x2="24" y2="12" stroke="#ffffff" strokeWidth="3"/>
                        <line x1="12" y1="0" x2="12" y2="24" stroke="#ffffff" strokeWidth="3"/>
                  </svg>
const IconMinus = <svg width="1rem" height="1rem" viewBox="0 0 24 24">
                     <line x1="0" y1="12" x2="24" y2="12" stroke="#ffffff" strokeWidth="3"/>
                  </svg>
const FilterButton = <button className="btn btn-primary filterButton" style={{background:'#095aa3'}} onClick={()=>ToggleFilterInput()}>
                        <span className="mx-2">
                            {IconFilter}
                        </span>
                     </button>
const AddAsset = () =>{

          let newData = [...data];
          if(newData[selectedId].persons.length == 10) return;
          newData[selectedId].persons.push({id:newData[selectedId].persons.length, name:assetName, relations:["relation1","relation2"]})

          setData(newData);
          setShow(false);
          setAssetName("");
}

const ModalNew =
      <div className="modal fade show d-block" id="exampleModal" style={{backgroundColor: 'rgba(0, 0, 0, 0.40)',}} onClick={()=>{console.log("modal closed for a new node");setShow(false);}} >
        <div className="inputModal text-center rounded-circle" style={{position:'fixed', top:`${200}px`, left:`${window.innerWidth/2}px`,width:'400px', height:'400px', background:'#666',paddingTop:'70px'}} onClick={(e)=>e.stopPropagation()}>
              <input
                    type="text"
                    name="asssetName"
                    onChange={ (event) => setAssetName(event.target.value) }
                    value={assetName}
                    style={{ borderRadius:'6px'}}
                    maxLength="5"
                    className="text-center w-50"
                    placeholder='Name'
                    />
                <p className='text-light mt-4'>Type: Person (default)</p>
                <p className='text-light mt-4'>Relations: relation1, relation2 (default)</p>
                    <br/>
              <button className='btn btn-success menuButton w-25 mt-4' style={{ }} onClick={()=>{console.log("click on button - 1"); AddAsset();setShow(false);}}> Add </button>
          </div>
      </div>

const SvgPerson = (x,y)=><svg x={x} y={y} fill="#055392" width="80px" height="80px"><Person/></svg>

const SvgDoor = (x,y) => <svg  x={x} y={y} fill="#055392" width="80px" height="80px"><Door/></svg>
const LaptopButton = (label, id) => <button className='btn btn-info sidebarButton mb-1' style={{background:`${selectedId == id ? "#138496" : ""}`}} onClick={()=>SelectLaptop(id)}>
                                      <span className="mr-3">
                                         {IconLaptop}
                                      </span>
                                      {label}
                                   </button>
  
  const SideBarButtons =  data.map(laptop => LaptopButton(laptop.name,laptop.id))
  const SideBar =  <div className="sideBar">{SideBarButtons} </div>
  var width= 1900;
  var height= 900;
  const Asset = (assets, a,b,rx,ry,Icon,startAngle)=>
    assets.map(
      (asset, i) =>
       {
              let angle = (startAngle - Math.floor(assets.length/2)*20) + i*20;
              let t = Math.tan(angle/360 * Math.PI)
              let px = a + rx * (1-t**2)/(1+t**2)
              let py = b + ry * 2 * t / (1+t**2)
              let px2 = a + rx/2 * (1-t**2)/(1+t**2)
              let py2 = b + ry/2 * 2 * t / (1+t**2)
              if(filter == "" || asset.relations.filter(i=>i.toLowerCase()==filter).length>0)
              {
                return(
                  <g key={asset.id}>
                      <line className="relationLine" x1={width/2} y1={height/2} x2={px} y2={py} 
                          onMouseEnter={()=>ShowRelations(asset.relations, px2, py2)} onMouseLeave={()=>HideRelations()}/>
                      { 
                          asset.relations.filter(i=>(filter == "" || i.toLowerCase()==filter)).length > 1 && 
                          <g onMouseEnter={()=>ShowRelations(asset.relations, px2, py2)} onMouseLeave={()=>HideRelations()}>
                              <circle cx={px2} cy ={py2} r="20" fill="#ffff"/>
                              <circle cx={px2} cy ={py2} r="15" fill="#31a5e0"/>
                              <text x={px2-4} y ={py2+5} stroke="white" fill="white">{asset.relations.length}</text>
                          </g>
                      }
                      <ellipse stroke="#fff" fill="#fff" cx={`${px}`} cy={`${py}`} rx="90" ry="70"/>
                      {Icon(px-40,py-50)}
                      <text textAnchor='middle' x={`${px}`} y={`${py+5+40}`} fill="#055392" style={{fontSize:'18px', fontWeight:'600',}}>{asset.name}</text>
                  </g>
                )
              }
          })
  
  const AddAssetButton =(a,b)=> <> 
  <line x1={a-5} y1={b-50} x2={a-5} y2={b-140} stroke="#45b56d" strokeWidth="4"/>
    <g  onClick={()=>{
        // alert(">>>>>>   NoT iMPLeMeNTeD YeT!   <<<<<<");
        setShow(true);

        }}>
      <circle cx={a-5} cy={b-165} r="20" fill="#45b56d" />
      <line x1={a-18} y1={b-165} x2={a+8} y2={b-165} stroke="#ffffff" strokeWidth="5"/>
      <line x1={a-5} y1={b-178} x2={a-5} y2={b-151} stroke="#ffffff" strokeWidth="5"/>
    </g>
</>  

  const Assets = data.map(
    (laptop) => {
      let a = width/2;
      let b = height/2;
      let rx = 600;
      let ry = 350;
      if(laptop.id != selectedId)
        return;
      else
        return(
          <g key={laptop.id} style={{}}>
                      <g>{Asset(laptop.persons, a,b,rx,ry,SvgPerson,360)}</g>
                      <g>{Asset(laptop.rooms, a,b,rx,ry,SvgDoor,135)}</g>
                      <g>{Asset(laptop.screens, a,b,rx,ry,SvgScreen,225)}</g>
                      <ellipse stroke="#fff" fill="#fff" cx={a} cy={b} rx="90" ry="70"/>
                      {SvgLaptop(a-40,b-50)}
                      <text x={a} y={b+5+40} textAnchor='middle' fill="#055392" strokeWidth="0" style={{fontSize:'20px',fontWeight:'600',}}>{laptop.name}</text>
                      { data[selectedId].persons.length<10 && AddAssetButton(a,b) }
                      { showRelations && ActiveRelations}
           </g>
        )
    }
  )

  const Legend =(zoomIn,zoomOut)=> <div className="tools" style={{zIndex:'1000',}}>
                      {FilterButton}
                      <button className="btn btn-primary plusButton" style={{background:'#095aa3'}} onClick={() => zoomIn()}>
                          <span className="mx-2"> {IconPlus} </span>
                      </button>
                      <button className="btn btn-primary minusButton" style={{background:'#095aa3'}} onClick={() => zoomOut()}>
                          <span className="mx-2"> {IconMinus} </span>
                      </button>
                      {/* <button onClick={() => resetTransform()}>x</button> */}
                </div>

  var svgWidth= window.innerWidth - window.innerWidth/5 -10;
  var svgHeight= window.innerHeight-10;

  return (
    <div className="App">
          {show && ModalNew}
          { SideBar }
          <div className='svgContainer' style={{}}>
              <TransformWrapper>
                  {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <>
                          <TransformComponent>
                              <svg id="MainSvg" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 1900  900`} width={svgWidth} height={svgHeight}>
                                { Assets }
                              </svg>
                          </TransformComponent>
                          {Legend(zoomIn,zoomOut)}
                      </>
                  )}
              </TransformWrapper>
          </div>
          { showFilterInput && FilterInput}
    </div>
  );
}

export default App;
