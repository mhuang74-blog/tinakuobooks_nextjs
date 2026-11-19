## Agent skills

### Issue tracker

Issues and specs live as GitHub issues, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `CONTEXT.md` at the repo root plus `docs/adr/`. See `docs/agents/domain.md`.

### GitHub auth

Writes to `mhuang74-blog` repos — opening or editing pull requests, PR comments — use the fine-grained token in `GITHUB_PAT_MHUANG74BLOG` (`~/.zshrc`, single-quoted), passed per command as `GH_TOKEN`:

```sh
v=$(grep -m1 '^GITHUB_PAT_MHUANG74BLOG=' ~/.zshrc); v=${v#*=}; v=${v#\'}; v=${v%\'}
GH_TOKEN="$v" gh pr create --base main --head <branch>
```

The stored credential in `~/.config/gh/hosts.yml` covers reads (`gh pr list`, `gh api`) and git pushes over SSH, and answers the pull-request write endpoints with `403 Resource not accessible by personal access token`. Keep `GH_TOKEN` scoped to the command so `hosts.yml` stays the default.

## Dev server

One `next dev` per checkout. Next 16 enables `experimental.lockDistDir`, so `.next/dev/lock` makes a second server in this directory exit 1 with `⨯ Another next dev server is already running` — the port does not matter, `--port 3100` included. The lock is an OS file lock: a leftover `lock` file from a dead process does not block a fresh start.

Stop the server with the PID it printed (`- PID: <n>`) or `kill "$(jq -r .pid .next/dev/lock)"`. Never `pkill -f 'next dev'` or `killall node`: those patterns also match the user's foreground `pnpm dev` and other agents' shells in this directory.

`pnpm dev` ending in `ELIFECYCLE  Command failed.` (exit 143) with no Next error means the `pnpm → sh -c next dev → node next dev → next-server` chain received SIGTERM from outside. It is not a code, config, or dependency failure.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
