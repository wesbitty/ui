import babel from '@rollup/plugin-babel'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss-modules'
import del from 'rollup-plugin-delete'
import pkg from './package.json'
import typescript from 'rollup-plugin-typescript2'
// so JS can be rolled with TS
// remove when JS files have been removed
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import icons from './assets/icons'

console.log('Expected Externals', [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  './stories',
])

const extensions = ['.js', '.jsx', '.ts', '.tsx']

export default {
  input: {
    index: 'stories/index.tsx',
    // avatar: 'stories/components/Avatar/index.tsx',
    button: 'stories/components/Button/index.tsx',
    typography: 'stories/components/Typography/index.tsx',
    icon: 'stories/components/Icon/index.tsx',
    image: 'stories/components/Image/index.tsx',
    card: 'stories/components/Card/index.tsx',
    badge: 'stories/components/Badge/index.tsx',
    alert: 'stories/components/Alert/index.tsx',
    accordion: 'stories/components/Accordion/index.tsx',
    tabs: 'stories/components/Tabs/index.tsx',
    menu: 'stories/components/Menu/index.tsx',
    modal: 'stories/components/Modal/index.tsx',
    modal: 'stories/components/Popover/index.tsx',
    sidepanel: 'stories/components/SidePanel/index.tsx',
    dropdown: 'stories/components/Dropdown/index.tsx',
    contextmenu: 'stories/components/ContextMenu/index.tsx',
    space: 'stories/components/Space/index.tsx',
    loading: 'stories/components/Loading/index.tsx',
    divider: 'stories/components/Divider/index.tsx',
    select: 'stories/components/Select/index.tsx',
    listbox: 'stories/components/Listbox/index.tsx',
    checkbox: 'stories/components/Checkbox/index.tsx',
    input: 'stories/components/Input/index.tsx',
    radio: 'stories/components/Radio/index.tsx',
    toggle: 'stories/components/Toggle/index.tsx',
    upload: 'stories/components/Upload/index.tsx',
    auth: 'stories/components/Auth/index.tsx',
    ...icons,
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    './stories',
  ],
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'stories',
      exports: 'named',
    },
    {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'stories',
      exports: 'named',
    },
  ],
  plugins: [
    external(),
    typescript(),
    // so JS can be rolled with TS
    // remove when JS files have been removed
    nodeResolve({
      ignoreGlobal: false,
      include: ['node_modules/**'],
      extensions,
      // skip: keys(EXTERNALS), // <<-- skip: ['react', 'react-dom']
    }),
    commonjs({
      ignoreGlobal: false,
      include: 'node_modules/**',
    }),
    postcss({
      // plugins: require('./postcss.config').plugins,
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
      // modules: true,
      minimize: true,
      sourceMap: false,
      // extract: false,
      minimize: true,
      modules: {
        // see generateScopedName options here
        // https://github.com/css-modules/postcss-modules
        generateScopedName: '[local]',
      },
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions,
    }),
    del({ targets: ['dist/*'] }),
  ],
}
