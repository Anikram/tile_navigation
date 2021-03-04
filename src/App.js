import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from "react";
import {ScrollToHOC} from "react-scroll-to";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {withResizeDetector} from 'react-resize-detector';
import throttle from './helpers/throttle'
import debounce from './helpers/debounce'


import {
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowDown,
  faHamburger,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const arrowUp = <FontAwesomeIcon icon={faArrowUp}/>
const arrowDown = <FontAwesomeIcon icon={faArrowDown}/>
const arrowLeft = <FontAwesomeIcon icon={faArrowLeft}/>
const arrowRight = <FontAwesomeIcon icon={faArrowRight}/>
const hamburger = <FontAwesomeIcon icon={faHamburger}/>
const cross = <FontAwesomeIcon icon={faTimes}/>

const OPACITY_LEVEL = 0.2


const MyComponent = (props) => {
  // const [loading, setIsLoading] = useState(false)
  const [display, setDisplay] = useState({width: window.innerWidth, height: window.innerHeight})
  const [tiles, setTiles] = useState({
    '00': {x: 0, y: 0},
    '01': {x: 0, y: 1},
    '02': {x: 0, y: 2},
    '10': {x: 1, y: 0},
    '11': {x: 1, y: 1},
    '12': {x: 1, y: 2},
    '20': {x: 2, y: 0},
    '21': {x: 2, y: 1},
    '22': {x: 2, y: 2},
  })
  const [currentTile, setCurrentT] = useState('00')
  const [overlay, setOverlay] = useState(false)

  useEffect(()=>{
    // setIsLoading(true)
    throttle(() => {
      setDisplay({width: window.innerWidth, height: window.innerHeight})
    }, 200)

  },[window.innerWidth,window.innerHeight])

  useEffect(()=>{
    const {width, height} =  display
    const {x, y} = tiles[currentTile]
    props.scroll({x: x * width, y: y * height, smooth: false})
  },[display])


  const calculateTilePosition = (newX = 0, newY = 0) => {
    let widthResult, heightResult;

    widthResult = newX * display.width
    heightResult = newY * display.height

    return {x: widthResult, y: heightResult}
  }

  const setCurrentTile = (newTileCode) => {
    setCurrentT(newTileCode)
  }

  const hopToNewTileAndToggle = (newTileCode) => {
    toggleOverlay()

    moveToNewTile(newTileCode, false)
  }

  const moveToNewTile = (newTileCode, smooth = true) => {
    setCurrentTile(newTileCode)

    const tileProps = tiles[newTileCode]

    props.scroll({...calculateTilePosition(tileProps.x, tileProps.y), smooth: smooth})
  }


  const toggleOverlay = () => {
    console.log('toggle overlay!')
    setCurrentTile()
    setOverlay(!overlay)
  }

  const tileIsActive = (tile) => {
    return currentTile === tile
  }

  return (
    <div className={'god'}>

      {/*overlay ===================*/}
      <div className={overlay ? 'overlay visible' : 'overlay hidden'}
           style={{
             width: display.width,
             height: display.height,
             top: tiles[currentTile].y * display.height,
             left: tiles[currentTile].x * display.width,
           }}>
        <div className={'overlayDiv'} onClick={() => {
          hopToNewTileAndToggle('00')
        }}
             style={{background: "yellow", opacity: tileIsActive('00') ? 1 : OPACITY_LEVEL}}>
          <div className={'overlayButton'}>00</div>
        </div>
        <div className={'overlayDiv'} onClick={() => hopToNewTileAndToggle('10')}
             style={{background: "orange", opacity: tileIsActive('10') ? 1 : OPACITY_LEVEL}}>
          <div className={'overlayButton'}>10</div>
        </div>
        <div className={'overlayDiv'}
          // onClick={() => this.hopToNewTileAndToggle('20')}
             style={{background: "lightgrey", opacity: tileIsActive('20') ? 1 : OPACITY_LEVEL}}>
          <div className={'overlayButton'}>20</div>
        </div>

        <div className={'overlayDiv'} onClick={() => hopToNewTileAndToggle('01')}
             style={{background: "crimson", opacity: tileIsActive('01') ? 1 : OPACITY_LEVEL}}>
          <div className={'overlayButton'}>01</div>
        </div>
        <div className={'overlayDiv'} onClick={() => hopToNewTileAndToggle('11')}
             style={{background: "lightblue", opacity: tileIsActive('11') ? 1 : OPACITY_LEVEL}}>
          <div className={'overlayButton'}>11</div>
        </div>
        <div className={'overlayDiv'} onClick={() => hopToNewTileAndToggle('21')}
             style={{background: "purple", opacity: tileIsActive('21') ? 1 : OPACITY_LEVEL}}>
          <div className={'overlayButton'}>21</div>
        </div>

        <div className={'overlayDiv'} onClick={() => hopToNewTileAndToggle('02')}
             style={{background: "brown", opacity: tileIsActive('02') ? 1 : OPACITY_LEVEL}}>
          <div className={'overlayButton'}>02</div>
        </div>
        <div className={'overlayDiv'} onClick={() => hopToNewTileAndToggle('12')}
             style={{background: "grey", opacity: tileIsActive('12') ? 1 : OPACITY_LEVEL}}>
          <div className={'overlayButton'}>12</div>
        </div>
        <div className={'overlayDiv'} onClick={() => hopToNewTileAndToggle('22')}
             style={{background: "green", opacity: tileIsActive('22') ? 1 : OPACITY_LEVEL}}>
          <div className={'overlayButton'}>22</div>
        </div>
      </div>


      {/*main ===================*/}
      <div className={!overlay ? 'main visible' : 'main hidden'}
           style={{width: display.width * 3, height: display.height * 3}}>
        <div className={'sect'} style={{background: "yellow"}}>
          <div className="contentContainer">
            <h1>At aut, debitis dolor dolores eos fuga</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, debitis dolor dolores eos fuga
              laboriosam molestiae molestias necessitatibus officia officiis omnis perferendis quam quos reiciendis
              rem saepe ullam voluptatibus!</p>
          </div>
          <div className="actions">
            <button className={'action-button'} onClick={() => moveToNewTile('01')}>{arrowDown}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('10')}>{arrowRight}</button>
          </div>
        </div>
        <div className={'sect'} style={{background: "orange"}}>
          <div className="contentContainer">
            <h1>At aut, debitis dolor dolores eos fuga</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, debitis dolor dolores eos fuga
              laboriosam molestiae molestias necessitatibus officia officiis omnis perferendis quam quos reiciendis
              rem saepe ullam voluptatibus! </p>
          </div>
          <div className="actions">
            <button className={'action-button'} onClick={() => moveToNewTile('00')}>{arrowLeft}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('11')}>{arrowDown}</button>
          </div>
        </div>
        <div className={'sect'} style={{background: "lightgrey"}}></div>


        <div className={'sect'} style={{background: "crimson"}}>
          <div className="contentContainer">
            <h1>At aut, debitis dolor dolores eos fuga</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, debitis dolor dolores eos fuga
              laboriosam molestiae molestias necessitatibus officia officiis omnis perferendis quam quos reiciendis
              rem saepe ullam voluptatibus!</p>
          </div>
          <div className="actions">
            <button className={'action-button'} onClick={() => moveToNewTile('00')}>{arrowUp}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('02')}>{arrowDown}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('11')}>{arrowRight}</button>
          </div>
        </div>
        <div className={'sect'} style={{background: "lightblue"}}>
          <div className="contentContainer">
            <h1>At aut, debitis dolor dolores eos fuga</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, debitis dolor dolores eos fuga
              laboriosam molestiae molestias necessitatibus officia officiis omnis perferendis quam quos reiciendis
              rem saepe ullam voluptatibus!</p>
          </div>
          <div className="actions">
            <button className={'action-button'} onClick={() => moveToNewTile('01')}>{arrowLeft}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('10')}>{arrowUp}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('12')}>{arrowDown}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('21')}>{arrowRight}</button>
          </div>
        </div>
        <div className={'sect'} style={{background: "purple"}}>
          <div className="contentContainer">
            <h1>At aut, debitis dolor dolores eos fuga</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, debitis dolor dolores eos fuga
              laboriosam molestiae molestias necessitatibus officia officiis omnis perferendis quam quos reiciendis
              rem saepe ullam voluptatibus!</p>
          </div>
          <div className="actions">
            <button className={'action-button'} onClick={() => moveToNewTile('11')}>{arrowLeft}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('22')}>{arrowDown}</button>
          </div>
        </div>

        <div className={'sect'} style={{background: "brown"}}>
          <div className="contentContainer">
            <h1>At aut, debitis dolor dolores eos fuga</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, debitis dolor dolores eos fuga
              laboriosam molestiae molestias necessitatibus officia officiis omnis perferendis quam quos reiciendis
              rem saepe ullam voluptatibus!</p>
          </div>
          <div className="actions">
            <button className={'action-button'} onClick={() => moveToNewTile('01')}>{arrowUp}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('12')}>{arrowRight}</button>
          </div>
        </div>
        <div className={'sect'} style={{background: "grey"}}>
          <div className="contentContainer">
            <h1>At aut, debitis dolor dolores eos fuga</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, debitis dolor dolores eos fuga
              laboriosam molestiae molestias necessitatibus officia officiis omnis perferendis quam quos reiciendis
              rem saepe ullam voluptatibus!</p>
          </div>
          <div className="actions">
            <button className={'action-button'} onClick={() => moveToNewTile('02')}>{arrowLeft}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('11')}>{arrowUp}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('22')}>{arrowRight}</button>
          </div>
        </div>
        <div className={'sect'} style={{background: "green"}}>
          <div className="contentContainer">
            <h1>At aut, debitis dolor dolores eos fuga</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, debitis dolor dolores eos fuga
              laboriosam molestiae molestias necessitatibus officia officiis omnis perferendis quam quos reiciendis
              rem saepe ullam voluptatibus!</p>
          </div>
          <div className="actions">
            <button className={'action-button'} onClick={() => moveToNewTile('12')}>{arrowLeft}</button>
            <button className={'action-button'} onClick={() => moveToNewTile('21')}>{arrowUp}</button>
          </div>
        </div>
      </div>

      <div className={'burger'} onClick={() => hopToNewTileAndToggle(currentTile)}
           style={{
             // width: this.state.display.width * 3,
             // height: this.state.display.height * 3,
             top: tiles[currentTile].y * display.height + 20,
             left: tiles[currentTile].x * display.width + 20,
           }}>{overlay ? cross : hamburger}
      </div>
    </div>
  );

}

const withResizeDetectorComponent = withResizeDetector(MyComponent)

const withResizeScrollComponent = ScrollToHOC(withResizeDetectorComponent)

export default withResizeScrollComponent;

