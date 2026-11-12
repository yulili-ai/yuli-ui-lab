---
name: Yuli UI
version: 0.1.0
status: local-demo
---

# Yuli UI 品牌与复用规范

面向中文产品与设计协作工具。风格克制、清晰，以钴蓝强调主要动作，以留白组织信息。

## 唯一的样式来源

`src/index.css` 的 `:root` 与 `@theme inline` 是品牌变量来源。页面使用 `bg-background`、`text-foreground`、`text-muted-foreground`、`bg-primary` 等语义类，不在页面里写新的色值。组件层可以定义文字层级，页面只通过布局与属性组合。

| 角色 | 当前值 | 用法 |
| --- | --- | --- |
| primary | #3455d1 | 主动作、选中项 |
| background | #f7f8fa | 页面底色 |
| foreground | #242830 | 主要文字 |
| card | #ffffff | 内容表面 |
| muted-foreground | #737b89 | 辅助说明 |
| radius | 12px | 基础圆角 |

间距使用 4 / 8 / 16 / 24 / 32px；中文系统字体；层级为页标题、模块标题、正文、辅助说明。桌面可三列指标，小屏叠放。

## 当前业务资产

- `PageHeader`：必填 `title`、`description`；可选 `eyebrow`。用来交代页面用途。
- `MetricGrid`：可传 `items: {label, value, note}[]`。默认均为演示数据，不表示真实团队效率。
- `ProjectTable`：内置样例项目，提供名称搜索与无结果反馈；不连接真实项目系统。
- `ActionPanel`：交付检查清单与本次会话内的完成标记，不持久化。

## 复用与新增

业务组件优先于直接使用基础组件。新需求可以调整页面布局和数据；不得为了视觉相似复制现有组件源码。基础控件使用既有 Button / Badge / Card 等 API，先读实际源码再组合。新增资产需记录名称、用途、依赖、版本、维护者；变更后重新构建 Registry。版本为当前元数据，尚未实现多版本发布服务。

## 已知边界

本阶段只提供亮色主题；暗色模式、Figma 双向同步、团队账号与权限、生产数据连接、团队使用统计尚未实现。未做全面 WCAG 审计。新增页面至少保留标签、键盘焦点、搜索空结果和动作反馈。
