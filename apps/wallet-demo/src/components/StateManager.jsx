import React, { useEffect } from 'react';
import { useCustomWalletState } from '@lkk/hooks';

const StateManager = ({ walletAccount, walletChainId, networkName }) => {
  const {
    walletState,
    setWalletConnected,
    addPendingTransaction,
    updateTransactionStatus,
    resetWalletState,
    hasPendingTransactions,
    hasTransactionHistory
  } = useCustomWalletState();

  // 同步钱包状态
  useEffect(() => {
    if (walletAccount && walletChainId) {
      setWalletConnected(walletAccount, walletChainId, networkName, '0');
    } else {
      resetWalletState();
    }
  }, [walletAccount, walletChainId, networkName]); // 移除函数依赖

  const handleAddTransaction = () => {
    const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);
    addPendingTransaction(mockTxHash, '测试交易');
  };

  const handleUpdateTransaction = (txHash) => {
    const statuses = ['success', 'failed'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    updateTransactionStatus(txHash, randomStatus, { blockNumber: '123456' });
  };

  return (
    <div className="state-manager">
      <h3>🔄 状态管理演示 (useImmer)</h3>

      <div className="state-overview">
        <div className="state-summary">
          <p><strong>连接状态:</strong> {walletState.isConnected ? '✅ 已连接' : '❌ 未连接'}</p>
          <p><strong>待处理交易:</strong> {walletState.pendingTransactions.length} 个</p>
          <p><strong>历史交易:</strong> {walletState.transactionHistory.length} 个</p>
        </div>

        <div className="state-actions">
          <button
            onClick={handleAddTransaction}
            className="action-btn"
            disabled={!walletState.isConnected}
          >
            ➕ 添加模拟交易
          </button>
        </div>
      </div>

      {/* 待处理交易列表 */}
      {hasPendingTransactions && (
        <div className="pending-transactions">
          <h4>⏳ 待处理交易</h4>
          <div className="transaction-list">
            {walletState.pendingTransactions.map((tx) => (
              <div key={tx.hash} className="transaction-item">
                <div className="tx-info">
                  <span className="tx-description">{tx.description}</span>
                  <code className="tx-hash">{tx.hash.substring(0, 10)}...</code>
                </div>
                <button
                  onClick={() => handleUpdateTransaction(tx.hash)}
                  className="update-btn"
                >
                  🔄 模拟完成
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 交易历史 */}
      {hasTransactionHistory && (
        <div className="transaction-history">
          <h4>📝 交易历史</h4>
          <div className="history-list">
            {walletState.transactionHistory.slice(0, 5).map((tx) => (
              <div key={tx.hash} className="history-item">
                <div className="tx-status">
                  {tx.status === 'success' ? '✅' : '❌'}
                </div>
                <div className="tx-details">
                  <span className="tx-description">{tx.description}</span>
                  <code className="tx-hash">{tx.hash.substring(0, 10)}...</code>
                  <span className="tx-time">
                    {new Date(tx.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 原始状态展示 */}
      <details className="raw-state">
        <summary>🔍 查看原始状态数据</summary>
        <pre className="state-json">
          {JSON.stringify(walletState, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default StateManager;