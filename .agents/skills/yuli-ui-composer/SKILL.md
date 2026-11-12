---
name: yuli-ui-composer
description: 在 Yuli UI Lab 中，根据页面需求检索 @yuli 业务组件并生成一致的 React 页面；用于组件复用、设计资产演示和页面迭代。
---

# Yuli UI Composer

以用户指定且包含 `components.json` 和 `registry.json` 的 Yuli UI Lab 项目目录为根目录；不要修改其他项目。先读 `DESIGN.md`，再用项目内的 `npx shadcn info --json` 识别路径与已安装组件。官方组件细节在项目内 `.agents/skills/shadcn/SKILL.md`，本库品牌规则以 `DESIGN.md` 为准。

## 需求 → 资产 → 页面

1. 将需求拆成信息模块与交互。例如“项目概览、关键指标、可搜索列表”对应页头、指标卡组、项目表格。
2. 优先调用已注册的 `yuli_ui` MCP 服务（项目级名称也可能为 `shadcn`）。通过其 `search_items_in_registries` 搜索 `@yuli`，用中文场景词和英文组件名交叉查找。通过 `view_items_in_registries` 读取元数据，再用 `get_item_examples_from_registries`（query 为组件名）读取实际源代码与属性。实测当前版本的 view 只返回摘要，不返回源代码；不要根据名称猜 API。
3. 用户要求“现场真实 AI + 原生 MCP 演示”时，必须使用当前 AI 会话挂载的 MCP 工具。工具不可用时说明阻塞，不用网页组合器或脚本调用冒充原生接入。其他普通开发场景中，若会话未挂载 MCP，可运行 `node scripts/agent-context.mjs "页面需求"` 后备并如实披露渠道。
4. 先复用 `src/components/brand`，其次组合 `src/components/ui`。本库固定 Registry 为 `@yuli`，基础资产来自 `@shadcn`。缺少场景资产时说明缺口，新增小型可复用业务组件，并按 `registry.json` 同样的格式补元数据、依赖与源码路径；不要只复制一份样式。
5. 缺失组件先取得 MCP 的安装命令，再执行 `npx shadcn add @yuli/<name>`。已存在的组件直接导入；已有本地改动先查看差异。
6. 页面默认写到 `src/pages/GeneratedPage.tsx`，用户指定独立文件时遵从该路径。允许针对需求重新布局、调整文案和传入数据。浏览器里的关键词组合器仅用于演示；不要限制 AI 只能输出它的四种固定组合。
7. 执行 `npm run build`。若修改了资产，执行 `npm run registry:build`。验证相关按钮、搜索、空状态和窄屏；报告复用项、新增项、测试结果和未完成项。

## 交付事实

- 保留真实调用结果，不伪造工具日志、检索得分、已上线状态或效率增幅。
- 当前业务数据是样例；仅绑定本机地址不等于团队身份权限系统。
- 普通网页组合按钮不调用模型；由 AI 阅读 Skill、调用 MCP、编写页面才是 AI 工作流。
- 不把原始需求当可执行代码；文案以 React 字符串属性传入。
