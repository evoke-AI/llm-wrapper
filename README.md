# LLM Wrapper

> **Re-imagine LLMs with intuitive tools**

LLM Wrapper is a modern web application that provides intuitive interfaces for interacting with various Large Language Models (LLMs) and AI services. Built with Next.js 15 and designed with user experience in mind, it transforms complex AI capabilities into accessible, user-friendly tools.

## 🌟 Vision

Our goal is to bridge the gap between powerful AI technologies and everyday users by creating tools that are:
- **Intuitive** - No technical expertise required
- **Powerful** - Leveraging cutting-edge AI models
- **Accessible** - Beautiful, responsive interfaces
- **Extensible** - Modular architecture for easy expansion

## 🚀 Features

### 🗾 Japanese TTS (Text-to-Speech)
**Status:** ✅ Available  
**Description:** Transform any text into natural Japanese speech using OpenAI's advanced audio models.

- **Real-time translation** from any language to Japanese
- **Multiple voice options** (alloy, echo, fable, onyx, nova, shimmer)
- **Streaming audio generation** for instant feedback
- **High-quality audio output** with proper WAV formatting
- **Responsive design** for desktop and mobile

[📖 Detailed Documentation](./readme/japanese-tts.md) | [🔧 Technical Architecture](./server/src/app/tools/japanese-tts/README.md)

### 🏫 Learn Japanese  
**Status:** 🚧 Coming Soon  
**Description:** Interactive Japanese language learning powered by AI.

- Personalized learning paths
- AI conversation practice
- Grammar and vocabulary exercises
- Cultural context insights

### 🌐 Catch the Essence (Language Translator)
**Status:** 🚧 Coming Soon  
**Description:** Advanced translation that captures context, tone, and cultural nuances.

- Context-aware translations
- Tone and style preservation
- Cultural adaptation
- Multi-language support

## 🏗️ Architecture

### Technology Stack
- **Frontend:** Next.js 15, React, TypeScript
- **Styling:** Tailwind CSS
- **AI Integration:** OpenAI API
- **Audio Processing:** Web Audio API, custom WAV conversion
- **Package Management:** pnpm

### Design Principles
- **Modular Architecture** - Each tool is self-contained
- **Component-Based Design** - Reusable UI components
- **Custom Hooks** - Encapsulated business logic
- **Type Safety** - Full TypeScript coverage
- **Performance** - Optimized for speed and efficiency

### Project Structure
```
llm-wrapper/
├── server/                 # Next.js application
│   ├── src/app/
│   │   ├── page.tsx       # Main dashboard
│   │   ├── api/           # API routes
│   │   └── tools/         # Individual tool implementations
│   └── public/            # Static assets
├── readme/                # Documentation
└── README.md             # This file
```

## 🛠️ Development

### Prerequisites
- Node.js 18+
- pnpm (recommended package manager)

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd llm-wrapper

# Install dependencies
cd server
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your OpenAI API key to .env.local

# Start development server
pnpm dev
```

### Environment Variables
```env
OPENAI_API_KEY=your_openai_api_key_here
```

## 📖 Documentation

### Feature Documentation
- [Japanese TTS Tool](./readme/japanese-tts.md) - Complete user guide and features
- [Component Architecture](./server/src/app/tools/japanese-tts/README.md) - Technical implementation details

### Development Guides
- [Contributing Guidelines](./readme/contributing.md) *(Coming Soon)*
- [API Documentation](./readme/api.md) *(Coming Soon)*
- [Deployment Guide](./readme/deployment.md) *(Coming Soon)*

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] Project setup and architecture
- [x] Japanese TTS tool implementation
- [x] Responsive dashboard design
- [x] Modular component architecture

### Phase 2: Language Learning 🚧
- [ ] Japanese learning tool
- [ ] Interactive exercises
- [ ] Progress tracking
- [ ] AI conversation practice

### Phase 3: Advanced Translation 🚧
- [ ] Context-aware translation
- [ ] Multi-language support
- [ ] Cultural adaptation features
- [ ] Tone preservation

### Phase 4: Platform Expansion 📋
- [ ] Mobile application
- [ ] Offline capabilities
- [ ] Additional AI model integrations
- [ ] Custom tool builder

## 🤝 Contributing

We welcome contributions! Whether it's:
- 🐛 Bug reports
- 💡 Feature suggestions
- 📝 Documentation improvements
- 🔧 Code contributions

Please check our [Contributing Guidelines](./readme/contributing.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website:** [LLM Wrapper](https://llm-wrapper.vercel.app) *(Coming Soon)*
- **Company:** [Evoke AI](https://evoke-ai.co)
- **Support:** [Issues](https://github.com/your-org/llm-wrapper/issues)

---

<div align="center">
  <strong>Built with ❤️ by <a href="https://evoke-ai.co">Evoke AI</a></strong>
  <br>
  <em>Making AI accessible to everyone</em>
</div>
