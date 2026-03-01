import { describe, expect, it } from 'vitest'
import { parseStylesheet } from '../src'

describe('rule indexing', () => {
  it('indexes rules by name', () => {
    const sheet = parseStylesheet(`
      file[name="Dockerfile"] { icon: url(docker.svg); }
    `)

    expect(sheet.byName.has('Dockerfile')).toBe(true)
    expect(sheet.byName.get('Dockerfile')!.length).toBe(1)
  })

  it('indexes rules by base extension', () => {
    const sheet = parseStylesheet(`
      file[ext="ts"] { icon: url(ts.svg); }
    `)

    expect(sheet.byBaseExt.has('ts')).toBe(true)
  })

  it('indexes rules by full extension', () => {
    const sheet = parseStylesheet(`
      file[ext="test.ts"] { icon: url(test.svg); }
    `)

    expect(sheet.byFullExt.has('test.ts')).toBe(true)
  })

  it('indexes rules by type', () => {
    const sheet = parseStylesheet(`
      folder { icon: url(folder.svg); }
    `)

    expect(sheet.byType.has('folder')).toBe(true)
  })

  it('puts complex rules in generic bucket', () => {
    const sheet = parseStylesheet(`
      [ext^="test"] { color: red; }
    `)

    // No type/name/ext exact match → goes to generic
    expect(sheet.genericRules.length).toBe(1)
  })

  it('indexes type-only rules even with non-indexable attrs', () => {
    const sheet = parseStylesheet(`
      file[ext^="test"] { color: red; }
    `)

    // Has type constraint → indexed under byType['file']
    expect(sheet.byType.has('file')).toBe(true)
    expect(sheet.genericRules.length).toBe(0)
  })

  it('indexes rules by lang', () => {
    const sheet = parseStylesheet(`
      file[lang="typescript"] { icon: url(ts.svg); }
    `)

    expect(sheet.byLang.has('typescript')).toBe(true)
    expect(sheet.byLang.get('typescript')!.length).toBe(1)
  })

  it('indexes multiple rules for the same name', () => {
    const sheet = parseStylesheet(`
      file[name="Dockerfile"] { icon: url(docker.svg); }
      file[name="Dockerfile"] { badge: "D"; }
    `)

    expect(sheet.byName.get('Dockerfile')!.length).toBe(2)
  })

  it('indexes multiple extensions separately', () => {
    const sheet = parseStylesheet(`
      file[ext="ts"] { icon: url(ts.svg); }
      file[ext="js"] { icon: url(js.svg); }
      file[ext="rs"] { icon: url(rs.svg); }
    `)

    expect(sheet.byBaseExt.has('ts')).toBe(true)
    expect(sheet.byBaseExt.has('js')).toBe(true)
    expect(sheet.byBaseExt.has('rs')).toBe(true)
  })
})
