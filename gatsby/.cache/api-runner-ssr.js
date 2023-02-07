var plugins = [{
      plugin: require('/Users/johnrose/Web_all_info/wes_bos/master_gatsby_2020_10/master_gatsby/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/johnrose/Web_all_info/wes_bos/master_gatsby_2020_10/master_gatsby/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/johnrose/Web_all_info/wes_bos/master_gatsby_2020_10/master_gatsby/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"wgecvc8p","dataset":"production","watchMode":true,"token":"skpSKx07BC52wjt6Ko3ZlaB9ady1kuMl5FPotIXlXmfoaruUBxNMWlX1mFcKGCnOChXxLLOwJPPVVy4qWj8lgPBAvPWMJhYBHEMREv9swtEvNyMlnfeWGzzYfuBmVZ8N6aRehnK3W2MwyFadMeDxqDvFuj3OePwgWCdN8dONkJcJVZKRFHNO"},
    },{
      plugin: require('/Users/johnrose/Web_all_info/wes_bos/master_gatsby_2020_10/master_gatsby/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
