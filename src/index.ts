/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * @csoai/legal-tech-ai
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * Part of the CSGA Global MCP Ecosystem.
 *
 * LEGAL NOTICE: This software is provided for informational and advisory
 * purposes only. It does not constitute legal, regulatory, or professional
 * compliance advice. Users should consult qualified legal counsel for
 * jurisdiction-specific compliance requirements.
 *
 * License: CC0-1.0 (Creative Commons Zero v1.0 Universal)
 * SPDX-License-Identifier: CC0-1.0
 *
 * Build Timestamp: 2026-02-26T06:00:00Z
 * Last Modified:   2026-02-26T06:00:00Z
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { handleLegalTechAiCompliance } from "./tools/legal-tech-ai-compliance.js";

const server = new McpServer({
  name: "csoai-legal-tech-ai-mcp",
  version: "1.0.0"
});

// Schemas extracted to avoid TS2589 deep instantiation
const LegalTechAiComplianceShape = {
  system_name: z.string().describe("Name of legal AI system"),
  ai_function: z.string().describe("Function (contract analysis, e-discovery, legal research, case prediction, document drafting)"),
  client_impact: z.string().describe("Client impact (case outcome, legal rights, financial, liberty, custody)"),
  confidentiality_scope: z.string().describe("Confidentiality (attorney-client privilege, work product, PII, trade secrets)"),
  jurisdiction: z.string().describe("Operating jurisdiction (US/ABA, EU, UK/SRA, etc.)"),
};

// ─── Tool 1: legal_tech_ai_compliance ───
(server.tool as any)(
  "legal_tech_ai_compliance",
  "Assess compliance for AI in legal technology. Covers unauthorized practice of law, confidentiality, bias in case prediction, and e-discovery obligations.",
  LegalTechAiComplianceShape,
  async (args: any) => {
    const result = handleLegalTechAiCompliance(args.system_name, args.ai_function, args.client_impact, args.confidentiality_scope, args.jurisdiction);
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
