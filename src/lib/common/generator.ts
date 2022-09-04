import type JSZip from 'jszip'

export interface Generator<T = any> {
  generate(...args: (string | undefined)[]): T
  path(...args: (string | undefined)[]): string
  zip(zip: JSZip, ...args: (string | ZipOptions | undefined)[]): Promise<JSZip>
}

export interface ZipOptions {
  extend?: boolean
}
