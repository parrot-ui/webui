import * as esbuild from 'esbuild';
import * as tsup from 'tsup';
import {globSync} from "glob";

const build = async (path) => {
    const filePath = `${path}/src/index.ts`;
    const dist = `${path}/dist`;

    const esbuildConf = {
        entryPoints: [filePath],
        external: ['react', 'react-dom'],
        packages: 'external',
        bundle: true,
        sourcemap: true,
        format: 'cjs',
        target:'es2022',
        outdir: dist
    }

    await esbuild.build(esbuildConf)

    await esbuild.build({
        ...esbuildConf,
        format: 'esm',
        outExtension: { '.js': '.mjs' }
    })

    await tsup.build({
        entryPoints: [filePath],
        format: ['cjs', 'esm'],
        dts: { only: true },
        outDir: dist,
        silent: true,
        external: ['react', 'react-dom'],
    })
}

globSync('packages/*').forEach(build)
