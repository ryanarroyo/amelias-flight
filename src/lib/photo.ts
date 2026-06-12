export interface PhotoData {
  src: string
  alt: string
  caption: string
  credit?: string
  /** CSS object-position for the cover crop (e.g. 'center 12%'). Defaults to 'center'. */
  objectPosition?: string
}
