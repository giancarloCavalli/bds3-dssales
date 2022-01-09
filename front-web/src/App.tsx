import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import SalesByDate from './components/sales-by-date';

function App() {
  return (
    <div className="App">
      <>
        <Header />
        <div className="app-container">
          <Filter />
          <SalesByDate />
        </div>
      </>
    </div>
  );
}

export default App;
