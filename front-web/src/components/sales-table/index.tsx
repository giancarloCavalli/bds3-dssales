import { useEffect, useMemo, useState } from 'react';
import { FilterData, Sale, SpringPage } from '../../types';
import { formatDate, formatGender, formatPrice } from '../../utils/formatters';
import { buildFilterParams, makeRequest } from '../../utils/request';
import './styles.css';

type Props = {
  filterData?: FilterData;
};

const extraParams = {
  page: 0,
  size: 20,
  sorte: 'date,desc'
};

function SalesTable({ filterData }: Props) {
  const [salesPage, setSalesPage] = useState<SpringPage<Sale>>();
  const params = useMemo(() => buildFilterParams(filterData, extraParams), [filterData]);

  useEffect(() => {
    let isApiSubscribed = true;

    makeRequest
      .get<SpringPage<Sale>>('/sales', { params })
      .then((response) => {
        if (isApiSubscribed) {
          setSalesPage(response.data);
        }
      })
      .catch(() => {
        console.log('Error to fetch sales');
      });
    return () => {
      isApiSubscribed = false;
    };
  }, [params]);

  return (
    <div className="sales-table-container base-card">
      <h3 className="sales-table-title">Vendas recentes</h3>
      <table className="sales-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Gênero</th>
            <th>Categoria</th>
            <th>Loja</th>
            <th>Forma de pagamento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {salesPage &&
            salesPage.content.map((sale) => (
              <tr key={sale.id}>
                <td>#{sale.id}</td>
                <td>{formatDate(sale.date)}</td>
                <td>{formatGender(sale.gender)}</td>
                <td>{sale.categoryName}</td>
                <td>{sale.storeName}</td>
                <td>{sale.paymentMethod}</td>
                <td>{formatPrice(sale.total)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesTable;
