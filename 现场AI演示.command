#!/bin/zsh
cd -- "${0:A:h}"
echo 'Yuli UI · 真实 Codex + MCP + Skill 演示'
echo '会使用已登录的 Codex 账号生成代码，并消耗该账号的正常额度。'
echo '留空将使用「设计资产交付工作台」示例需求。'
read -r 'yuli_request?请输入页面需求：'
if [[ -z "$yuli_request" ]]; then
  yuli_request='做一个设计资产交付工作台，包含指标、可搜索项目列表、交付检查，以及可切换待交付和已交付的记录。操作记录后指标同步更新。使用明确标注的本地样例数据。'
fi
npm start || exit 1
yuli_codex="$(command -v codex)"
if [[ -z "$yuli_codex" && -x /Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex ]]; then
  yuli_codex=/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex
fi
if [[ -z "$yuli_codex" ]]; then
  echo '请先安装并登录 Codex，再运行现场演示。'
  exit 1
fi
printf '%s\n' \
  '使用 $yuli-ui-composer，先读项目 Skill 和 DESIGN.md。' \
  '必须调用当前会话原生挂载的 yuli_ui MCP 搜索 @yuli，并读取组件元数据和示例源码。若不可用则报告阻塞；不要用网页规则组合器、/api/compose 或脚本 MCP 客户端替代。' \
  "页面需求：$yuli_request" \
  '在本项目内复用现有组件实现页面，写入 src/pages/LiveGeneratedPage.tsx，并保留 ?demo=live 入口。保留其他页面。不要修改全局设置、发布网站或读取凭据。运行 npm run build，报告真实复用项、交互和检查结果。' \
  | "$yuli_codex" exec --ephemeral --skip-git-repo-check --approve-for-me -C "$PWD" -
if [[ $? -eq 0 ]]; then
  open 'http://127.0.0.1:5173/?demo=live'
fi
read -r '?按回车关闭此窗口。'
