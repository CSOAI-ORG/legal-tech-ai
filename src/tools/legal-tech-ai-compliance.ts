/**
 * legal_tech_ai_compliance.ts — Part of @csoai MCP Ecosystem
 * Copyright (c) 2026 CSGA Global. All rights reserved.
 * License: CC0-1.0 | Build: 2026-02-26T06:00:00Z
 * LEGAL NOTICE: Advisory only. Not legal or compliance advice.
 */

export interface handleLegalTechAiComplianceResult {
  system_name: string;
  risk_classification: string;
  risk_level: string;
  applicable_regulations: string[];
  compliance_requirements: string[];
  technical_requirements: string[];
  remediation: string[];
  casa_tier: string;
}

export function handleLegalTechAiCompliance(
  systemName: string,
  aiFunction: string,
  clientImpact: string,
  confidentialityScope: string,
  jurisdiction: string
): handleLegalTechAiComplianceResult {
  const jurLower = jurisdiction.toLowerCase();
  const fnLower = aiFunction.toLowerCase();

  let riskClassification = "Standard legal tech ai AI use";
  let riskLevel = "MEDIUM";

  // Risk escalation based on function and jurisdiction
  if (fnLower.includes("autonomous") || fnLower.includes("automated") || fnLower.includes("decision")) {
    riskClassification = "HIGH RISK — Autonomous/automated decision-making requires enhanced oversight";
    riskLevel = "HIGH";
  }
  if (fnLower.includes("surveillance") || fnLower.includes("biometric") || fnLower.includes("facial")) {
    riskClassification = "CRITICAL RISK — Biometric/surveillance AI triggers strictest regulatory requirements";
    riskLevel = "CRITICAL";
  }

  const regulations: string[] = [];
  if (jurLower.includes("eu") || jurLower.includes("europe")) {
    regulations.push("EU AI Act — High-risk AI system classification and conformity assessment");
    regulations.push("GDPR — Data protection impact assessment for AI processing");
    regulations.push("EU Digital Services Act — Platform obligations where applicable");
  }
  if (jurLower.includes("us") || jurLower.includes("united states")) {
    regulations.push("FTC Act Section 5 — Unfair or deceptive AI practices");
    regulations.push("NIST AI RMF — AI risk management framework (voluntary)");
    regulations.push("State AI laws — Colorado AI Act, Illinois BIPA where applicable");
  }
  if (jurLower.includes("uk")) {
    regulations.push("UK AI Safety Institute — AI safety evaluation requirements");
    regulations.push("UK GDPR — Data protection for AI systems");
    regulations.push("UK regulatory sandbox frameworks where applicable");
  }
  if (jurLower.includes("china")) {
    regulations.push("China AI governance regulations — Algorithm recommendation and generative AI rules");
    regulations.push("China PIPL — Personal information protection for AI processing");
  }
  if (regulations.length === 0) {
    regulations.push("General consumer protection and data privacy laws apply");
    regulations.push("Industry-specific regulations for legal tech ai");
  }

  const compliance: string[] = [
    "Conduct AI impact assessment before deployment",
    "Implement human oversight mechanism for high-stakes decisions",
    "Maintain AI system documentation and audit trail",
    "Establish incident reporting and response procedures",
    "Regular bias and fairness auditing across protected characteristics"
  ];

  if (riskLevel === "CRITICAL" || riskLevel === "HIGH") {
    compliance.push("EU AI Act conformity assessment required for high-risk classification");
    compliance.push("Data Protection Impact Assessment (DPIA) mandatory");
    compliance.push("Appoint AI governance officer or responsible person");
  }

  const technical: string[] = [
    "Model versioning and reproducibility for regulatory audit",
    "Input validation and output filtering for safety-critical decisions",
    "Logging and monitoring of all AI-driven decisions",
    "Adversarial robustness testing appropriate to deployment context",
    "Failsafe/fallback mechanisms for AI system failures"
  ];

  const remediation: string[] = [];
  if (riskLevel === "CRITICAL") {
    remediation.push("URGENT: Conduct comprehensive regulatory review before deployment");
    remediation.push("Commission independent third-party AI safety audit");
    remediation.push("Implement mandatory human-in-the-loop for all critical decisions");
  } else if (riskLevel === "HIGH") {
    remediation.push("Conduct DPIA and update data processing agreements");
    remediation.push("Implement enhanced monitoring and alerting for AI decisions");
    remediation.push("Establish regular (quarterly) compliance review cycle");
  }
  remediation.push("Maintain comprehensive AI system documentation per EU AI Act Art. 11");
  remediation.push("Establish stakeholder engagement process for affected communities");
  remediation.push("Monitor evolving regulatory requirements in operating jurisdictions");

  let casaTier = "CASA Tier 1 — Startup ($5K-$25K/yr)";
  if (riskLevel === "CRITICAL") {
    casaTier = "CASA Tier 3 — Enterprise ($75K-$200K/yr)";
  } else if (riskLevel === "HIGH") {
    casaTier = "CASA Tier 2 — Professional ($25K-$75K/yr)";
  } else if (riskLevel === "MEDIUM") {
    casaTier = "CASA Tier 2 — Professional ($25K-$75K/yr)";
  }

  return {
    system_name: systemName,
    risk_classification: riskClassification,
    risk_level: riskLevel,
    applicable_regulations: regulations,
    compliance_requirements: compliance,
    technical_requirements: technical,
    remediation,
    casa_tier: casaTier
  };
}
