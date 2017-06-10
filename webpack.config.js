'use strict';

const path = require('path')
const fs = require('fs')

const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Auto Load main.js
 */
const entry_files = listup("src", {pattern: /main\.js/});
const entry = entry_files.reduce((a, b)=>{
  let remotepath = path.dirname(b.filepath)
    .replace(/^src[\/]?/,"")
  if(remotepath.length === 0) remotepath = "index";
  a[remotepath] = '\.\/' + b.filepath
  return a;
}, {})



/**
 * Create Page Entry
 */

const html_plugin_template = {
  template:'template/index.pug',
}

const pagelist = Object.keys(entry).map((d)=>{
  let name = d.replace(/\.\/src\//,"").replace("index", "").split("/")
  name = name.join("/")
  if(name.length < 1){
    name = "index.html"
  }
  else{
    name += "/index.html"
  }
  return new htmlWebpackPlugin(
    Object.assign({
      chunks:[d],
      filename: name,
    }, 
    html_plugin_template)
  )
})

pagelist.push(new webpack.ProvidePlugin({
  riot: 'riot'
}))



/**
 * webpack configure
 */

module.exports = {
  entry: entry,
  output: {
    path: "./docs",
    filename: '[name]/bundle.js'
  },
  devServer:{
    contntBase: "docs",
    inline: true,
    port: 3000
  },
  module: {
    preLoaders: [
      {
        test: /\.tag$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        query: {
          template: 'pug' 
        }
      }
    ],
    loaders: [
      {
        test: /\.(js|tag)$/,
        loader: 'babel-loader',
      }
      ,{
        test: /\.(pug)$/,
        loader: 'pug-loader'
      }
    ]
  },
  plugins: pagelist
};


/**
 * Collect files filter by optional pattern match 
 *
 */
function listup(dir, opt){
  opt = opt || {pattern: /main.js/};
  const list = fs.readdirSync(dir).map((d)=>{
    const relpath = path.join(dir, d);
    const stat = fs.statSync(relpath);
    let type = stat.isFile() ? "file" : "other";
    type = stat.isDirectory() ? "dir" : type
    return {
      filepath : relpath,
      type: type
    }
  })
  const entrys = list.filter((d)=>{
    return opt.pattern.test(d.filepath) && d.type === "file";
  })
  const child = list.filter((d)=>{
    return d.type === "dir";
  }).reduce((a, b)=>{
    return a.concat(listup(b.filepath, opt))
  }, [])
  return entrys.concat(child);
}
