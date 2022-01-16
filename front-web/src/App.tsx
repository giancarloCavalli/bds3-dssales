import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-card';
import SalesByDate from './components/sales-by-date';
import SalesSummary from './components/sales-summary';
import SalesTable from './components/sales-table';
import { buildSalesByPaymentChart, buildSalesByStoreChart } from './helpers';
import { FilterData, PieChartConfig, SalesByPaymentMethod, SalesByStore } from './types';
import { buildFilterParams, makeRequest } from './utils/request';

const initialData = { labels: [], series: [] };

function App() {
  const [filterData, setFilterData] = useState<FilterData>();
  const [salesByStore, setSalesByStore] = useState<PieChartConfig>(initialData);
  const [salesByPaymentMethod, setSalesByPaymentMethod] = useState<PieChartConfig>(initialData);

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    let isApiSubscribed = true;

    makeRequest
      .get<SalesByStore[]>('/sales/by-store', { params })
      .then((response) => {
        if (isApiSubscribed) {
          const newSalesByStore = buildSalesByStoreChart(response.data);
          setSalesByStore(newSalesByStore);
        }
      })
      .catch(() => {
        console.log('Error to fetch sales by store');
      });

    return () => {
      isApiSubscribed = false;
    };
  }, [params]);

  useEffect(() => {
    let isApiSubscribed = true;

    makeRequest
      .get<SalesByPaymentMethod[]>('/sales/by-payment-method', { params })
      .then((response) => {
        if (isApiSubscribed) {
          const newSalesByPayment = buildSalesByPaymentChart(response.data);
          setSalesByPaymentMethod(newSalesByPayment);
        }
      })
      .catch(() => {
        console.log('Error to fetch sales by payment');
      });

    return () => {
      isApiSubscribed = false;
    };
  }, [params]);

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
            <SalesSummary filterData={filterData} />
            <PieChartCard
              name="Lojas"
              labels={salesByStore?.labels}
              series={salesByStore?.series}
            />
            <PieChartCard
              name="Pagamentos"
              labels={salesByPaymentMethod?.labels}
              series={salesByPaymentMethod?.series}
            />
          </div>
          <SalesTable filterData={filterData} />
        </div>
      </>
    </div>
  );
}

export default App;
