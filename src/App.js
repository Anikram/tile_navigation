import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import {ScrollToHOC} from "react-scroll-to";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faArrowUp, faArrowDown, faHamburger, faTimes} from '@fortawesome/free-solid-svg-icons';

const arrowUp = <FontAwesomeIcon icon={faArrowUp} />
const arrowDown = <FontAwesomeIcon icon={faArrowDown} />
const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} />
const arrowRight = <FontAwesomeIcon icon={faArrowRight} />
const hamburger = <FontAwesomeIcon icon={faHamburger} />
const cross = <FontAwesomeIcon icon={faTimes} />

const OPACITY_LEVEL = 0.2


class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      display: {width: window.innerWidth, height: window.innerHeight},
      tiles: {
        '00': {x: 0, y: 0},
        '01': {x: 0, y: 1},
        '02': {x: 0, y: 2},
        '10': {x: 1, y: 0},
        '11': {x: 1, y: 1},
        '12': {x: 1, y: 2},
        '20': {x: 2, y: 0},
        '21': {x: 2, y: 1},
        '22': {x: 2, y: 2},
      },
      currentTile: '00',
      overlay: false
    }
  }

  calculateTilePosition(newX = 0, newY = 0) {
    let widthResult, heightResult;

    widthResult = newX * this.state.display.width
    heightResult = newY * this.state.display.height

    return {x: widthResult, y: heightResult}
  }

  setCurrentTile(newTileCode) {
    this.setState(state => {
      return {...state, currentTile: newTileCode}
    })
  }

  hopToNewTileAndToggle(newTileCode){
    this.toggleOverlay()

    this.moveToNewTile(newTileCode,false)
  }

  moveToNewTile(newTileCode, smooth = true) {
    this.setCurrentTile(newTileCode)

    const tileProps = this.state.tiles[newTileCode]

    this.props.scroll({...this.calculateTilePosition(tileProps.x, tileProps.y), smooth: smooth})
  }


  toggleOverlay = () => {
    console.log('toggle overlay!')
    this.setCurrentTile()
    this.setState((state) => {
      return {...this.state, overlay: !this.state.overlay}
    })
  }

  tileIsActive(tile) {
    return this.state.currentTile === tile
  }

  componentDidMount() {
    // console.log(this.state.tiles[this.state.currentTile].x + " " + this.state.tiles[this.state.currentTile].y)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("update current Tile: "+this.state.tiles[this.state.currentTile].x+ " " + this.state.tiles[this.state.currentTile].y)
  }


  render() {


    return (
      <>

        {/*overlay ===================*/}
        <div className={this.state.overlay ? 'overlay visible' : 'overlay hidden'}
             style={{
               width: this.state.display.width,
               height: this.state.display.height,
               top: this.state.tiles[this.state.currentTile].y * this.state.display.height,
               left: this.state.tiles[this.state.currentTile].x * this.state.display.width,
             }}>
          {/*<div className={'burger'} onClick={this.toggleOverlay}></div>*/}
          <div className={'overlayDiv'}
               style={{background: "yellow", opacity: this.tileIsActive('00') ? 1 : OPACITY_LEVEL}}>
            <div className={'overlayButton'} onClick={() => {this.hopToNewTileAndToggle('00')} }>00</div>
          </div>
          <div className={'overlayDiv'}
               style={{background: "orange", opacity: this.tileIsActive('10') ? 1 : OPACITY_LEVEL}}>
            <div className={'overlayButton'} onClick={() => this.hopToNewTileAndToggle('10')}>10</div>
          </div>
          <div className={'overlayDiv'}
               style={{background: "lightgrey", opacity: this.tileIsActive('20') ? 1 : OPACITY_LEVEL}}>
            <div className={'overlayButton'} onClick={() => this.hopToNewTileAndToggle('20')}>20</div>
          </div>

          <div className={'overlayDiv'}
               style={{background: "crimson", opacity: this.tileIsActive('01') ? 1 : OPACITY_LEVEL}}>
            <div className={'overlayButton'} onClick={() => this.hopToNewTileAndToggle('01')}>01</div>
          </div>
          <div className={'overlayDiv'}
               style={{background: "lightblue", opacity: this.tileIsActive('11') ? 1 : OPACITY_LEVEL}}>
            <div className={'overlayButton'} onClick={() => this.hopToNewTileAndToggle('11')}>11</div>
          </div>
          <div className={'overlayDiv'}
               style={{background: "purple", opacity: this.tileIsActive('22') ? 1 : OPACITY_LEVEL}}>
            <div className={'overlayButton'} onClick={() => this.hopToNewTileAndToggle('22')}>22</div>
          </div>

          <div className={'overlayDiv'}
               style={{background: "brown", opacity: this.tileIsActive('02') ? 1 : OPACITY_LEVEL}}>
            <div className={'overlayButton'} onClick={() => this.hopToNewTileAndToggle('02')}>02</div>
          </div>
          <div className={'overlayDiv'}
               style={{background: "grey", opacity: this.tileIsActive('12') ? 1 : OPACITY_LEVEL}}>
            <div className={'overlayButton'} onClick={() => this.hopToNewTileAndToggle('12')}>12</div>
          </div>
          <div className={'overlayDiv'}
               style={{background: "green", opacity: this.tileIsActive('22') ? 1 : OPACITY_LEVEL}}>
            <div className={'overlayButton'} onClick={() => this.hopToNewTileAndToggle('22')}>22</div>
          </div>
        </div>

        <div className={'god'}>

          {/*main ===================*/}
          <div className={!this.state.overlay ? 'main visible' : 'main hidden'}
               style={{width: this.state.display.width * 3, height: this.state.display.height * 3}}>
            <div className={'sect'} style={{background: "yellow"}}>
              <div className="contentContainer">
                <h1>At aut, debitis dolor dolores eos fuga</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut, debitis dolor dolores eos fuga
                  laboriosam molestiae molestias necessitatibus officia officiis omnis perferendis quam quos reiciendis
                  rem saepe ullam voluptatibus!</p>
              </div>
              <div className="actions">
                <button className={'action-button'} onClick={() => this.moveToNewTile('01')}>{arrowDown}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('10')}>{arrowRight}</button>
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
                <button className={'action-button'} onClick={() => this.moveToNewTile('00')}>{arrowLeft}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('11')}>{arrowDown}</button>
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
                <button className={'action-button'} onClick={() => this.moveToNewTile('00')}>{arrowUp}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('02')}>{arrowDown}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('11')}>{arrowRight}</button>
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
                <button className={'action-button'} onClick={() => this.moveToNewTile('01')}>{arrowLeft}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('10')}>{arrowUp}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('12')}>{arrowDown}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('21')}>{arrowRight}</button>
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
                <button className={'action-button'} onClick={() => this.moveToNewTile('11')}>{arrowLeft}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('22')}>{arrowDown}</button>
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
                <button className={'action-button'} onClick={() => this.moveToNewTile('01')}>{arrowUp}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('12')}>{arrowRight}</button>
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
                <button className={'action-button'} onClick={() => this.moveToNewTile('02')}>{arrowLeft}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('11')}>{arrowUp}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('22')}>{arrowRight}</button>
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
                <button className={'action-button'} onClick={() => this.moveToNewTile('12')}>{arrowLeft}</button>
                <button className={'action-button'} onClick={() => this.moveToNewTile('21')}>{arrowUp}</button>
              </div>
            </div>
          </div>
        </div>

        <div className={'burger'} onClick={() => this.hopToNewTileAndToggle(this.state.currentTile)}
             style={{
               // width: this.state.display.width * 3,
               // height: this.state.display.height * 3,
               top: this.state.tiles[this.state.currentTile].y * this.state.display.height + 20,
               left: this.state.tiles[this.state.currentTile].x * this.state.display.width + 20,
             }}>{ this.state.overlay ? cross : hamburger}
        </div>
      </>
    );
  }
}


export default ScrollToHOC(MyComponent)
