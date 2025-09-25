# Web3 钱包工具 Monorepo

一个基于 Lerna 的 Web3 钱包工具 monorepo 项目，包含工具库、React Hooks 库和演示应用。

## 📦 项目结构

```
my-ai-monorepo/
├── packages/
│   ├── lkk-libs/          # Web3 工具函数库
│   ├── lkk-hooks/         # React Hooks 库
│   └── apps/
│       └── wallet-demo/   # 演示应用
├── lerna.json            # Lerna 配置
└── package.json          # 根配置
```

## 🛠️ 核心包介绍

### @lkk/libs - Web3 工具函数库

提供 Web3 开发中常用的工具函数，包括：

#### 地址格式化 (`address.ts`)
- `formatWalletAddress()` - 格式化钱包地址显示
- `isValidEthereumAddress()` - 验证以太坊地址
- `formatTxHash()` - 格式化交易哈希
- `isSameAddress()` - 比较地址是否相等

#### 单位转换 (`units.ts`)
- `formatEther()` - Wei 转 Ether
- `parseEther()` - Ether 转 Wei
- `formatBalance()` - 格式化余额显示
- `formatNumber()` - 数字格式化

#### 链管理 (`chains.ts`)
- `CHAIN_CONFIG` - 内置链配置
- `getChainName()` - 获取链名称
- `getChainInfo()` - 获取链信息
- `isTestnet()` - 判断是否测试网
- `getExplorerLink()` - 生成区块浏览器链接

### @lkk/hooks - React Hooks 库

提供 Web3 应用开发的 React Hooks：

#### 钱包连接 (`useWallet`)
```typescript
const {
  account,           // 当前账户
  chainId,          // 网络 ID
  isConnected,      // 连接状态
  connect,          // 连接钱包
  disconnect,       // 断开连接
  switchNetwork     // 切换网络
} = useWallet();
```

#### 余额查询 (`useBalance`)
```typescript
const {
  balance,          // 原始余额
  formattedBalance, // 格式化余额
  loading,          // 加载状态
  refreshBalance    // 刷新余额
} = useBalance(account, chainId);
```

#### 交易发送 (`useSendTransaction`)
```typescript
const {
  sendETH,          // 发送 ETH
  txHash,           // 交易哈希
  loading,          // 发送状态
  status,           // 交易状态
  waitForTransaction // 等待确认
} = useSendTransaction();
```

#### 状态管理 (`useWalletState`, `useCustomWalletState`)
基于 `useImmer` 的钱包状态管理，支持复杂状态更新。

#### 自定义 useImmer (`useImmer`)
基于 Proxy API 的自定义 Immer 实现，提供不可变状态更新：
```typescript
const [state, updateState] = useImmer(initialState);

updateState(draft => {
  draft.user.name = 'New Name';     // 直接修改
  draft.items.push(newItem);        // 数组操作
  draft.nested.deep.value = 123;   // 深层嵌套
});
```

## 🚀 快速开始

### 安装依赖
```bash
pnpm install
```

### 构建所有包
```bash
pnpm build
```

### 启动演示应用
```bash
cd apps/wallet-demo
pnpm dev
```

### 发布到私有仓库
```bash
lerna publish --registry http://43.252.229.237:4873
```

## 🎯 演示应用功能

演示应用展示了所有库的功能：

### 1. 钱包连接 (WalletConnect)
- MetaMask 连接/断开
- 网络信息显示
- 账户地址格式化显示

### 2. 余额查询 (BalanceDisplay)
- 实时余额查询
- 格式化显示
- 手动刷新功能

### 3. 转账功能 (SendTransaction)
- ETH 转账
- 交易状态跟踪
- 交易哈希显示

### 4. 状态管理演示 (StateManager)
- useImmer 状态更新
- 复杂对象操作
- 数组增删改查

### 5. 网络切换 (NetworkSwitcher)
- 支持多网络切换
- 主网/测试网识别
- 网络信息显示

### 6. 工具函数演示 (UtilsDemo)
- 所有工具函数交互测试
- 实时结果显示
- 参数可调整

### 7. 事件日志 (EventLogger)
- 钱包事件监听
- 实时日志显示
- 事件过滤功能

## 🏗️ 技术栈

- **构建工具**: Rollup + TypeScript
- **包管理**: Lerna + PNPM Workspaces
- **前端框架**: React 18 + Vite
- **样式**: CSS Modules
- **Web3**: 原生 MetaMask API
- **状态管理**: 自定义 useImmer Hook
- **类型检查**: TypeScript 5.x

## 📝 开发指南

### 添加新功能到 @lkk/libs
1. 在 `packages/lkk-libs/src/` 下添加新模块
2. 在 `index.ts` 中导出
3. 运行 `pnpm build` 构建
4. 更新版本号并发布

### 添加新 Hook 到 @lkk/hooks
1. 在 `packages/lkk-hooks/src/` 下添加新 Hook
2. 在 `index.ts` 中导出
3. 运行 `pnpm build` 构建
4. 在演示应用中添加使用示例

### 项目架构特点

#### 🔧 自定义 useImmer 实现
项目包含完整的 useImmer 自定义实现，展示了：
- Proxy API 的高级用法
- 不可变数据结构设计
- React Hooks 最佳实践
- 深层对象/数组操作

#### 🌐 原生 Web3 集成
直接使用 MetaMask 原生 API，无第三方依赖：
- 纯净的 Web3 实现
- 完整的类型定义
- 错误处理最佳实践
- 事件监听管理

#### 📦 完整的 Monorepo 架构
- Lerna 版本管理
- PNPM Workspaces 依赖优化
- TypeScript 多包类型共享
- 统一的构建流程

## 🚢 部署

### 私有 NPM 仓库配置
```bash
# 设置私有仓库
npm config set registry http://43.252.229.237:4873

# 发布包
lerna publish
```

### 生产构建
```bash
# 构建所有包
pnpm build

# 构建演示应用
cd apps/wallet-demo
pnpm build
```

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目使用 ISC 许可证。

## 🎓 学习资源

本项目是 Web3 前端开发的完整教学案例，涵盖：

- **Monorepo 架构设计**
- **TypeScript 最佳实践**
- **React Hooks 高级用法**
- **Web3 集成方案**
- **状态管理模式**
- **工具库设计思想**

适合作为 Web3 前端开发的学习参考和项目模板。

---

> 这是一个沉浸式 Web3 前端开发教学项目，涵盖从基础工具库到复杂状态管理的完整实现。