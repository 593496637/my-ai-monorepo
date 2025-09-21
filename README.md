# My AI Monorepo

一个基于 Lerna 和 PNPM 的 AI 相关 Monorepo 项目。

## 🚀 项目结构

```
my-ai-monorepo/
├── apps/                    # 应用程序目录
├── packages/               # 包目录
│   ├── lkk-hooks/         # React Hooks 库
│   └── lkk-libs/          # 公共库
├── lerna.json             # Lerna 配置
├── pnpm-workspace.yaml    # PNPM 工作空间配置
└── package.json           # 根包配置
```

## 📦 包说明

### @lkk/libs
- **版本**: 1.0.3
- **描述**: 公共工具库，提供基础功能
- **主要功能**: 导出带有随机数的问候语字符串

### @lkk/hooks
- **版本**: 1.0.3
- **描述**: React Hooks 库
- **依赖**: @lkk/libs (workspace:*)
- **主要功能**: 使用 @lkk/libs 并在控制台输出结果

## 🛠️ 技术栈

- **包管理器**: PNPM 10.16.1
- **Monorepo 工具**: Lerna 8.2.4
- **版本管理**: 语义化版本 + 约定式提交
- **私有仓库**: http://43.252.229.237:4873

## 📋 使用方法

### 安装依赖
```bash
pnpm install
```

### 运行 hooks 包
```bash
cd packages/lkk-hooks
pnpm run dev
```

### 发布包
```bash
lerna publish
```

## 🔧 开发指南

### 工作空间结构
- `apps/*`: 应用程序
- `packages/*`: 可复用的包

### 版本管理
项目使用 Lerna 进行版本管理，支持：
- 约定式提交 (Conventional Commits)
- 自动版本号管理
- 统一发布流程

### 忽略变更文件
以下文件类型的变更不会触发版本更新：
- Markdown 文件 (*.md)
- 测试文件 (*.test.js, *.spec.js)
- 文档目录 (docs/*)
- 配置文件 (tsconfig.json, jest.config.*)

## 👤 作者

**likaikai** <593496637@qq.com>

## 📄 许可证

ISC

## 🔄 更新日志

详见各包的 CHANGELOG.md 文件。

---

> 这是一个学习项目，用于实践 Monorepo 架构和包管理。
