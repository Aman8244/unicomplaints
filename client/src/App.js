import './App.css';
import ComplaintsList from './components/ComplaintList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='m-4'>
        <ComplaintsList />
      </div>
      <Footer/>
    </div>
  );
}

export default App;
