#!/usr/bin/env bash

echo "[*] Copying llrt typing"
rsync -av --exclude=node_modules \
      --include='fs/*.d.ts' \
      --include='buffer.d.ts' \
      --include='child_process.d.ts' \
      --include='dom-events.d.ts' \
      --include='events.d.ts' \
      --include='fs.d.ts' \
      --include='net.d.ts' \
      --include='os.d.ts' \
      --include='path.d.ts' \
      --exclude='*' \
      ../../../dependency-llrt/types/ \
      ./src/llrt/

echo "[*] Copying rquickjs-extra typing"
rsync -av --exclude=node_modules \
      --include='sqlite.d.ts' \
      --include='timers.d.ts' \
      --include='url.d.ts' \
      --exclude='*' \
      ../../../rquickjs-extra/types/ \
      ./src/extra/
