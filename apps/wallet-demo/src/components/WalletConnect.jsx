import React from 'react';
import { useWallet } from '@lkk/hooks';

const WalletConnect = () => {
  const {
    account,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    formattedAddress,
    networkName,
    error,
    isMetaMaskInstalled
  } = useWallet();

  const handleConnect = async () => {
    await connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (!isMetaMaskInstalled) {
    return (
      <div className="wallet-connect error">
        <h3>⚠️ MetaMask 未安装</h3>
        <p>请安装 MetaMask 浏览器扩展后再使用钱包功能。</p>
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="install-link"
        >
          安装 MetaMask
        </a>
      </div>
    );
  }

  return (
    <div className="wallet-connect">
      <h3>💼 钱包连接</h3>

      {error && (
        <div className="error-message">
          <p>❌ 错误: {error}</p>
        </div>
      )}

      {!isConnected ? (
        <div className="connect-section">
          <p>请连接你的 MetaMask 钱包</p>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="connect-btn"
          >
            {isConnecting ? '连接中...' : '🔗 连接钱包'}
          </button>
        </div>
      ) : (
        <div className="connected-section">
          <div className="wallet-info">
            <p><strong>✅ 钱包已连接</strong></p>
            <p><strong>地址:</strong> {formattedAddress}</p>
            <p><strong>网络:</strong> {networkName}</p>
            <p><strong>完整地址:</strong> <code>{account}</code></p>
          </div>
          <button
            onClick={handleDisconnect}
            className="disconnect-btn"
          >
            🔌 断开连接
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;