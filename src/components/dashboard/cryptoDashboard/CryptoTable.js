import React from 'react';
import { Badge, Table } from 'reactstrap';
import { ReactComponent as Bitcoin } from '../../../assets/images/crypto/bitcoin-btc-logo.svg';
import { ReactComponent as Cardano } from '../../../assets/images/crypto/cardano-ada-logo.svg';
import { ReactComponent as Ethereum } from '../../../assets/images/crypto/ethereum-eth-logo.svg';
import { ReactComponent as Litecoin } from '../../../assets/images/crypto/litecoin-ltc-logo.svg';
import { ReactComponent as Monero } from '../../../assets/images/crypto/monero-xmr-logo.svg';
import { ReactComponent as Shiba } from '../../../assets/images/crypto/shiba-inu-shib-logo.svg';
import { ReactComponent as Terra } from '../../../assets/images/crypto/terra-luna-luna-logo.svg';
import { ReactComponent as Tether } from '../../../assets/images/crypto/tether-usdt-logo.svg';
import DashCard from '../dashboardCards/DashCard';

const cryptoData = [
  {
    logo: <Bitcoin />,
    Currency: 'Bitcoin',
    short: 'BTC',
    Price: '1.67',
    MarketCap: '61,191,183,730',
    Volume: '10,133,400,000',
    Change1d: '66.26',
    Change1w: '-16.48',
  },
  {
    logo: <Cardano />,
    Currency: 'Cardano',
    short: 'ADA',
    Price: '1.67',
    MarketCap: '61,191,183,730',
    Volume: '10,133,400,000',
    Change1d: '66.26',
    Change1w: '-16.48',
  },
  {
    logo: <Ethereum />,
    Currency: 'Ethereum',
    short: 'ETH',
    Price: '1.67',
    MarketCap: '61,191,183,730',
    Volume: '10,133,400,000',
    Change1d: '66.26',
    Change1w: '-16.48',
  },
  {
    logo: <Litecoin />,
    Currency: 'Litecoin',
    short: 'LTC',
    Price: '1.67',
    MarketCap: '61,191,183,730',
    Volume: '10,133,400,000',
    Change1d: '66.26',
    Change1w: '-16.48',
  },
  {
    logo: <Monero />,
    Currency: 'Monero',
    short: 'XMR',
    Price: '1.67',
    MarketCap: '61,191,183,730',
    Volume: '10,133,400,000',
    Change1d: '66.26',
    Change1w: '-16.48',
  },
  {
    logo: <Shiba />,
    Currency: 'Shiba',
    short: 'SHIB',
    Price: '1.67',
    MarketCap: '61,191,183,730',
    Volume: '10,133,400,000',
    Change1d: '66.26',
    Change1w: '-16.48',
  },
  {
    logo: <Terra />,
    Currency: 'Terra',
    short: 'LUNA',
    Price: '1.67',
    MarketCap: '61,191,183,730',
    Volume: '10,133,400,000',
    Change1d: '66.26',
    Change1w: '-16.48',
  },
  {
    logo: <Tether />,
    Currency: 'Tether',
    short: 'USDT',
    Price: '1.67',
    MarketCap: '61,191,183,730',
    Volume: '10,133,400,000',
    Change1d: '66.26',
    Change1w: '-16.48',
  },
];

const CryptoTable = () => {
  return (
    <DashCard title="Crypto Market" subtitle="Overview of Top Selling Items">
      <div className="table-responsive">
        <Table className="text-nowrap mt-3 align-middle border" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Coin</th>
              <th>Price</th>
              <th>MarketCap</th>
              <th>Volume</th>
              <th>Change 1D</th>
              <th>Change 1W</th>
            </tr>
          </thead>

          <tbody className="">
            {cryptoData.map((cryp) => (
              <tr key={cryp.short}>
                <td className="p-3">
                  <div style={{ width: '40px' }}>{cryp.logo}</div>
                </td>
                <td>
                  <h6 className="mb-0">{cryp.Currency}</h6>
                  <small className="text-muted">{cryp.short}</small>
                </td>
                <td>${cryp.Price}</td>
                <td>${cryp.MarketCap}</td>
                <td>${cryp.Volume}</td>
                <td>
                  <Badge color="success" className='text-dark-white'>{cryp.Change1d} %</Badge>
                </td>
                <td>
                  <Badge color="danger" className='text-dark-white'>{cryp.Change1w} %</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </DashCard>
  );
};

export default CryptoTable;
