import { $ } from 'bun'
import { build, type Options } from 'tsup'
import { fixImportsPlugin } from 'esbuild-fix-imports-plugin'

await $`rm -rf dist`

const external = ['fast-decode-uri-component']

await build({
    entry: ['src/**/*.ts'],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    target: 'node20',
    minifySyntax: true,
    minifyWhitespace: false,
    minifyIdentifiers: false,
    splitting: false,
    sourcemap: false,
    cjsInterop: false,
    clean: true,
    bundle: false,
    external,
    esbuildPlugins: [fixImportsPlugin()]
})

await $`tsc --project tsconfig.dts.json`

process.exit()
