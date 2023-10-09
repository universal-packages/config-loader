import { TraverseCallback } from '@universal-packages/directory-traversal'

export type Format = 'json' | 'yaml' | 'yml' | 'js' | 'ts'
export type FormatPriority = Format[]

export interface LoadConfigOptions {
  callback?: TraverseCallback
  cleanOrphanReplaceable?: boolean
  conventionPrefix?: string
  defaultConfig?: Record<string, any>
  formatPriority?: FormatPriority
  maxDepth?: number
  selectEnvironment?: string | true
}
