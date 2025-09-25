import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@lkk/hooks';

const EventLogger = () => {
  const [logs, setLogs] = useState([]);
  const [maxLogs, setMaxLogs] = useState(20);
  const [autoScroll, setAutoScroll] = useState(true);
  const logContainerRef = useRef(null);
  const { account, chainId, isConnected, error } = useWallet();

  const addLog = (type, message, data = null) => {
    const logEntry = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toLocaleTimeString(),
      type, // 'info', 'success', 'warning', 'error'
      message,
      data
    };

    setLogs(prevLogs => {
      const newLogs = [logEntry, ...prevLogs];
      return newLogs.slice(0, maxLogs);
    });
  };

  // 监听钱包状态变化
  useEffect(() => {
    if (isConnected && account) {
      addLog('success', '钱包连接成功', { account, chainId });
    } else if (!isConnected && !account) {
      addLog('info', '钱包已断开连接');
    }
  }, [isConnected, account, chainId]);

  // 监听网络切换
  useEffect(() => {
    if (chainId && isConnected) {
      addLog('info', '网络已切换', { chainId, networkName: getNetworkName(chainId) });
    }
  }, [chainId]);

  // 监听错误
  useEffect(() => {
    if (error) {
      addLog('error', '钱包操作出错', { error });
    }
  }, [error]);

  // 监听 MetaMask 事件
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts) => {
        addLog('info', 'MetaMask 账户变更', { accounts });
      };

      const handleChainChanged = (chainId) => {
        addLog('info', 'MetaMask 网络变更', { chainId: parseInt(chainId, 16) });
      };

      const handleConnect = (connectInfo) => {
        addLog('success', 'MetaMask 连接', connectInfo);
      };

      const handleDisconnect = (error) => {
        addLog('warning', 'MetaMask 断开', { error });
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('connect', handleConnect);
      window.ethereum.on('disconnect', handleDisconnect);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
          window.ethereum.removeListener('connect', handleConnect);
          window.ethereum.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, []);

  // 自动滚动到最新日志
  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [logs, autoScroll]);

  const getNetworkName = (chainId) => {
    const networks = {
      1: 'Ethereum Mainnet',
      11155111: 'Sepolia Testnet',
      137: 'Polygon Mainnet',
      80001: 'Polygon Mumbai'
    };
    return networks[chainId] || `Chain ${chainId}`;
  };

  const getLogIcon = (type) => {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    return icons[type] || '📝';
  };

  const clearLogs = () => {
    setLogs([]);
    addLog('info', '日志已清空');
  };

  const addTestLog = () => {
    const testMessages = [
      { type: 'info', message: '这是一条测试信息' },
      { type: 'success', message: '操作执行成功' },
      { type: 'warning', message: '这是一个警告' },
      { type: 'error', message: '这是一个错误示例' }
    ];

    const randomMessage = testMessages[Math.floor(Math.random() * testMessages.length)];
    addLog(randomMessage.type, randomMessage.message, { test: true, timestamp: Date.now() });
  };

  return (
    <div className="event-logger">
      <h3>📊 事件监控台</h3>

      <div className="logger-controls">
        <div className="control-group">
          <label>最大日志数:</label>
          <select
            value={maxLogs}
            onChange={(e) => setMaxLogs(Number(e.target.value))}
            className="max-logs-select"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
            />
            自动滚动
          </label>
        </div>

        <div className="control-buttons">
          <button onClick={addTestLog} className="test-btn">
            ➕ 测试日志
          </button>
          <button onClick={clearLogs} className="clear-btn">
            🗑️ 清空日志
          </button>
        </div>
      </div>

      <div className="logs-container" ref={logContainerRef}>
        {logs.length === 0 ? (
          <div className="no-logs">
            <p>暂无日志记录</p>
            <p>连接钱包或执行操作来查看事件日志</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className={`log-entry ${log.type}`}>
              <div className="log-header">
                <span className="log-icon">{getLogIcon(log.type)}</span>
                <span className="log-time">{log.timestamp}</span>
                <span className="log-type">{log.type.toUpperCase()}</span>
              </div>
              <div className="log-message">{log.message}</div>
              {log.data && (
                <details className="log-data">
                  <summary>查看详细数据</summary>
                  <pre>{JSON.stringify(log.data, null, 2)}</pre>
                </details>
              )}
            </div>
          ))
        )}
      </div>

      <div className="logger-status">
        <span className="log-count">共 {logs.length} 条日志</span>
        <span className="connection-status">
          {isConnected ? '🟢 已连接' : '🔴 未连接'}
        </span>
      </div>
    </div>
  );
};

export default EventLogger;