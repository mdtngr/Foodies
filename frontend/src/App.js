import React from "react";

// Custom Components
import Navbar from './components/Navbar'
import Content from './components/Content'
import Footer from './components/Footer'
// import LoginForm from './components/LoginForm'

function App(props) { 

  return (
<div className="App">
      <Navbar  title='' navTitle='Meme Social' menuButton='' />
      {/* <LoginForm/> */}
      <Content />
      {/* {Users.map((e)=>{return (<Info name={e.name} rollNo={e.rollNo}/>);})} */}
      <Footer />
    </div>
  );
}

export default App;
