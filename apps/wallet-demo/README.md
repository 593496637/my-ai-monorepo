# Wallet Demo

> Web3 钱包 Hooks 演示应用

## 🎯 项目简介

这是一个基于 `@lkk/hooks` 和 `@lkk/libs` 构建的 Web3 钱包演示应用，展示了完整的钱包集成功能。

## ✨ 功能特性

### 🔌 钱包连接
- MetaMask 自动检测和安装提示
- 一键连接/断开钱包
- 实时网络状态显示
- 地址格式化显示

### 💰 余额管理
- 实时 ETH 余额查询
- Wei/Ether 单位自动转换
- 手动刷新余额功能
- 原始数据展示

### 💸 交易功能
- ETH 转账功能
- 交易状态实时追踪
- Gas Limit 自定义设置
- 区块浏览器集成

### 🔄 状态管理
- 基于自定义 useImmer 的状态管理
- 待处理交易队列
- 交易历史记录
- 实时状态数据展示

## 🛠️ 技术栈

- **React 18** - 前端框架
- **Vite** - 构建工具
- **@lkk/hooks** - Web3 钱包 Hooks
- **@lkk/libs** - 工具函数库
- **MetaMask** - 钱包提供商

## 🚀 快速开始

### 安装依赖
```bash
cd apps/wallet-demo
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

### 构建生产版本
```bash
pnpm build
```

### 预览生产版本
```bash
pnpm preview
```

## 📱 使用指南

1. **安装 MetaMask**
   - 如果未安装 MetaMask，应用会提供安装链接

2. **连接钱包**
   - 点击 "连接钱包" 按钮
   - 在 MetaMask 中确认连接

3. **查看余额**
   - 连接成功后自动显示 ETH 余额
   - 可手动刷新获取最新余额

4. **发送交易**
   - 填写接收地址和金额
   - 可选择设置 Gas Limit
   - 点击发送并在 MetaMask 中确认

5. **状态管理演示**
   - 添加模拟交易观察状态变化
   - 查看待处理和历史交易
   - 展开原始状态数据查看

## 🎨 界面预览

应用采用现代化设计，包含：
- 渐变背景和毛玻璃效果
- 响应式网格布局
- 平滑的动画过渡
- 直观的状态指示器

## 🔗 相关包

- [@lkk/hooks](../packages/lkk-hooks/) - React Hooks 库
- [@lkk/libs](../packages/lkk-libs/) - 工具函数库

## 📄 许可证

ISC

## 👤 作者

**likaikai** <593496637@qq.com>