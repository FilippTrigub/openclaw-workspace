# Personal Brand Agent - Research Findings

## Executive Summary

Research into OpenClaw's ecosystem for building and distributing "personal brand agent" presets/bundles.

---

## 1. Is there a marketplace for OpenClaw presets?

**Yes, there are multiple marketplaces and registries:**

### **ClawHub (clawhub.ai)** - Primary Skills Registry
- **Main public registry** for OpenClaw skills
- Versioned skill bundles with metadata
- Browse, search (vector search), and install skills
- CLI-based: `clawhub install <slug>`, `clawhub publish <path>`
- Free service, all skills public and open

### **ClawPresets (clawpresets.com)** - Curated Skill Presets
- **Ready-made skill packs** for OpenClaw agents
- Browse and install curated preset bundles
- All skills verified on ClawHub
- "One-click install" community-driven presets

### **OpenPersona (acnlabs/OpenPersona)** - Persona Framework
- **Four-layer architecture**: Soul / Body / Faculty / Skill
- Complete persona bundles (Samantha, Luna, Alex, etc.)
- Install as skill packs via `npx openpersona install <slug>`
- Generates SKILL.md files compatible with OpenClaw
- Supports soul evolution, heartbeat, ACN/A2A integration

### **OpenClawSkill.ai** - Alternative Skills Registry
- Community-driven skills marketplace
- Versioned skills with download counts
- CLI: `npx openclawskill install <slug>`

---

## 2. Established ways to bundle skills and crons

### **Method 1: Single Skill Folder (Standard)**
```
skill-name/
├── SKILL.md (YAML frontmatter + instructions)
├── metadata/ (optional configs)
└── scripts/ (optional supporting files)
```

**Metadata format in SKILL.md:**
```markdown
---
name: skill-name
description: Description
metadata:
  openclaw:
    emoji: 🎯
    requires:
      bins: ["gh"]
      env: ["GH_TOKEN"]
    install: [...]
---
```

### **Method 2: Persona Bundle (OpenPersona)**
```
persona-name/
├── SKILL.md (Four-layer index: Soul/Body/Faculty/Skill)
├── soul/ (persona.json, constitution.md, state.json)
├── body/ (runtime, appearance, interface)
├── faculties/ (voice, music, reminder, memory)
├── agent-card.json (A2A-compliant)
├── acn-config.json (ACN registration)
├── manifest.json (heartbeat, faculties, skills)
└── scripts/ (faculty scripts)
```

### **Method 3: Preset Pack (ClawPresets style)**
A bundle of multiple skills + cron configurations:
```
presets/personal-brand-agent/
├── SKILL.md (meta-skill for the brand)
├── skills/ (linked skills):
│   ├── brand-content/
│   ├── social-media/
│   └── audience-engagement/
├── crons/ (cron job definitions):
│   ├── content-publishing.json
│   └── engagement-checkin.json
└── README.md (usage instructions)
```

---

## 3. How to publish to ClawHub

### **Install CLI:**
```bash
npm i -g clawhub
```

### **Authenticate:**
```bash
clawhub login  # browser flow
# or
clawhub login --token <your-token>
```

### **Publish a single skill:**
```bash
clawhub publish ./my-skill \
  --slug my-skill \
  --name "My Skill" \
  --version 1.0.0 \
  --changelog "Initial release" \
  --tags latest,brand-agent
```

### **Publish multiple skills (sync):**
```bash
clawhub sync \
  --all \
  --bump minor \
  --changelog "Version update" \
  --tags latest
```

### **Environment variables:**
```bash
export CLAWHUB_SITE=https://clawhub.ai
export CLAWHUB_REGISTRY=https://api.clawhub.ai
export CLAWHUB_DISABLE_TELEMETRY=1  # optional
```

---

## 4. OpenClaw config for skills

### **Skill locations and precedence:**
1. **Workspace skills**: `<workspace>/skills` (highest)
2. **Managed skills**: `~/.openclaw/skills` (shared)
3. **Bundled skills**: shipped with install (lowest)

### **Per-skill config in `~/.openclaw/openclaw.json`:**
```json
{
  "skills": {
    "entries": {
      "personal-brand-agent": {
        "enabled": true,
        "env": {
          "BRAND_API_KEY": "your-key-here"
        },
        "config": {
          "brandName": "My Brand",
          "platforms": ["twitter", "linkedin"]
        }
      }
    }
  }
}
```

---

## 5. Crons for Personal Brand Agent

### **Typical cron patterns:**

**Content Publishing:**
```json
{
  "name": "daily-content-publish",
  "schedule": {
    "kind": "at",
    "at": "2026-02-28T10:00:00Z"
  },
  "payload": {
    "kind": "agentTurn",
    "message": "Publish scheduled content to all platforms",
    "model": "vllm/local"
  },
  "sessionTarget": "isolated",
  "enabled": true,
  "delivery": {
    "mode": "announce"
  }
}
```

**Engagement Check-in:**
```json
{
  "name": "engagement-checkin",
  "schedule": {
    "kind": "every",
    "everyMs": 3600000  # hourly
  },
  "payload": {
    "kind": "systemEvent",
    "text": "Check for new engagement on recent posts"
  },
  "sessionTarget": "main",
  "enabled": true,
  "delivery": {
    "mode": "none"
  }
}
```

---

## 6. Recommended structure for Personal Brand Agent

```
openclaw-workspace/
├── skills/
│   └── personal-brand-agent/
│       ├── SKILL.md
│       ├── soul/ (optional, if using persona framework)
│       ├── body/ (optional)
│       ├── faculties/ (optional)
│       ├── crons/ (cron job configs)
│       └── scripts/ (helper scripts)
├── memory/
├── AGENTS.md
├── SOUL.md
├── IDENTITY.md
├── USER.md
└── TOOLS.md
```

---

## 7. Key insights

1. **No single "preset" format** - Skills are the core unit; presets are just bundles of skills
2. **ClawHub is the primary registry** - Everyone uses it for discovery and publishing
3. **OpenPersona is the leading persona framework** - Best for brand/persona agents
4. **Crons are stored separately** - Via `cron` tool or `~/.openclaw/cron.json`
5. **Versioning matters** - ClawHub tracks versions with semver
6. **Metadata gates skills** - Use `metadata.openclaw.requires` for dependency enforcement
7. **A2A/ACN ready** - OpenPersona generates agent-card.json for network registration

---

## 8. Next steps for Personal Brand Agent

1. **Create skill folder** with `SKILL.md` defining brand persona
2. **Use persona framework** if evolution/personality desired (OpenPersona)
3. **Add cron jobs** for content scheduling and engagement
4. **Publish to ClawHub** for community distribution
5. **Consider A2A/ACN** for network discovery

---

## Sources

- [ClawHub Docs](https://docs.openclaw.ai/tools/clawhub)
- [Skills Docs](https://docs.openclaw.ai/tools/skills)
- [OpenPersona GitHub](https://github.com/acnlabs/OpenPersona)
- [ClawPresets](https://www.clawpresets.com)
- [OpenClawSkill.ai](https://openclawskill.ai/)

---

*Research completed: 2026-02-28*
