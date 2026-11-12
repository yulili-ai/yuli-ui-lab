#!/bin/zsh
cd -- "${0:A:h}"
if [[ ! -d node_modules ]]; then
  npm ci || exit 1
fi
npm run setup || exit 1
npm start || exit 1
open http://127.0.0.1:5173/guide.html
