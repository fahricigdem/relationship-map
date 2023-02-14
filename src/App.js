import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import {SampleData} from './sample-data'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function App() {

  const [ data, setData ] = useState(SampleData);
  const [ selectedId, setSelectedId ] = useState(0);
  const [ showRelations, setShowRelations ] = useState(false);
  const [ activeRelation, setActiveRelations] = useState([ "relation0", "relation1", "relation2" ]);
  const [ posOfRelationX, setPosOfRelationX ] = useState(0);
  const [ posOfRelationY, setPosOfRelationY ] = useState(0);
  const [filter, setFilter] = useState("")
  const [ showFilterInput, setShowFilterInput ] = useState(false);
  const [ zoom, setZoom ] = useState(1);
  const [ show, setShow ] = useState(false);
  const [assetName, setAssetName] = useState("")


  const ShowRelations = (relations, x, y) => {
    console.log(relations)
    setPosOfRelationX(x);
    setPosOfRelationY(y);
    setActiveRelations(relations);
    setShowRelations(true);
  }

  const HideRelations = () => {
    console.log("kaybet");
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
const SvgScreen = (x,y) => <svg  x={x} y={y} fill="#055392" width="80px" height="80px" viewBox="0 0 1024 1024"><path d="M960 95.808H64c-35.184 0-64 28.8-64 64V704c0 35.184 28.816 63.983 64 63.983h416v96.208H320c-17.664 0-32 14.336-32 32s14.336 32 32 32h384c17.664 0 32-14.336 32-32s-14.336-32-32-32H544v-96.208h416c35.184 0 64-28.8 64-63.983V159.808c0-35.2-28.816-64-64-64zM960 704H64V159.808h896V704z"/></svg>
const SvgLaptop = (x,y) => <svg viewBox="0 0 512 512" x={x} y={y} width="80px" height="80px">
<g>
 <path style={{fill:'#055392'}} d="M61.938,345.188h388.125c14.813,0,26.828-12.016,26.828-26.828V89.969c0-14.797-12.016-26.813-26.828-26.813
   H61.938c-14.813,0-26.813,12.016-26.813,26.813v228.391C35.125,333.172,47.125,345.188,61.938,345.188z M76.125,99.188h359.75
   v203.656H76.125V99.188z"/>
 <path style={{fill:'#055392'}} d="M508.031,419.609l-47.844-42.469c-3.078-2.719-7.5-4.266-12.172-4.266H63.984
   c-4.672,0-9.094,1.547-12.172,4.266L3.969,419.609C1.406,421.875,0,424.797,0,427.813v14.797c0,3.453,3.609,6.234,8.063,6.234
   h495.875c4.469,0,8.063-2.781,8.063-6.234v-14.797C512,424.797,510.594,421.875,508.031,419.609z M201.141,424.625l13.844-18.719
   h87.734l13.828,18.719H201.141z"/>
</g>
</svg>
const IconLaptop =  <svg viewBox="0 0 512 512" width="2rem" height="2rem">
<g>
 <path style={{fill:'#ccc'}} d="M61.938,345.188h388.125c14.813,0,26.828-12.016,26.828-26.828V89.969c0-14.797-12.016-26.813-26.828-26.813
   H61.938c-14.813,0-26.813,12.016-26.813,26.813v228.391C35.125,333.172,47.125,345.188,61.938,345.188z M76.125,99.188h359.75
   v203.656H76.125V99.188z"/>
 <path style={{fill:'#ddd'}} d="M508.031,419.609l-47.844-42.469c-3.078-2.719-7.5-4.266-12.172-4.266H63.984
   c-4.672,0-9.094,1.547-12.172,4.266L3.969,419.609C1.406,421.875,0,424.797,0,427.813v14.797c0,3.453,3.609,6.234,8.063,6.234
   h495.875c4.469,0,8.063-2.781,8.063-6.234v-14.797C512,424.797,510.594,421.875,508.031,419.609z M201.141,424.625l13.844-18.719
   h87.734l13.828,18.719H201.141z"/>
</g>
</svg>

const IconFilter = <svg width="1rem" height="1rem" viewBox="0 0 24 24">
<path d="M4.22657 2C2.50087 2 1.58526 4.03892 2.73175 5.32873L8.99972 12.3802V19C8.99972 19.3788 9.21373 19.725 9.55251 19.8944L13.5525 21.8944C13.8625 22.0494 14.2306 22.0329 14.5255 21.8507C14.8203 21.6684 14.9997 21.3466 14.9997 21V12.3802L21.2677 5.32873C22.4142 4.03893 21.4986 2 19.7729 2H4.22657Z" fill="#fff"/>
</svg>

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

// const PlusButton = <button className="btn btn-primary plusButton" style={{background:'#095aa3'}} onClick={()=>setZoom(zoom + 0.15)}>
//   <span className="mx-2">
//   {IconPlus}
// </span>
// </button>

// const MinusButton = <button className="btn btn-primary minusButton" style={{background:'#095aa3'}} onClick={()=>setZoom(zoom - 0.15)}>
//   <span className="mx-2">
//   {IconMinus}
// </span>
// </button>

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
  <div className="inputModal text-center rounded-circle" style={{position:'fixed', top:`${200}px`, left:`${900}px`,width:'400px', height:'400px', background:'#666',paddingTop:'70px'}} onClick={(e)=>e.stopPropagation()}>

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

const SvgPerson = (x,y)=><svg x={x} y={y} fill="#055392" width="80px" height="80px" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>

const SvgDoor = (x,y) => <svg  x={x} y={y} fill="#055392" width="80px" height="80px" viewBox="0 0 32 32"><path d="M30 28.75h-2.779v-26.75c-0-0.69-0.56-1.25-1.25-1.25h-19.971c-0.69 0-1.25 0.56-1.25 1.25v0 26.75h-2.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h28c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM7.25 28.75v-25.5h17.471v25.5zM21.48 14.84c-0.138-0.057-0.299-0.089-0.467-0.089-0.349 0-0.665 0.141-0.894 0.37l0-0c-0.232 0.222-0.377 0.534-0.379 0.88v0c0.004 0.174 0.041 0.338 0.103 0.489l-0.003-0.009c0.066 0.157 0.161 0.291 0.279 0.4l0.001 0.001c0.219 0.234 0.529 0.38 0.874 0.38 0.002 0 0.005 0 0.007-0h-0c0.174-0.005 0.339-0.041 0.489-0.104l-0.009 0.003c0.3-0.143 0.537-0.379 0.676-0.671l0.004-0.009c0.058-0.142 0.094-0.306 0.1-0.477l0-0.002c-0.002-0.346-0.148-0.658-0.38-0.879l-0-0c-0.109-0.119-0.241-0.214-0.391-0.278l-0.007-0.003z"></path></svg>
  // console.log(window.innerWidth, window.innerHeight)

  var width= 1900;
  var height= 900;
  var svgWidth= window.innerWidth - window.innerWidth/5 -10;
  var svgHeight= window.innerHeight-10;


  return (
    <div className="App">
      {show && ModalNew}
      <div className="sideBar"
          style={{ }}>
          <button className='btn btn-info sidebarButton mb-1' style={{background:`${selectedId == 0 ? "#138496" : ""}`}} onClick={()=>SelectLaptop(0)}>
            <span className="mr-3">
              {IconLaptop}
            </span>
            Laptop-519
            </button>
          <button className='btn btn-info sidebarButton my-1' style={{background:`${selectedId == 1 ? "#138496" : ""}`}} onClick={()=>SelectLaptop(1)}> 
          <span className="mr-3">
              {IconLaptop}
            </span>
          Laptop-310</button>
          <button className='btn btn-info sidebarButton my-1' style={{background:`${selectedId == 2 ? "#138496" : ""}`}} onClick={()=>SelectLaptop(2)}> 
          <span className="mr-3">
              {IconLaptop}
            </span>
            Laptop-100
            </button>

      </div>
      <div className='svgContainer' style={{}}>


      <TransformWrapper>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
<>


        <TransformComponent>
      <svg id="MainSvg" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 1900  900`} transform={`matrix(${zoom} 0 0 ${zoom} 0 0)`} width={svgWidth} height={svgHeight}>
          
          {
            data.map(
              (laptop) => {
                // console.log(SampleData.length);
                // console.log(laptop.persons.length);
                let a = width/2;
                let b = height/2;
                let rx = 600;
                let ry = 350;
                if(laptop.id != selectedId)
                  return;
                else
                  return(
                    <g key={laptop.id} style={{}}>
                                {/* <ellipse stroke="#ddd" fill="none" cx={400 + (window.innerWidth - 400)/2} cy={window.innerHeight/2} rx={rx} ry={ry}/> */}


                                <g style={{}}>
                                    {

                                      laptop.persons.map(
                                        (person, i) =>
                                                {
                                                  // let x = a + 420;
                                                  // let y = b - 100;

                                                  // let angle = 290 + i*140/(laptop.persons.length-1);
                                                  let angle = (360 - Math.floor(laptop.persons.length/2)*20) + i*20;
                                                  // console.log("angle - ",i,  angle)
                                                  let t = Math.tan(angle/360 * Math.PI)
                                                  let px = a + rx * (1-t**2)/(1+t**2)
                                                  let py = b + ry * 2 * t / (1+t**2)

                                                  let px2 = a + rx/2 * (1-t**2)/(1+t**2)
                                                  let py2 = b + ry/2 * 2 * t / (1+t**2)
                                                  
                                                  if(filter == "" || person.relations.filter(i=>i.toLowerCase()==filter).length>0)
                                                  {

                                                    return(
                                                      <g key={person.id}>
                                                          <line className="relationLine" x1={width/2} y1={height/2} x2={px} y2={py} 
                                                              onMouseEnter={()=>ShowRelations(person.relations, px2, py2)} onMouseLeave={()=>HideRelations()}/>
                                                          { 
                                                              person.relations.filter(i=>(filter == "" || i.toLowerCase()==filter)).length > 1 && 
                                                              <g onMouseEnter={()=>ShowRelations(person.relations, px2, py2)} onMouseLeave={()=>HideRelations()}>
                                                                  <circle cx={px2} cy ={py2} r="20" fill="#ffff"/>
                                                                  <circle cx={px2} cy ={py2} r="15" fill="#31a5e0"/>
                                                                  <text x={px2-4} y ={py2+5} stroke="white" fill="white">{person.relations.length}</text>
                                                              </g>
                                                          }
                                                          <ellipse stroke="#fff" fill="#fff" cx={`${px}`} cy={`${py}`} rx="90" ry="70"/>
                                                          {SvgPerson(px-40,py-50)}
                                                          <text textAnchor='middle' x={`${px}`} y={`${py+5+40}`} fill="#055392" style={{fontSize:'18px', fontWeight:'600',}}>{person.name}</text>


  
                                                      </g>
                                                    )
                                                  }
                                                  
                                                
                                             

                                                  }
                                      )
                                    }

                                  </g>
                                <g style={{}}>
                                    {

                                      laptop.rooms.map(
                                        (room, i) =>
                                                {
                                                  // let x = a + 420;
                                                  // let y = b - 100;

                                                  let angle =  (135 - Math.floor(laptop.rooms.length/2)*20) + i*20;
                                                  // console.log("angle - ",i,  angle)
                                                  let t = Math.tan(angle/360 * Math.PI)
                                                  let px = a + rx * (1-t**2)/(1+t**2)
                                                  let py = b + ry * 2 * t / (1+t**2)

                                                  let px2 = a + rx/2 * (1-t**2)/(1+t**2)
                                                  let py2 = b + ry/2 * 2 * t / (1+t**2)
                                                  if(filter == "" || room.relations.filter(i=>i.toLowerCase()==filter).length>0)
                                                  {

                                                    return(
                                                      <g key={room.id}>
                                                        <line className="relationLine" x1={width/2} y1={height/2} x2={px} y2={py} 
                                                            onMouseEnter={()=>ShowRelations(room.relations, px2, py2)} onMouseLeave={()=>HideRelations()}/>
                                                       { 
                                                            room.relations.filter(i=>(filter == "" || i.toLowerCase()==filter)).length > 1 && 
                                                            <g onMouseEnter={()=>ShowRelations(room.relations, px2, py2)} onMouseLeave={()=>HideRelations()}>
                                                                  <circle cx={px2} cy ={py2} r="20" fill="#ffff"/>
                                                                <circle cx={px2} cy ={py2} r="15" fill="#31a5e0"/>
                                                                <text x={px2-4} y ={py2+5} stroke="white" fill="white">{room.relations.length}</text>
                                                            </g>
                                                        }
                                                      {/* <ellipse stroke="#000" fill="#a09" cx={`${px}`} cy={`${py}`} rx="90" ry="40"/>
                                                      <text textAnchor='middle' x={`${px}`} y={`${py+5}`} >{room.name}</text> */}

                                                      <ellipse stroke="#fff" fill="#fff" cx={`${px}`} cy={`${py}`} rx="90" ry="70"/>
                                                      {SvgDoor(px-40,py-50)}
                                                      <text textAnchor='middle' x={`${px}`} y={`${py+5+40}`} fill="#055392" style={{fontSize:'18px', fontWeight:'600',}}>{room.name}</text>


                                                </g>
                                                  )
                                                }
                                                }
                                      )
                                    }

                                </g>
                                <g style={{}}>
                                    {

                                      laptop.screens.map(
                                        (screen, i) =>
                                                {
                                                  // let x = a + 420;
                                                  // let y = b - 100;

                                                  let angle = (225 - Math.floor(laptop.screens.length/2)*20) + i*20;
                                                  // console.log("angle - ",i,  angle)
                                                  let t = Math.tan(angle/360 * Math.PI)
                                                  let px = a + rx * (1-t**2)/(1+t**2)
                                                  let py = b + ry * 2 * t / (1+t**2)

                                                  let px2 = a + rx/2 * (1-t**2)/(1+t**2)
                                                  let py2 = b + ry/2 * 2 * t / (1+t**2)
                                                  if(filter == "" || screen.relations.filter(i=>i.toLowerCase()==filter).length>0)
                                                  {
                                                    
                                                    return(
                                                      <g key={screen.id}>
                                                        <line className="relationLine" x1={width/2} y1={height/2} x2={px} y2={py} 
                                                            onMouseEnter={()=>ShowRelations(screen.relations, px2, py2)} onMouseLeave={()=>HideRelations()}/>
                                                       { 
                                                            screen.relations.filter(i=>(filter == "" || i.toLowerCase()==filter)).length > 1 && 
                                                            <g onMouseEnter={()=>ShowRelations(screen.relations, px2, py2)} onMouseLeave={()=>HideRelations()}>
                                                                  <circle cx={px2} cy ={py2} r="20" fill="#ffff"/>
                                                                <circle cx={px2} cy ={py2} r="15" fill="#31a5e0"/>
                                                                <text x={px2-4} y ={py2+5} stroke="white" fill="white">{screen.relations.length}</text>
                                                            </g>
                                                        }
                                                      <ellipse stroke="#fff" fill="#fff" cx={`${px}`} cy={`${py}`} rx="90" ry="70"/>
                                                      {SvgScreen(px-40,py-50)}
                                                      <text textAnchor='middle' x={`${px}`} y={`${py+5+40}`} fill="#055392" style={{fontSize:'18px', fontWeight:'600',}}>{screen.name}</text>
                                                </g>
                                                  )
                                                }
                                                }
                                      )
                                    }

                                </g>
                                <ellipse stroke="#fff" fill="#fff" cx={a} cy={b} rx="90" ry="70"/>
                                {SvgLaptop(a-40,b-50)}
                                <text x={a} y={b+5+40} textAnchor='middle' fill="#055392" strokeWidth="0" style={{fontSize:'20px',fontWeight:'600',}}>{laptop.name}</text>
                                {data[selectedId].persons.length<10 &&
                                <> 
                                <line x1={a-5} y1={b-50} x2={a-5} y2={b-140} stroke="#45b56d" strokeWidth="4"/>
                                <svg width="3rem" height="3rem" x={a-30} y={b-200} viewBox="0 0 24 24">
                                  <g onClick={()=>{
                                      // alert(">>>>>>   NoT iMPLeMeNTeD YeT!   <<<<<<");
                                      setShow(true);

                                      }}>
                                    <circle cx="12" cy="12" r="12" fill="#45b56d" />
                                    <line x1="5" y1="12" x2="19" y2="12" stroke="#ffffff" strokeWidth="3"/>
                                    <line x1="12" y1="5" x2="12" y2="19" stroke="#ffffff" strokeWidth="3"/>
                                  </g>
                                </svg>
                                </>
                                }
                                { showRelations && ActiveRelations}
                            </g>
                  )
              }
            )
          }



          {/* <circle cx="1920" cy="937" r="10"/> */}
          {/* <circle cx={400 + (window.innerWidth - 400)/2} cy={window.innerHeight/2} r="10" fill="red"/> */}
      </svg>

      </TransformComponent>
      <div className="tools" style={{zIndex:'1000',}}>
      {FilterButton}
      <button className="btn btn-primary plusButton" style={{background:'#095aa3'}} onClick={() => zoomIn()}>
          <span className="mx-2">
          {IconPlus}
          </span>
      </button>
      <button className="btn btn-primary minusButton" style={{background:'#095aa3'}} onClick={() => zoomOut()}>
        <span className="mx-2">
         {IconMinus}
        </span>
      </button>
{/* <button onClick={() => resetTransform()}>x</button> */}
</div>

      </>
      )}
      </TransformWrapper>
      </div>

      {/* {FilterButton} */}
      {/* {PlusButton}
      {MinusButton} */}
      
      { showFilterInput && FilterInput}

    </div>
  );
}

export default App;
