import React from 'react';
import { useBalance } from '@lkk/hooks';

const BalanceDisplay = ({ account, chainId }) => {
  const {
    balance,
    formattedBalance,
    loading,
    error,
    refreshBalance
  } = useBalance(account, chainId);

  if (!account) {
    return (
      <div className="balance-display">
        <h3>💰 账户余额</h3>
        <p>请先连接钱包</p>
      </div>
    );
  }

  return (
    <div className="balance-display">
      <h3>💰 账户余额</h3>

      {loading && <p>⏳ 查询余额中...</p>}

      {error && (
        <div className="error-message">
          <p>❌ 查询失败: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="balance-info">
          <div className="balance-main">
            <span className="balance-amount">{formattedBalance}</span>
          </div>

          <div className="balance-details">
            <p><strong>原始余额 (Wei):</strong></p>
            <code className="balance-raw">{balance}</code>
          </div>

          <button
            onClick={refreshBalance}
            className="refresh-btn"
            disabled={loading}
          >
            🔄 刷新余额
          </button>
        </div>
      )}
    </div>
  );
};

export default BalanceDisplay;