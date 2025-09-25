# @lkk/libs

> Web3 钱包工具函数库，提供地址格式化、单位转换和链信息管理功能

## 📦 安装

```bash
npm install @lkk/libs
# 或者
pnpm add @lkk/libs
```

## 🚀 快速开始

```javascript
import {
  formatWalletAddress,
  formatBalance,
  getChainName,
  isValidEthereumAddress
} from '@lkk/libs';

// 地址格式化
const shortAddress = formatWalletAddress('0x1234567890abcdef1234567890abcdef12345678');
console.log(shortAddress); // "0x1234...5678"

// 余额格式化
const balance = formatBalance('1500000000000000000');
console.log(balance); // "1.5000 ETH"

// 链名称获取
const chainName = getChainName(1);
console.log(chainName); // "Ethereum Mainnet"

// 地址验证
const isValid = isValidEthereumAddress('0x1234567890abcdef1234567890abcdef12345678');
console.log(isValid); // true
```

## 📚 API 文档

### 地址工具函数

#### `formatWalletAddress(address, startLength?, endLength?)`
格式化钱包地址为缩写形式

- **参数:**
  - `address` (string): 完整的钱包地址
  - `startLength` (number, 可选): 开头显示的字符数，默认 6
  - `endLength` (number, 可选): 结尾显示的字符数，默认 4
- **返回:** (string) 格式化后的地址

```javascript
formatWalletAddress('0x1234567890abcdef1234567890abcdef12345678');
// 返回: "0x1234...5678"

formatWalletAddress('0x1234567890abcdef1234567890abcdef12345678', 8, 6);
// 返回: "0x123456...345678"
```

#### `isValidEthereumAddress(address)`
验证是否为有效的以太坊地址

- **参数:** `address` (string): 要验证的地址
- **返回:** (boolean) 是否为有效地址

#### `formatTxHash(hash, startLength?, endLength?)`
格式化交易哈希为缩写形式

- **参数:** 与 `formatWalletAddress` 相同
- **返回:** (string) 格式化后的交易哈希

#### `isSameAddress(address1, address2)`
比较两个地址是否相等（忽略大小写）

- **参数:**
  - `address1` (string): 地址1
  - `address2` (string): 地址2
- **返回:** (boolean) 是否相等

### 单位转换工具函数

#### `formatEther(weiValue)`
将 Wei 转换为 Ether

- **参数:** `weiValue` (string|number): Wei 值
- **返回:** (string) Ether 值

#### `parseEther(etherValue)`
将 Ether 转换为 Wei

- **参数:** `etherValue` (string|number): Ether 值
- **返回:** (string) Wei 值

#### `formatBalance(balance, decimals?, symbol?)`
格式化余额显示

- **参数:**
  - `balance` (string|number): 余额（Wei）
  - `decimals` (number, 可选): 保留小数位数，默认 4
  - `symbol` (string, 可选): 代币符号，默认 'ETH'
- **返回:** (string) 格式化后的余额

```javascript
formatBalance('1500000000000000000', 2, 'ETH');
// 返回: "1.50 ETH"
```

#### `formatNumber(value, decimals?)`
格式化数值显示（带千分位分隔符）

- **参数:**
  - `value` (string|number): 数值
  - `decimals` (number, 可选): 保留小数位数，默认 2
- **返回:** (string) 格式化后的数值

### 链信息工具函数

#### `getChainName(chainId)`
根据链ID获取链名称

- **参数:** `chainId` (number|string): 链ID
- **返回:** (string) 链名称

#### `getChainInfo(chainId)`
根据链ID获取完整链信息

- **参数:** `chainId` (number|string): 链ID
- **返回:** (object) 链配置信息

```javascript
const chainInfo = getChainInfo(1);
console.log(chainInfo);
// 返回: {
//   name: 'Ethereum Mainnet',
//   symbol: 'ETH',
//   rpcUrl: 'https://ethereum.publicnode.com',
//   blockExplorerUrl: 'https://etherscan.io'
// }
```

#### `isTestnet(chainId)`
判断是否为测试网

- **参数:** `chainId` (number|string): 链ID
- **返回:** (boolean) 是否为测试网

#### `getExplorerLink(chainId, hash, type?)`
生成区块浏览器链接

- **参数:**
  - `chainId` (number|string): 链ID
  - `hash` (string): 交易哈希或地址
  - `type` ('tx'|'address', 可选): 类型，默认 'tx'
- **返回:** (string) 区块浏览器链接

## 🌐 支持的网络

- Ethereum Mainnet (chainId: 1)
- Sepolia Testnet (chainId: 11155111)
- Polygon Mainnet (chainId: 137)
- Polygon Mumbai (chainId: 80001)

## 📄 许可证

ISC

## 👤 作者

**likaikai** <593496637@qq.com>