import './styles.css';
import { ReactComponent as AvatarIcon } from '../../assets/avatar-icon.svg';

function SalesSummaryCard() {
  return (
    <div className="sales-summary-card base-card">
      <AvatarIcon />
      <h3 className="sales-summary-card-value">534.00</h3>
      <span className="sales-summary-card-label">Média</span>
    </div>
  );
}

export default SalesSummaryCard;
