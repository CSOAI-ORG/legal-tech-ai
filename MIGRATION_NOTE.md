# MIGRATION_NOTE - MCP 2026-07-28 wire - class `header-add`

**Date:** 2026-10-08 - **Lane:** M4 MCP-migration (header-add wave 2, batch 8) - **Branch:** `mcp-2026-wire-header-add`
**Runbook:** `MCP_2026_WIRE_MIGRATION_PLAN_2026-10-07.md` section 3 (header-add) + section 4 (the shim as bridge)
**Deprecation deadline:** the legacy wire dies **2027-07-28** - 12 months after the 2026-07-28 revision.

## 1. Transport reality

Server is TypeScript, entry `src/index.ts`, transport stdio (`StdioServerTransport`). `package.json` pins `@modelcontextprotocol/sdk`.

## 2. What changed in this branch

1. **No JS SDK pin was changed.** `package.json` keeps `@modelcontextprotocol/sdk` as-is: no release of that SDK speaks 2026-07-28, and inventing a version pin would be a false claim (wave-1 rule: no `@modelcontextprotocol/sdk` release speaks 2026-07-28).
2. `mcp2026_shim.py` vendored at the repo root (Python, stdlib, zero third-party deps) - the reference implementation of the transport middleware (`translate_request` / `translate_response`, `ShimASGI` / `ShimWSGI`) to front any future HTTP ingress.
3. `src/index.ts`: migration-note comment block above `async function main()` documenting the stdio reality, the header duties and the JS-pin gap.

4. Follow-up (not this branch): the TS server itself must learn the four runbook duties (validate `Mcp-Method` / `Mcp-Name`, emit `params._meta.protocolVersion = "2026-07-28"`, never emit `Mcp-Session-Id`) once a 2026-07-28-capable JS SDK exists, or by fronting the process with a shim ingress.

## 3. Verify

```bash
PYTHONPATH= /opt/homebrew/bin/python3.11 ~/clawd/mcp_wire_audit.py audit --local legal-tech-ai
```

| state | era | migration |
|---|---|---|
| before (default branch) | unknown | header-add |
| **after (this branch)** | **2026-07** | **handshake-removal** |
| control (migration-note block removed) | unknown | header-add |

Files changed in this branch: `mcp2026_shim.py`, `src/index.ts`, `MIGRATION_NOTE.md`. The scanner reads the source/manifest files only: it skips `mcp2026_shim.py` by design (`SELF_FILES`) and does not scan `.md`, so neither `MIGRATION_NOTE.md` nor the shim contributes signals above.

**How to read the `after` row honestly.** The scanner reads `.ts` source, so the `protocol-2026-07-28` / `mcp-method-header` / `mcp-name-header` / `session-id` signals in the `after` record come from the migration-note comment text, not from executable protocol code - the control run, which deletes only that comment block, returns to the `unknown / header-add` row above. Runtime evidence for the wire is *not yet present* in this repo: the JS SDK is untouched and stdio carries no headers. **After-rows are note-text-driven until post-merge re-audit.**

## 4. Follow-ups (not in this branch)

* Static declaration surfaces (`.well-known/*.json`, `server.json`, `README.md`, registry manifests) still declare an older wire - listed as follow-ups, not silent-edited (Art. 21: a declaration change gets its own commit).
* stdio carries no HTTP headers: `headers N/A at runtime` until the server is exposed over HTTP, where `ShimASGI` applies. A live probe per plan section 6.5 is owed after merge.

Verify command of record: `PYTHONPATH= /opt/homebrew/bin/python3.11 ~/clawd/mcp_wire_audit.py audit --local <repo>` -> `era: 2026-07`, `migration: none` is the acceptance target for class `header-add`; re-run it after merge, not on this branch's note text.

Plan: `MCP_2026_WIRE_MIGRATION_PLAN_2026-10-07.md` - deadline 2027-07-28 - measurement, not certification.
