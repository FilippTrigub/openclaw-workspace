# openclaw-marketing

> AI Marketing Agency CLI for OpenClaw

Transform your OpenClaw instance into an AI-powered marketing agency with automated content creation, campaign management, lead generation, and analytics.

## 🚀 Features

- **Content Creation**: Generate social posts, emails, ads, and more
- **Multi-Channel**: Post to Telegram, WhatsApp, Signal, Discord, and more
- **Campaign Management**: Launch, schedule, and optimize campaigns
- **Lead Generation**: Scrape, outreach, and nurture leads
- **Analytics**: Track performance and generate reports

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/openclaw/openclaw-marketing.git
cd openclaw-marketing

# Install dependencies
pnpm install

# Link to OpenClaw
openclaw skills link ./src
```

## 🛠️ Usage

### Setup

```bash
# Onboarding
openclaw marketing onboarding

# Learn brand voice
openclaw marketing learn-voice --source=./content
```

### Content

```bash
# Create social posts
openclaw marketing content create --type=social --count=10

# Bulk content generation
openclaw marketing content bulk --count=50 --days=7
```

### Campaigns

```bash
# Launch campaign
openclaw marketing campaign launch --channels=telegram,whatsapp

# Schedule posts
openclaw marketing campaign schedule --date=2026-03-01
```

### Analytics

```bash
# View metrics
openclaw marketing analytics --period=30d

# Generate report
openclaw marketing report --format=pdf
```

## 📖 Documentation

- [CLI Specification](CLI-SPECIFICATION.md)
- [Marketing Research](research/ai-marketing-agency-research.md)

## 🤝 Contributing

Contributions welcome! This is a hackathon project, so we're building fast and iterating.

## 📄 License

MIT

---

Built for the Paris OpenClaw Hackathon 2026 🎯
