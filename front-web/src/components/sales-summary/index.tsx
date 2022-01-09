import './styles.css';
import SalesSummaryCard from './sales-summary-card';

import { ReactComponent as AvatarIcon } from '../../assets/avatar-icon.svg';
import { ReactComponent as BarChartIcon } from '../../assets/bar-chart-icon.svg';
import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as SyncIcon } from '../../assets/sync-icon.svg';

function SalesSummary() {
  return (
    <div className="sales-summary-container">
      <SalesSummaryCard icon={<DoneIcon />} value={534.0} label="Média" />
      <SalesSummaryCard icon={<SyncIcon />} value={44434} label="Quantidade" />
      <SalesSummaryCard icon={<BarChartIcon />} value={434.0} label="Mínima" />
      <SalesSummaryCard icon={<AvatarIcon />} value={3434.0} label="Máxima" />
    </div>
  );
}

export default SalesSummary;
