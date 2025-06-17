# Japanese TTS Component Architecture

## Overview
This document describes the refactored Japanese Text-to-Speech (TTS) component architecture, split from a monolithic 420-line file into a modular, maintainable structure following Domain-Driven Design principles.

## Refactor Rationale
The original `page.tsx` contained multiple responsibilities:
- Audio processing (WAV conversion, PCM16 handling)
- Streaming logic (SSE handling, API communication)
- UI rendering (forms, status indicators, results display)
- State management (TTS state, audio playback state)
- Utility functions (audio format conversion)

This violated Single Responsibility Principle and made the code difficult to maintain, test, and extend.

## New Architecture

### Foundation Layer
- **`types.ts`** - All TypeScript interfaces and type definitions
- **`constants.ts`** - Configuration constants, voice options, API endpoints
- **`utils.tsx`** - Pure utility functions for audio processing (WAV conversion, chunk management)

### Business Logic Layer (Custom Hooks)
- **`hooks/useAudioPlayback.ts`** - Complete audio playback state management
  - Audio chunk accumulation and processing
  - WAV blob creation and URL management  
  - Playback controls and error handling
  - Resource cleanup and memory management

- **`hooks/useJapaneseTTS.ts`** - Main TTS orchestration hook
  - Input text and settings management
  - Streaming API communication
  - SSE data processing and routing
  - Integration with audio playback hook
  - Error handling and state coordination

### UI Component Layer
- **`components/TTSHeader.tsx`** - Navigation header with branding
- **`components/TTSInputForm.tsx`** - Text input, voice selection, generate button
- **`components/TTSStatusIndicators.tsx`** - Error messages and streaming status
- **`components/TTSResults.tsx`** - Translation display and audio player

### Main Component
- **`page.tsx`** - Composition and coordination only (~45 lines)
  - Uses custom hooks for all business logic
  - Renders standalone UI components
  - No duplicate state or function implementations

## Key Design Decisions

### Complete Hook Integration
The main component uses hooks properly without duplicating their logic:
```tsx
const tts = useJapaneseTTS(); // All business logic encapsulated
return <TTSInputForm {...tts} />; // Props-based composition
```

### Standalone Components
Each UI component is completely self-contained:
- Accepts all needed data via props
- Manages only internal UI state
- No direct access to parent component state
- Reusable across different contexts

### Domain Separation
Audio processing and TTS logic are cleanly separated:
- `useAudioPlayback` - Pure audio concerns (playback, chunks, WAV conversion)
- `useJapaneseTTS` - TTS business logic (API, streaming, translation)

### Resource Management
Proper cleanup and memory management:
- Audio URLs properly revoked to prevent memory leaks
- Event listeners cleaned up appropriately
- Component unmounting handles resource disposal

## File Structure
```
japanese-tts/
├── page.tsx                 # Main component (45 lines)
├── types.ts                 # Type definitions
├── constants.ts             # Configuration
├── utils.tsx                # Pure functions
├── hooks/
│   ├── useAudioPlayback.ts  # Audio management
│   └── useJapaneseTTS.ts    # TTS orchestration
├── components/
│   ├── TTSHeader.tsx        # Navigation header
│   ├── TTSInputForm.tsx     # Input and controls
│   ├── TTSStatusIndicators.tsx # Status display
│   └── TTSResults.tsx       # Results display
└── README.md               # This documentation
```

## Success Metrics Achieved
- ✅ **Main component reduced from 420 lines to 45 lines** (89% reduction)
- ✅ **No duplicate state or function implementations**
- ✅ **Each file has single, clear responsibility**
- ✅ **All extracted components are completely standalone**
- ✅ **Custom hooks encapsulate complete domain logic**
- ✅ **All functionality works exactly as before**

## Benefits
1. **Maintainability** - Each concern is isolated and easy to modify
2. **Testability** - Pure functions and isolated hooks are easy to test
3. **Reusability** - Components and hooks can be reused in other contexts
4. **Scalability** - New features can be added without affecting existing code
5. **Developer Experience** - Clear separation makes code easier to understand

## State Management Philosophy
Follows the principle of using local state (`useState`) for simple UI concerns and custom hooks (similar to Zustand stores) for complex domain logic:

- **Local State**: UI toggles, form inputs, loading states
- **Custom Hooks**: Business logic, API communication, complex state coordination
- **Props Flow**: Unidirectional data flow from hooks to components

## References
- Applied principles from `01.core-rules.mdc` (Single Responsibility Principle)
- Followed `98.split-large-files.mdc` (One-shot large file split process)
- Implemented `02.state-management-rule.mdc` (Custom hooks for complex state)
- Used `02.js-ts-rule.mdc` (TypeScript best practices) 