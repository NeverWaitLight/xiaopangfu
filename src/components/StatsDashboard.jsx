import React from 'react';
import './dashboard.css';

const StatsDashboard = () => {
  return (
    <div className="stats-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <span className="dashboard-icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M8,20H4v-4h4V20z M8,14H4v-4h4V14z M14,20h-4v-4h4V20z M14,14h-4v-4h4V14z M20,20h-4v-4h4V20z M20,14h-4v-4h4V14z"></path>
            </svg>
          </span>
          <h2>运营看板</h2>
        </div>
        <div className="dashboard-controls">
          <div className="date-selector">
            <span className="active">今日</span>
            <span>本周</span>
            <span>本月</span>
            <span className="date-range">2023-04-09 - 2023-05-09</span>
          </div>
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-number">238<span className="stat-unit">个</span></div>
          <div className="stat-label">智能体总数</div>
          <div className="stat-icon purple"></div>
        </div>
        <div className="stat-card">
          <div className="stat-number">17<span className="stat-unit">个</span></div>
          <div className="stat-label">运营智能体数</div>
          <div className="stat-icon yellow"></div>
        </div>
        <div className="stat-card">
          <div className="stat-number">53<span className="stat-unit">次</span></div>
          <div className="stat-label">总调用次数</div>
          <div className="stat-icon pink"></div>
        </div>
        <div className="stat-card">
          <div className="stat-number">46<span className="stat-unit">次</span></div>
          <div className="stat-label">累计用户数</div>
          <div className="stat-icon blue"></div>
        </div>
        <div className="stat-card">
          <div className="stat-number">23<span className="stat-unit">个</span></div>
          <div className="stat-label">累计节点工时</div>
          <div className="stat-icon orange"></div>
        </div>
        <div className="stat-card">
          <div className="stat-number">98<span className="stat-unit">分</span></div>
          <div className="stat-label">平均响应时间</div>
          <div className="stat-icon light-blue"></div>
        </div>
      </div>

      <div className="filter-section">
        <div className="filter-group">
          <select className="filter-select">
            <option>全部类型</option>
          </select>
          <select className="filter-select">
            <option>全部状态</option>
          </select>
          <select className="filter-select">
            <option>全部时间</option>
          </select>
        </div>
        <button className="search-btn">导出</button>
      </div>

      <div className="chart-container">
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color teal"></span>
            <span>调用次数</span>
          </div>
          <div className="legend-item">
            <span className="legend-color purple"></span>
            <span>节点工时</span>
          </div>
        </div>
        <div className="chart-area">
          {/* 这里应该是图表，但我们用简化版表示 */}
          <div className="chart-placeholder">
            <div className="bar-container">
              {[0.8, 0.6, 0.9, 0.4, 0.7, 0.6, 0.7, 0.8, 0.5].map((height, index) => (
                <div key={index} className="chart-bar" style={{ height: `${height * 100}px` }}></div>
              ))}
            </div>
            <div className="line-points">
              {[0.5, 0.4, 0.7, 0.9, 0.5, 0.7, 0.5, 0.7, 0.8].map((height, index) => (
                <div key={index} className="line-point" style={{ top: `${(1-height) * 100}px`, left: `${index * 11 + 5}%` }}></div>
              ))}
            </div>
            <div className="chart-line"></div>
          </div>
        </div>
      </div>

      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>智能体名称</th>
              <th>类型</th>
              <th>状态</th>
              <th>最后活跃时间</th>
              <th>调用次数</th>
              <th>总调用次数</th>
              <th>独立用户数</th>
              <th>平均响应时间</th>
              <th>准确率</th>
              <th>节点工时</th>
              <th>线索分数</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map(row => (
              <tr key={row}>
                <td>财务助手A</td>
                <td>{row % 2 === 0 ? 'API' : 'H5'}</td>
                <td className="status-cell">
                  <span className="status-badge running">运行中</span>
                </td>
                <td>2023-04-09</td>
                <td>28</td>
                <td>48</td>
                <td>1.75</td>
                <td>89%</td>
                <td>4h</td>
                <td>989</td>
                <td>
                  <button className="action-btn view">查看</button>
                  <button className="action-btn use">使用</button>
                </td>
                <td>
                  <button className="action-btn config">配置权重</button>
                  <button className="action-btn settings">提交分析</button>
                  <button className="action-btn export">导出报表</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>共计 5 页</span>
          <button className="page-btn prev">&lt;</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn next">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard; 