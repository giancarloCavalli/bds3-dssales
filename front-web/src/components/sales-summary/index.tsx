import './styles.css';
import SalesSummaryCard from './sales-summary-card';

import { ReactComponent as AvatarIcon } from '../../assets/avatar-icon.svg';
import { ReactComponent as BarChartIcon } from '../../assets/bar-chart-icon.svg';
import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as SyncIcon } from '../../assets/sync-icon.svg';
import { FilterData, SalesSummaryData } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import { buildFilterParams, makeRequest } from '../../utils/request';

type Props = {
  filterData?: FilterData;
};

const initialSummary: SalesSummaryData = {
  avg: 0,
  count: 0,
  min: 0,
  max: 0
};

function SalesSummary({ filterData }: Props) {
  const [summary, setSummary] = useState<SalesSummaryData>(initialSummary);

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    let isApiSubscribed = true;

    makeRequest
      .get<SalesSummaryData>('/sales/summary', { params })
      .then((response) => {
        if (isApiSubscribed) {
          setSummary(response.data);
        }
      })
      .catch(() => {
        console.log('Error to fetch sales by summary');
      });

    return () => {
      isApiSubscribed = false;
    };
  }, [params]);

  return (
    <div className="sales-summary-container">
      <SalesSummaryCard
        icon={<DoneIcon />}
        value={Number(summary?.avg?.toFixed(2))}
        label="Média"
      />
      <SalesSummaryCard icon={<SyncIcon />} value={summary?.count} label="Quantidade" />
      <SalesSummaryCard icon={<BarChartIcon />} value={summary?.min} label="Mínima" />
      <SalesSummaryCard icon={<AvatarIcon />} value={summary?.max} label="Máxima" />
    </div>
  );
}

export default SalesSummary;
