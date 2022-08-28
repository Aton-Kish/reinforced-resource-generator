import type JSZip from 'jszip'

export interface LanguageGenerator {
  generate(): Language
  path(): string
  zipSync(zip: JSZip): JSZip
}

export type Language = Record<string, string>
