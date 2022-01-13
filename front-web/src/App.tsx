import { useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-card';
import SalesByDate from './components/sales-by-date';
import SalesSummary from './components/sales-summary';
import SalesTable from './components/sales-table';
import { FilterData } from './types';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
    console.log('FILTER', filter);
  };

  return (
    <div className="App">
      <>
        <Header />
        <div className="app-container">
          <Filter onFilterChange={onFilterChange} />
          <SalesByDate filterData={filterData} />
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
          <SalesTable />
        </div>
      </>
    </div>
  );
}

export default App;
