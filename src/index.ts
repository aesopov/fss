// FSS Language — File Style Sheets
// A CSS-like language for describing how files should be rendered in a tree or panel.

// Core types
export type {
  FsNode,
  FsNodeType,
  FssValue,
  ResolvedStyle,
  CompiledStylesheet,
  CompiledRule,
  CompiledSelector,
  CompiledSimpleSelector,
  AttrCondition,
  AttrOperator,
  ColumnConfig,
  TableConfig,
  StyleLayer,
  SelectorIndexKeys,
  PseudoState,
  ThemeKind,
} from './types.js'

export { StateFlags, PSEUDO_TO_FLAG } from './types.js'

// Parser
export { parseStylesheet } from './parser.js'

// Resolver
export { resolveStyle, resolveSorting, computeStyleKey, CachedResolver } from './resolver.js'

// Layer system
export { createLayer, LayerPriority, LayeredResolver } from './layers.js'

// Helpers
export { createFsNode } from './helpers.js'
