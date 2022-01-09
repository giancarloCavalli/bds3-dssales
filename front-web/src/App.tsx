import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-card';
import SalesByDate from './components/sales-by-date';
import SalesSummary from './components/sales-summary';

function App() {
  return (
    <div className="App">
      <>
        <Header />
        <div className="app-container">
          <Filter />
          <SalesByDate />
          <div className="sales-overview-container">
            <SalesSummary />
            <PieChartCard
              name="Lojas"
              labels={['Uberlândia', 'Araguari', 'Uberaba']}
              series={[35, 20, 45]}
            />
            <PieChartCard
              name="Pagamentos"
              labels={['Dinheiro', 'Crédito', 'Débito']}
              series={[20, 30, 50]}
            />
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
