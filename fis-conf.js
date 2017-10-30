// 采用 commonjs 模块化方案。
fis.hook('commonjs', {
  baseUrl: './page',
  extList: ['.js', '.jsx', '.es']
});


fis.match('*.html', {
    useMap: true
})

fis.match('{/page/**.js,*.jsx,*.es}', {
  // parser: fis.plugin('typescript'),

  // typescript 就是编译速度会很快，但是对一些 es7 的语法不支持，可以用 babel 来解决。用以下内容换掉 typescript 的parser配置就好了。
  parser: fis.plugin('babel-5.x', {
      sourceMaps: true,
      optional: ["es7.decorators", "es7.classProperties"]
  }),
  rExt: '.js'
});


// 改用 npm 方案，而不是用 fis-components

fis.unhook('components');
fis.hook('node_modules');

// fis.match('/{node_modules}/**.js', {
//     isMod: true,
//     useSameNameRequire: true
// });



// npm install fis-parser-node-sass -g
// fis.match('/**.scss', {
//     parser: fis.plugin('node-sass', {
//         // options...
//     }),
//     rExt: '.css'
// });

// npm install -g fis-parser-less-2.x
fis.match('/**.less', {
    parser: fis.plugin('less-2.x', {
        // fis-parser-less-2.x option
    }),
    rExt: '.css'
});


// 设置成是模块化 js
fis.match('/{widget,node_modules,page}/**.{js,jsx,es}', {
    isMod: true
});

fis.match('/node_modules/alloyfinger/**.js', {
    isMod: false
});



fis.match('::package', {
  // 本项目为纯前段项目，所以用 loader 编译器加载，
  // 如果用后端运行时框架，请不要使用。
  postpackager: fis.plugin('loader', {
    useInlineMap: true
  })
});

fis.config.set("project.watch.usePolling", true);

// 支持 js 中直接 require css. (es6 的 import 也支持，但是先通过 es6 => es5 的转换。)
fis.match('*.{js,es,es6,jsx,ts,tsx}', {
  preprocessor: [
    fis.plugin('js-require-file'),
    fis.plugin('js-require-css')
  ]
})

