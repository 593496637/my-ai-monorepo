# Web3 钱包工具 Monorepo

一个基于 Lerna + PNPM Workspaces 的 Web3 钱包工具 monorepo 项目。

## 快速开始

### 安装依赖
```bash
pnpm install
```

### 构建所有包
```bash
npm run build
```

### 启动演示应用
```bash
npm run start:demo
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `npm run build` | 构建所有包 |
| `npm run build:libs` | 只构建 @lkk/libs |
| `npm run build:hooks` | 只构建 @lkk/hooks |
| `npm run clean` | 清理所有构建文件 |
| `npm run dev` | 开发模式（watch） |
| `npm run publish:patch` | 发布补丁版本 (1.0.3 → 1.0.4) |
| `npm run publish:minor` | 发布次要版本 (1.0.3 → 1.1.0) |
| `npm run publish:major` | 发布主要版本 (1.0.3 → 2.0.0) |
| `npm run start:demo` | 启动演示应用 |

## 项目结构

```
my-ai-monorepo/
├── packages/
│   ├── lkk-libs/      # Web3 工具函数库
│   └── lkk-hooks/     # React Hooks 库
└── apps/
    └── wallet-demo/   # 演示应用
```

## 发布流程

```bash
# 1. 提交代码
git add .
git commit -m "feat: 添加新功能"

# 2. 发布到私有仓库
npm run publish:patch

# Lerna 会自动:
# - 构建所有包
# - 更新版本号
# - 生成 CHANGELOG
# - 发布到私有仓库
# - 推送到 GitHub
```

## 技术栈

- **Lerna** - Monorepo 管理
- **PNPM** - 包管理器
- **TypeScript** - 类型系统
- **Rollup** - 打包工具
- **React** - UI 框架
- **Vite** - 开发服务器
