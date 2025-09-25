import React from 'react';
import WalletConnect from './components/WalletConnect';
import BalanceDisplay from './components/BalanceDisplay';
import SendTransaction from './components/SendTransaction';
import StateManager from './components/StateManager';
import NetworkSwitcher from './components/NetworkSwitcher';
import UtilsDemo from './components/UtilsDemo';
import EventLogger from './components/EventLogger';
import { useWallet } from '@lkk/hooks';
import './App.css';

function App() {
  const { account, chainId, networkName } = useWallet();

  return (
    <div className="app">
      <header className="app-header">
        <h1>🚀 Web3 钱包演示应用</h1>
        <p>基于 @lkk/hooks 和 @lkk/libs 构建</p>
      </header>

      <main className="app-main">
        <div className="demo-grid">
          {/* 钱包连接区域 */}
          <section className="demo-section">
            <WalletConnect />
          </section>

          {/* 余额显示区域 */}
          <section className="demo-section">
            <BalanceDisplay account={account} chainId={chainId} />
          </section>

          {/* 发送交易区域 */}
          <section className="demo-section">
            <SendTransaction account={account} chainId={chainId} />
          </section>

          {/* 网络切换区域 */}
          <section className="demo-section">
            <NetworkSwitcher />
          </section>

          {/* 工具函数演示区域 */}
          <section className="demo-section">
            <UtilsDemo />
          </section>

          {/* 状态管理区域 */}
          <section className="demo-section">
            <StateManager
              walletAccount={account}
              walletChainId={chainId}
              networkName={networkName}
            />
          </section>

          {/* 事件监控区域 */}
          <section className="demo-section full-width">
            <EventLogger />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <div className="feature-list">
          <h3>✨ 功能展示</h3>
          <ul>
            <li>💼 MetaMask 钱包连接和管理</li>
            <li>💰 账户余额查询和格式化显示</li>
            <li>💸 ETH 转账功能和交易状态追踪</li>
            <li>🌐 多链网络切换和管理</li>
            <li>🛠️ 完整的工具函数演示和测试</li>
            <li>🔄 基于 useImmer 的复杂状态管理</li>
            <li>📊 实时事件监控和日志记录</li>
            <li>🔍 区块浏览器集成和链接生成</li>
          </ul>
        </div>

        <div className="tech-stack">
          <h3>🛠️ 技术栈</h3>
          <div className="tech-badges">
            <span className="badge">React 18</span>
            <span className="badge">Vite</span>
            <span className="badge">@lkk/hooks</span>
            <span className="badge">@lkk/libs</span>
            <span className="badge">useImmer</span>
            <span className="badge">MetaMask</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;