import React from 'react';

// Custom Components
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
// import LoginForm from './components/LoginForm';

function App() {
	return (
		<div className="App">
			<Navbar title="" navTitle="Meme Social" menuButton="" />
			{/* <LoginForm /> */}
			<Content />

			<Footer />
		</div>
	);
}

export default App;
