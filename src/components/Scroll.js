// import React from "react";
// // import * as Scroll from "react-scroll";
// import {
//   Link,
//   Button,
//   Element,
//   Events,
//   animateScroll as scroll,
//   scrollSpy,
//   scroller,
// } from "react-scroll";

// const Section = React.createClass({
//   componentDidMount: function () {
//     Events.scrollEvent.register("begin", function (to, element) {
//       console.log("begin", arguments);
//     });

//     Events.scrollEvent.register("end", function (to, element) {
//       console.log("end", arguments);
//     });

//     scrollSpy.update();
//   },
//   componentWillUnmount: function () {
//     Events.scrollEvent.remove("begin");
//     Events.scrollEvent.remove("end");
//   },
//   scrollToTop: function () {
//     scroll.scrollToTop();
//   },
//   scrollToBottom: function () {
//     scroll.scrollToBottom();
//   },
//   scrollTo: function () {
//     scroll.scrollTo(100);
//   },
//   scrollMore: function () {
//     scroll.scrollMore(100);
//   },
//   handleSetActive: function (to) {
//     console.log(to);
//   },
//   render: function () {
//     return (
//       <div>
//         <Link
//           activeClass="active"
//           to="test1"
//           spy={true}
//           smooth={true}
//           offset={50}
//           duration={500}
//           onSetActive={this.handleSetActive}
//         >
//           Test 1
//         </Link>
//         <Link
//           activeClass="active"
//           to="test1"
//           spy={true}
//           smooth={true}
//           offset={50}
//           duration={500}
//           delay={1000}
//         >
//           Test 2 (delay)
//         </Link>
//         <Link
//           className="test6"
//           to="anchor"
//           spy={true}
//           smooth={true}
//           duration={500}
//         >
//           Test 6 (anchor)
//         </Link>
//         <Button
//           activeClass="active"
//           className="btn"
//           type="submit"
//           value="Test 2"
//           to="test2"
//           spy={true}
//           smooth={true}
//           offset={50}
//           duration={500}
//         >
//           Test 2
//         </Button>

//         <Element name="test1" className="element">
//           test 1
//         </Element>

//         <Element name="test2" className="element">
//           test 2
//         </Element>

//         <div id="anchor" className="element">
//           test 6 (anchor)
//         </div>

//         <Link to="/" containerId="containerElement">
//           Go to first element inside container
//         </Link>

//         <Link to="/projects" containerId="containerElement">
//           Go to second element inside container
//         </Link>
//         <Link to="/contact" containerId="containerElement">
//           Go to second element inside container
//         </Link>
//         <div className="element" id="containerElement">
//           <Element name="firstInsideContainer">
//             first element inside container
//           </Element>

//           <Element name="secondInsideContainer">
//             second element inside container
//           </Element>
//         </div>

//         <a onClick={this.scrollToTop}>To the top!</a>
//         <br />
//         <a onClick={this.scrollToBottom}>To the bottom!</a>
//         <br />
//         <a onClick={this.scrollTo}>Scroll to 100px from the top</a>
//         <br />
//         <a onClick={this.scrollMore}>
//           Scroll 100px more from the current position!
//         </a>
//       </div>
//     );
//   },
// });

// export default Section;
