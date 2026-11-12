# Yuli UI Lab

基于 shadcn、MCP 和 Skill 的设计资产与 AI 页面生成工作流。个人探索项目，由 Codex 协助实现；所有业务数据均为样例，没有团队提效结论。

[公开体验](https://yulili-ai.github.io/yuli-ui-lab/) · [AI 生成页面](https://yulili-ai.github.io/yuli-ui-lab/?demo=live) · [历史执行记录](https://yulili-ai.github.io/yuli-ui-lab/live-evidence.html)

## 项目说明

- 组件库保存已有实现：8 个基础组件、4 个业务模块和共享主题。
- Registry 描述名称、场景、源码与依赖，含组件、工具和主题共 14 项。
- 官方 shadcn MCP 让 Codex 搜索资产并读取真实源码，以 yuli_ui 名称接入。
- 自定义 yuli-ui-composer Skill 固化规范读取、资产检索、优先复用与验收步骤；官方 shadcn Skill 提供组件使用知识。
- Codex 理解需求并写页面；MCP 不负责生成，Skill 也不是模型训练。

## 已验证的范围

2026 年 11 月 12 日的本地执行中，Codex 成功调用 12 次 yuli_ui 原生工具，复用 PageHeader、MetricGrid、ProjectTable、ActionPanel，新增交付与撤回逻辑。TypeScript 和 Vite 构建通过；浏览器验证了交付、撤回、指标联动、搜索无结果和待交付空状态。

执行记录是历史公开节选，本机路径已移除，原始完整会话和本机配置不在仓库中。样例完成率从 40% 变成 60% 仅验证状态联动，不是业务收益。未实施企业权限、生产数据接入或团队效率对照实验。

## 本地运行

需要 Node.js 22.12+ 和 npm。

```sh
git clone https://github.com/yulili-ai/yuli-ui-lab.git
cd yuli-ui-lab
npm ci
npm run setup
npm start
```

页面服务在 http://127.0.0.1:5173 ，本地 Registry 在 http://127.0.0.1:4174 。停止服务执行 `npm stop`。Mac 可使用启动演示.command。

`npm run setup` 根据克隆路径生成 Codex 与 Cursor 项目配置。安装并登录 Codex，在信任此项目后新开会话，确认 yuli_ui MCP 已加载。项目包含官方 Skill 和自定义 Skill。

如果客户端未加载项目 MCP，可在项目目录使用 `codex mcp add yuli_ui -- npx shadcn@4.23.0 mcp --cwd "$PWD"` 注册后重新打开会话。工具不可用时应报告阻塞，不把网页规则组合冒充原生调用。

在 Codex 中输入：

> 使用 $yuli-ui-composer，做一个中文设计资产交付工作台，包含指标、可搜索项目列表、交付检查和可撤回的交付记录。必须先通过原生 yuli_ui MCP 搜索 @yuli、读取源码，沿用 DESIGN.md。复用已有组件，写入 src/pages/LiveGeneratedPage.tsx，保留 ?demo=live 入口，使用明确标注的样例数据。运行构建并验证交互，报告实际完成与未完成项。

现场AI演示.command 是 Mac 便捷入口，需要已登录且支持所用参数的 Codex；生成会使用账号额度并改写示例页。跨平台可直接在 Codex 中输入需求。

本地工作台按钮使用关键词规则和 MCP，不调用模型。真正 AI 生成在 Codex 会话执行。GitHub Pages 仅提供静态展示及浏览器内交互，不执行本地 MCP、Codex 或 /api/compose。

## 构建与发布

```sh
npm run build
npm test
npm run build:public
```

`build:public` 使用公开展示入口与 public-site 资产，输出 dist-public，部署路径为 /yuli-ui-lab/。当前 GitHub Pages 从 main 分支的 docs 目录发布；docs 是已核对的公开构建产物。更新发布时，在核对公开数据后用 dist-public 内容更新 docs，并保留 docs/.nojekyll，再提交。不要把原始会话日志或本机配置复制到 docs。

## 目录

| 路径 | 内容 |
| --- | --- |
| src/components/ui | shadcn 基础组件 |
| src/components/brand | 自有业务模块 |
| src/pages/LiveGeneratedPage.tsx | 实际 AI 生成的样例页面 |
| src/pages/PublicShowcase.tsx | 公开介绍与组件展示入口 |
| registry.json / registry-dist | 资产目录与分发文件 |
| .agents/skills | 官方和自定义 Skill |
| public-site | 经整理的公开页面与执行证据 |
| docs | GitHub Pages 部署产物 |

公开 Registry 可通过 `https://yulili-ai.github.io/yuli-ui-lab/r/{name}.json` 使用。本地默认 @yuli 仍指向本机 Registry，方便修改和验证。

本项目使用 shadcn 官方基础组件和官方 MCP，并非从零自研这些底层能力。保留 [shadcn MIT 许可](THIRD-PARTY-LICENSE-shadcn.md)。公开仓库不自动改变其他原创内容的授权范围。

参考：[Registry](https://ui.shadcn.com/docs/registry) · [MCP](https://ui.shadcn.com/docs/mcp) · [Skill](https://ui.shadcn.com/docs/skills)
