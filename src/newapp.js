import React from 'react';
import { withResizeDetector } from 'react-resize-detector';
import {ScrollToHOC} from "react-scroll-to";

class CustomComponent extends React.Component {
  render() {
    let {width, height} = this.props;
    return <div>{`${width}x${height}:${this.props.scroll}`}</div>;
  }
}

const withResizeDetectorComponent = withResizeDetector(CustomComponent)

const withResizeScrollComponent = ScrollToHOC(withResizeDetectorComponent)

export default withResizeScrollComponent;




