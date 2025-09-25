import React, { useState } from 'react';
import { useSendTransaction } from '@lkk/hooks';
import { isValidEthereumAddress, formatTxHash, getExplorerLink } from '@lkk/libs';

const SendTransaction = ({ account, chainId }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [gasLimit, setGasLimit] = useState('');

  const {
    sendETH,
    loading,
    txHash,
    error,
    status,
    reset
  } = useSendTransaction();

  const handleSend = async () => {
    if (!recipient || !amount) {
      alert('请填写接收地址和金额');
      return;
    }

    if (!isValidEthereumAddress(recipient)) {
      alert('接收地址格式不正确');
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert('金额必须大于0');
      return;
    }

    const gasLimitNum = gasLimit ? parseInt(gasLimit) : null;
    await sendETH(recipient, amount, gasLimitNum);
  };

  const handleReset = () => {
    reset();
    setRecipient('');
    setAmount('');
    setGasLimit('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'green';
      case 'failed': return 'red';
      case 'pending': return 'orange';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success': return '✅ 交易成功';
      case 'failed': return '❌ 交易失败';
      case 'pending': return '⏳ 交易待确认';
      default: return '⚪ 待发送';
    }
  };

  if (!account) {
    return (
      <div className="send-transaction">
        <h3>💸 发送交易</h3>
        <p>请先连接钱包</p>
      </div>
    );
  }

  return (
    <div className="send-transaction">
      <h3>💸 发送 ETH</h3>

      <div className="transaction-form">
        <div className="form-group">
          <label>接收地址:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="address-input"
          />
        </div>

        <div className="form-group">
          <label>金额 (ETH):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            step="0.01"
            min="0"
            className="amount-input"
          />
        </div>

        <div className="form-group">
          <label>Gas Limit (可选):</label>
          <input
            type="number"
            value={gasLimit}
            onChange={(e) => setGasLimit(e.target.value)}
            placeholder="21000"
            className="gas-input"
          />
        </div>

        <div className="form-actions">
          <button
            onClick={handleSend}
            disabled={loading || !recipient || !amount}
            className="send-btn"
          >
            {loading ? '发送中...' : '🚀 发送交易'}
          </button>

          {(txHash || error) && (
            <button
              onClick={handleReset}
              className="reset-btn"
            >
              🔄 重置
            </button>
          )}
        </div>
      </div>

      {/* 交易状态显示 */}
      <div className="transaction-status">
        <div className="status-indicator">
          <span
            className="status-dot"
            style={{ color: getStatusColor(status) }}
          >
            ●
          </span>
          <span className="status-text">{getStatusText(status)}</span>
        </div>

        {error && (
          <div className="error-message">
            <p>❌ 错误: {error}</p>
          </div>
        )}

        {txHash && (
          <div className="transaction-info">
            <div className="tx-hash">
              <strong>交易哈希:</strong>
              <div className="hash-container">
                <code>{formatTxHash(txHash)}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(txHash)}
                  className="copy-btn"
                  title="复制完整哈希"
                >
                  📋
                </button>
              </div>
            </div>

            {chainId && (
              <div className="explorer-link">
                <a
                  href={getExplorerLink(chainId, txHash, 'tx')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="explorer-btn"
                >
                  🔍 在区块浏览器中查看
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendTransaction;