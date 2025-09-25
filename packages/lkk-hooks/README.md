# @lkk/hooks

> Web3 钱包操作 React Hooks 库，包含 MetaMask 集成和状态管理功能

## 📦 安装

```bash
npm install @lkk/hooks
# 或者
pnpm add @lkk/hooks
```

## 🚀 快速开始

```jsx
import React from 'react';
import { useWallet, useBalance } from '@lkk/hooks';

function WalletComponent() {
  const {
    account,
    isConnected,
    connect,
    disconnect,
    formattedAddress,
    networkName
  } = useWallet();

  const { formattedBalance, refreshBalance } = useBalance(account);

  return (
    <div>
      {!isConnected ? (
        <button onClick={connect}>连接钱包</button>
      ) : (
        <div>
          <p>地址: {formattedAddress}</p>
          <p>网络: {networkName}</p>
          <p>余额: {formattedBalance}</p>
          <button onClick={refreshBalance}>刷新余额</button>
          <button onClick={disconnect}>断开连接</button>
        </div>
      )}
    </div>
  );
}
```

## 📚 API 文档

### 钱包连接 Hooks

#### `useWallet()`
MetaMask 钱包连接管理

**返回对象:**
```javascript
{
  // 状态
  account: string | null,              // 当前账户地址
  chainId: number | null,              // 当前链ID
  isConnected: boolean,                // 是否已连接
  isConnecting: boolean,               // 是否正在连接
  error: string | null,                // 错误信息

  // 格式化数据
  formattedAddress: string | null,     // 格式化的地址显示
  networkName: string | null,          // 当前网络名称

  // 操作方法
  connect: () => Promise<void>,        // 连接钱包
  disconnect: () => void,              // 断开连接
  switchNetwork: (chainId) => Promise<void>, // 切换网络

  // 工具属性
  isMetaMaskInstalled: boolean         // MetaMask 是否已安装
}
```

**使用示例:**
```jsx
const { connect, disconnect, isConnected, account } = useWallet();

// 连接钱包
const handleConnect = async () => {
  await connect();
};

// 切换到以太坊主网
const switchToMainnet = async () => {
  await switchNetwork(1);
};
```

#### `useBalance(account, chainId?, tokenAddress?)`
余额查询管理

**参数:**
- `account` (string): 账户地址
- `chainId` (number, 可选): 链ID
- `tokenAddress` (string, 可选): 代币合约地址，不传则查询ETH余额

**返回对象:**
```javascript
{
  balance: string,           // 原始余额值
  formattedBalance: string,  // 格式化的余额显示
  loading: boolean,          // 是否正在加载
  error: string | null,      // 错误信息
  refreshBalance: () => Promise<void> // 手动刷新余额
}
```

#### `useSendTransaction()`
交易发送管理

**返回对象:**
```javascript
{
  // 状态
  loading: boolean,          // 是否正在发送
  txHash: string | null,     // 交易哈希
  error: string | null,      // 错误信息
  receipt: object | null,    // 交易收据

  // 操作方法
  sendETH: (toAddress, amount, gasLimit?) => Promise<string>, // 发送ETH
  waitForTransaction: (txHash) => Promise<object>,            // 等待交易确认
  reset: () => void,         // 重置状态

  // 状态属性
  status: string,            // 交易状态: 'idle' | 'pending' | 'success' | 'failed'
  isSuccess: boolean,        // 是否成功
  isPending: boolean,        // 是否待处理
  isFailed: boolean         // 是否失败
}
```

**使用示例:**
```jsx
const { sendETH, loading, txHash, status } = useSendTransaction();

const handleSendETH = async () => {
  const hash = await sendETH('0x...', '0.1'); // 发送0.1 ETH
  if (hash) {
    console.log('交易已发送:', hash);
  }
};
```

### 状态管理 Hooks

#### `useWalletState()`
基于官方 use-immer 的钱包状态管理

**返回对象:**
```javascript
{
  walletState: {
    isConnected: boolean,
    isConnecting: boolean,
    account: string | null,
    balance: string,
    chainId: number | null,
    networkName: string | null,
    error: string | null,
    pendingTransactions: Array,
    transactionHistory: Array
  },

  // 操作方法
  setConnectionState: (isConnecting, isConnected?) => void,
  setAccount: (account, balance?) => void,
  setNetwork: (chainId, networkName?) => void,
  setError: (error) => void,
  clearError: () => void,
  updateBalance: (newBalance) => void,
  addPendingTransaction: (txHash, description?) => void,
  updateTransactionStatus: (txHash, status, receipt?) => void,
  clearTransactions: () => void,
  resetWalletState: () => void,
  setWalletConnected: (account, chainId, networkName, balance?) => void,

  // 计算属性
  hasPendingTransactions: boolean,
  hasTransactionHistory: boolean
}
```

#### `useCustomWalletState()`
基于自定义 immer 实现的钱包状态管理

功能与 `useWalletState` 相同，但使用自定义的 immer 实现。

#### `useImmer(initialState)`
自定义实现的 useImmer Hook

**参数:**
- `initialState` (any): 初始状态

**返回:**
- `[state, updater]`: 当前状态和更新函数

**使用示例:**
```jsx
const [person, updatePerson] = useImmer({
  name: 'John',
  age: 30,
  address: {
    city: 'Beijing'
  }
});

// 更新状态
const updateCity = () => {
  updatePerson(draft => {
    draft.address.city = 'Shanghai'; // 直接修改
    draft.age = 31;
  });
};
```

## 💡 使用场景

### 1. 基础钱包连接
```jsx
function ConnectWallet() {
  const { connect, isConnected, formattedAddress } = useWallet();

  return (
    <div>
      {isConnected ? (
        <span>已连接: {formattedAddress}</span>
      ) : (
        <button onClick={connect}>连接 MetaMask</button>
      )}
    </div>
  );
}
```

### 2. 发送交易
```jsx
function SendTransaction() {
  const { sendETH, loading, txHash } = useSendTransaction();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = async () => {
    if (recipient && amount) {
      const hash = await sendETH(recipient, amount);
      if (hash) {
        alert(`交易发送成功! Hash: ${hash}`);
      }
    }
  };

  return (
    <div>
      <input
        placeholder="接收地址"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        placeholder="金额 (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? '发送中...' : '发送 ETH'}
      </button>
      {txHash && <p>交易哈希: {txHash}</p>}
    </div>
  );
}
```

### 3. 复杂状态管理
```jsx
function WalletManager() {
  const {
    walletState,
    setWalletConnected,
    addPendingTransaction,
    updateTransactionStatus
  } = useWalletState();

  // 监听交易状态变化
  useEffect(() => {
    if (walletState.pendingTransactions.length > 0) {
      // 处理待处理交易
      console.log('有待处理的交易:', walletState.pendingTransactions);
    }
  }, [walletState.pendingTransactions]);

  return (
    <div>
      <h3>钱包状态</h3>
      <pre>{JSON.stringify(walletState, null, 2)}</pre>
    </div>
  );
}
```

## 🔧 开发依赖

- React >= 16.8.0
- use-immer ^0.9.0
- @lkk/libs (workspace dependency)

## 📄 许可证

ISC

## 👤 作者

**likaikai** <593496637@qq.com>