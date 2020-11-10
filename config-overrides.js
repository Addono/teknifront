const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const darkThemeVars = require('antd/dist/dark-theme')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        ...darkThemeVars,
        '@body-background': '#2A2A34',
      },
    },
  })
)
