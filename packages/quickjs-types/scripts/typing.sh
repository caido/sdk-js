#!/usr/bin/env bash

echo "[*] Copying llrt typing"
rsync -av --exclude=node_modules \
      --include="fs/" \
      --include='fs/*.d.ts' \
      --include='buffer.d.ts' \
      --include='child_process.d.ts' \
      --include='dns.d.ts' \
      --include='dom-events.d.ts' \
      --include='events.d.ts' \
      --include='fs.d.ts' \
      --include='https.d.ts' \
      --include='net.d.ts' \
      --include='path.d.ts' \
      --include='abort.d.ts' \
      --include='url.d.ts' \
      --include='string_decoder.d.ts' \
      --include="stream/" \
      --include='stream/*.d.ts' \
      --include='stream.d.ts' \
      --exclude='*' \
      ../../../dependency-llrt-ng/types/ \
      ./src/llrt/

echo "[*] Copying rquickjs-extra typing"
rsync -av --exclude=node_modules \
      --include='globals.d.ts' \
      --include='os.d.ts' \
      --include='timers.d.ts' \
      --exclude='*' \
      ../../../rquickjs-extra/types/ \
      ./src/extra/
