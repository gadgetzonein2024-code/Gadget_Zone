import './AdminDashboard.css'

const navItems = ['Dashboard', 'Orders', 'Products', 'Inventory', 'Customers', 'Promotions', 'Support']

const orderTimeline = [
  { id: '#GZ12345', customer: 'Ritika Sharma', total: '₹89,990', status: 'Packed', time: '08:24 AM' },
  { id: '#GZ12346', customer: 'Arjun Patel', total: '₹19,499', status: 'Shipped', time: '08:12 AM' },
  { id: '#GZ12347', customer: 'Nisha Rao', total: '₹42,390', status: 'Payment Pending', time: '07:58 AM' },
]

const revenueCards = [
  { label: 'Today Revenue', value: '₹1.2 Cr', change: '+12.4%' },
  { label: 'Orders', value: '1,245', change: '+6.8%' },
  { label: 'Avg. Order Value', value: '₹10,580', change: '+2.1%' },
  { label: 'Refund Rate', value: '2.4%', change: '-0.3%' },
]

const topProducts = [
  { title: 'Apple iPince Smartwatch', sku: 'SKU-1249', sales: '₹24.1L', units: 189 },
  { title: 'Hyperion Portable Console', sku: 'SKU-2094', sales: '₹18.4L', units: 132 },
  { title: 'Sony Pulse Gaming Headset', sku: 'SKU-8421', sales: '₹12.7L', units: 210 },
]

const fulfillmentStats = [
  { label: 'Ready to ship', value: 62 },
  { label: 'Awaiting pickup', value: 14 },
  { label: 'Delayed', value: 4 },
]

function AdminDashboard() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span>GZ</span>
          <p>Operations</p>
        </div>
        <nav>
          {navItems.map((item) => (
            <button key={item} className={item === 'Dashboard' ? 'active' : ''}>
              {item}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <p>Fulfillment SLA</p>
          <strong>96%</strong>
          <small>+3% vs last week</small>
        </div>
      </aside>

      <section className="main-panel">
        <header className="panel-header">
          <div>
            <p className="eyebrow">Admin Console</p>
            <h1>Live Ops Dashboard</h1>
          </div>
          <div className="panel-actions">
            <a href="/landing" className="ghost" style={{ textDecoration: 'none', textAlign: 'center' }}>
              View Landing
            </a>
            <button className="primary">New product</button>
          </div>
        </header>

        <div className="cards-grid">
          {revenueCards.map((card) => (
            <article key={card.label} className="metric-card">
              <p className="label">{card.label}</p>
              <h2>{card.value}</h2>
              <p className="change">{card.change}</p>
            </article>
          ))}
        </div>

        <div className="grid-2">
          <section className="panel">
            <header>
              <div>
                <p className="eyebrow">Performance</p>
                <h3>Revenue pulse</h3>
              </div>
              <select>
                <option>Last 14 days</option>
                <option>Last 30 days</option>
              </select>
            </header>
            <div className="chart-placeholder">Chart placeholder</div>
          </section>

          <section className="panel">
            <header>
              <div>
                <p className="eyebrow">Fulfillment</p>
                <h3>Order health</h3>
              </div>
              <button className="ghost">View board</button>
            </header>
            <div className="fulfillment-list">
              {fulfillmentStats.map((item) => (
                <div key={item.label}>
                  <p className="label">{item.label}</p>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid-2">
          <section className="panel">
            <header>
              <div>
                <p className="eyebrow">Incoming Orders</p>
                <h3>Ops timeline</h3>
              </div>
              <button className="ghost">See all</button>
            </header>
            <ul className="timeline">
              {orderTimeline.map((order) => (
                <li key={order.id}>
                  <div>
                    <strong>{order.id}</strong>
                    <p>{order.customer}</p>
                  </div>
                  <div className={`pill pill-${order.status.replace(' ', '-').toLowerCase()}`}>{order.status}</div>
                  <div className="timeline-meta">
                    <span>{order.total}</span>
                    <small>{order.time}</small>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel">
            <header>
              <div>
                <p className="eyebrow">Top Products</p>
                <h3>Sales velocity</h3>
              </div>
              <button className="ghost">Export CSV</button>
            </header>
            <div className="table">
              <div className="table-header">
                <span>Product</span>
                <span>Units</span>
                <span>Sales</span>
              </div>
              {topProducts.map((product) => (
                <div key={product.sku} className="table-row">
                  <div>
                    <strong>{product.title}</strong>
                    <p>{product.sku}</p>
                  </div>
                  <span>{product.units}</span>
                  <span>{product.sales}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
