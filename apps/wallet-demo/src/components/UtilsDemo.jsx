import React, { useState } from 'react';
import {
  formatWalletAddress,
  isValidEthereumAddress,
  formatTxHash,
  formatEther,
  parseEther,
  formatBalance,
  formatNumber,
  getExplorerLink
} from '@lkk/libs';

const UtilsDemo = () => {
  const [testAddress, setTestAddress] = useState('0x1234567890abcdef1234567890abcdef12345678');
  const [testTxHash, setTestTxHash] = useState('0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890');
  const [testWeiValue, setTestWeiValue] = useState('0x1bc16d674ec80000'); // 2 ETH in Wei (hex)
  const [testEtherValue, setTestEtherValue] = useState('1.5');
  const [testNumber, setTestNumber] = useState('123456.789');

  return (
    <div className="utils-demo">
      <h3>🛠️ 工具函数演示</h3>

      {/* 地址工具演示 */}
      <div className="demo-section">
        <h4>📝 地址处理工具</h4>

        <div className="demo-item">
          <label>测试地址:</label>
          <input
            type="text"
            value={testAddress}
            onChange={(e) => setTestAddress(e.target.value)}
            placeholder="输入以太坊地址"
            className="demo-input"
          />
        </div>

        <div className="demo-results">
          <div className="result-row">
            <strong>formatWalletAddress():</strong>
            <code>{formatWalletAddress(testAddress)}</code>
          </div>
          <div className="result-row">
            <strong>formatWalletAddress(address, 8, 6):</strong>
            <code>{formatWalletAddress(testAddress, 8, 6)}</code>
          </div>
          <div className="result-row">
            <strong>isValidEthereumAddress():</strong>
            <span className={isValidEthereumAddress(testAddress) ? 'valid' : 'invalid'}>
              {isValidEthereumAddress(testAddress) ? '✅ 有效' : '❌ 无效'}
            </span>
          </div>
        </div>
      </div>

      {/* 交易哈希工具演示 */}
      <div className="demo-section">
        <h4>🔗 交易哈希处理</h4>

        <div className="demo-item">
          <label>交易哈希:</label>
          <input
            type="text"
            value={testTxHash}
            onChange={(e) => setTestTxHash(e.target.value)}
            placeholder="输入交易哈希"
            className="demo-input"
          />
        </div>

        <div className="demo-results">
          <div className="result-row">
            <strong>formatTxHash():</strong>
            <code>{formatTxHash(testTxHash)}</code>
          </div>
          <div className="result-row">
            <strong>getExplorerLink() (Ethereum):</strong>
            <a
              href={getExplorerLink(1, testTxHash, 'tx')}
              target="_blank"
              rel="noopener noreferrer"
              className="explorer-link"
            >
              在 Etherscan 查看 🔍
            </a>
          </div>
        </div>
      </div>

      {/* 单位转换演示 */}
      <div className="demo-section">
        <h4>⚖️ 单位转换工具</h4>

        <div className="demo-item">
          <label>Wei 值 (十六进制):</label>
          <input
            type="text"
            value={testWeiValue}
            onChange={(e) => setTestWeiValue(e.target.value)}
            placeholder="输入 Wei 值"
            className="demo-input"
          />
        </div>

        <div className="demo-item">
          <label>Ether 值:</label>
          <input
            type="text"
            value={testEtherValue}
            onChange={(e) => setTestEtherValue(e.target.value)}
            placeholder="输入 Ether 值"
            className="demo-input"
          />
        </div>

        <div className="demo-results">
          <div className="result-row">
            <strong>formatEther(Wei):</strong>
            <code>{formatEther(testWeiValue)} ETH</code>
          </div>
          <div className="result-row">
            <strong>parseEther(Ether):</strong>
            <code>{parseEther(testEtherValue)}</code>
          </div>
          <div className="result-row">
            <strong>formatBalance(Wei, 4):</strong>
            <code>{formatBalance(testWeiValue, 4)}</code>
          </div>
          <div className="result-row">
            <strong>formatBalance(Wei, 2, 'TOKEN'):</strong>
            <code>{formatBalance(testWeiValue, 2, 'TOKEN')}</code>
          </div>
        </div>
      </div>

      {/* 数字格式化演示 */}
      <div className="demo-section">
        <h4>🔢 数字格式化</h4>

        <div className="demo-item">
          <label>测试数字:</label>
          <input
            type="text"
            value={testNumber}
            onChange={(e) => setTestNumber(e.target.value)}
            placeholder="输入数字"
            className="demo-input"
          />
        </div>

        <div className="demo-results">
          <div className="result-row">
            <strong>formatNumber():</strong>
            <code>{formatNumber(testNumber)}</code>
          </div>
          <div className="result-row">
            <strong>formatNumber(value, 4):</strong>
            <code>{formatNumber(testNumber, 4)}</code>
          </div>
        </div>
      </div>

      {/* 预设示例 */}
      <div className="demo-section">
        <h4>🎯 预设示例</h4>
        <div className="preset-buttons">
          <button
            onClick={() => {
              setTestAddress('0x742D35CC6619C0532E2D0E90E2e7f0F85D99E1F3');
              setTestTxHash('0x8b2f1b8f8a1c8e2d8c8b2f1b8f8a1c8e2d8c8b2f1b8f8a1c8e2d8c8b2f1b8f8a');
              setTestWeiValue('0x56bc75e2d630eb20'); // ~6.3 ETH
              setTestEtherValue('2.5');
              setTestNumber('9876543.21');
            }}
            className="preset-btn"
          >
            🎲 随机示例
          </button>

          <button
            onClick={() => {
              setTestAddress('0x0000000000000000000000000000000000000000');
              setTestTxHash('0x0000000000000000000000000000000000000000000000000000000000000000');
              setTestWeiValue('0x0');
              setTestEtherValue('0');
              setTestNumber('0');
            }}
            className="preset-btn"
          >
            🔄 重置为零值
          </button>
        </div>
      </div>
    </div>
  );
};

export default UtilsDemo;