# @lkk/ui

React UI 组件库

## 📦 安装

```bash
pnpm add @lkk/ui
```

## 🚀 使用

```tsx
import { Button } from '@lkk/ui';
import '@lkk/ui/dist/styles.css';

function App() {
  return (
    <Button type="primary" onClick={() => console.log('clicked')}>
      点击我
    </Button>
  );
}
```

## 📚 组件列表

### Button 按钮

基础按钮组件，支持多种类型和尺寸。

**Props:**

- `type`: 按钮类型 - `'primary' | 'secondary' | 'danger'`
- `size`: 按钮尺寸 - `'small' | 'medium' | 'large'`
- `disabled`: 是否禁用
- `loading`: 是否加载中
- `onClick`: 点击事件处理函数

**示例:**

```tsx
<Button type="primary" size="medium">
  主要按钮
</Button>

<Button type="secondary" size="small">
  次要按钮
</Button>

<Button type="danger" disabled>
  删除
</Button>

<Button type="primary" loading>
  加载中
</Button>
```

## 🎨 Storybook

查看所有组件的交互式文档：

```bash
pnpm storybook
```

## 🛠️ 开发

```bash
# 开发模式（监听文件变化）
pnpm dev

# 构建
pnpm build

# 清理构建文件
pnpm clean
```

## 📝 目录结构

```
lkk-ui/
├── src/
│   ├── components/     # 组件源码
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.css
│   │       └── index.ts
│   ├── styles/        # 全局样式
│   │   └── index.css
│   └── index.ts       # 入口文件
├── stories/           # Storybook 文档（与组件分离）
│   └── Button.stories.tsx
├── .storybook/        # Storybook 配置
├── dist/              # 构建输出
├── package.json
├── rollup.config.js
└── tsconfig.json
```

## 🎯 设计原则

1. **组件与文档分离**: 组件实现在 `src/components`，Storybook 文档在 `stories/`
2. **类型安全**: 所有组件都有完整的 TypeScript 类型定义
3. **样式隔离**: 使用 CSS 模块化，避免样式冲突
4. **按需加载**: 支持 ESM 和 CommonJS，便于 tree-shaking

## 📄 License

ISC
