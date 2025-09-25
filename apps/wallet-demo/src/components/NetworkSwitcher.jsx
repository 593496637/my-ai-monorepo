import React, { useState } from 'react';
import { useWallet } from '@lkk/hooks';
import { getChainName, isTestnet, CHAIN_CONFIG } from '@lkk/libs';

const NetworkSwitcher = () => {
  const { chainId, switchNetwork, isConnected } = useWallet();
  const [switching, setSwitching] = useState(false);

  const supportedNetworks = [
    { chainId: 1, name: 'Ethereum Mainnet', symbol: 'ETH' },
    { chainId: 11155111, name: 'Sepolia Testnet', symbol: 'ETH' },
    { chainId: 137, name: 'Polygon Mainnet', symbol: 'MATIC' },
    { chainId: 80001, name: 'Polygon Mumbai', symbol: 'MATIC' }
  ];

  const handleSwitchNetwork = async (targetChainId) => {
    if (!isConnected || targetChainId === chainId) return;

    setSwitching(true);
    try {
      await switchNetwork(targetChainId);
    } catch (error) {
      console.error('Switch network error:', error);
    } finally {
      setSwitching(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="network-switcher">
        <h3>🌐 网络切换</h3>
        <p>请先连接钱包</p>
      </div>
    );
  }

  return (
    <div className="network-switcher">
      <h3>🌐 网络切换</h3>

      <div className="current-network">
        <h4>当前网络</h4>
        <div className="network-info">
          <div className="network-badge">
            <span className="network-name">{getChainName(chainId)}</span>
            <span className="network-type">
              {isTestnet(chainId) ? '🧪 测试网' : '🏢 主网'}
            </span>
            <code className="chain-id">ID: {chainId}</code>
          </div>
        </div>
      </div>

      <div className="network-list">
        <h4>切换到其他网络</h4>
        <div className="network-options">
          {supportedNetworks.map((network) => (
            <button
              key={network.chainId}
              onClick={() => handleSwitchNetwork(network.chainId)}
              disabled={switching || network.chainId === chainId}
              className={`network-option ${
                network.chainId === chainId ? 'current' : ''
              } ${isTestnet(network.chainId) ? 'testnet' : 'mainnet'}`}
            >
              <div className="network-details">
                <span className="network-name">{network.name}</span>
                <span className="network-symbol">{network.symbol}</span>
              </div>
              <div className="network-status">
                {network.chainId === chainId && <span className="current-indicator">✓ 当前</span>}
                {isTestnet(network.chainId) && <span className="testnet-badge">测试</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="network-utils-demo">
        <h4>🛠️ 网络工具演示</h4>
        <div className="utils-demo">
          <div className="demo-item">
            <strong>链配置信息:</strong>
            <pre className="config-display">
              {JSON.stringify(CHAIN_CONFIG[chainId] || {}, null, 2)}
            </pre>
          </div>
          <div className="demo-item">
            <strong>网络类型检测:</strong>
            <span className="network-type-result">
              {isTestnet(chainId) ? '🧪 这是测试网络' : '🏢 这是主网络'}
            </span>
          </div>
        </div>
      </div>

      {switching && (
        <div className="switching-indicator">
          ⏳ 正在切换网络，请在 MetaMask 中确认...
        </div>
      )}
    </div>
  );
};

export default NetworkSwitcher;