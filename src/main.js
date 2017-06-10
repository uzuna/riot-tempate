/**
 * main.jsはbundle.jsを生成するエントリポイントとして扱う
 * だいたいある一つの機能を扱う単位
 * 関連して
 * - index.tag - 基本的なページ構造の定義 + 共通する関数などを定義してViewを書きやすくする
 * - [module]/index.js - 主にViewの制御コードを書く
 * - [parts]/*.tag - この機能で使う独自タグを定義
 */

/**
 * Common library
 */
require("babel-polyfill");
import * as route from 'riot-route';
const router = route.default;

/**
 * bind to application scripts
 */
import * as common from './lib/common';
export {common};

/**
 * require Riot.js tags
 */
require('./index.tag');
require('./comp/approute.tag');

/**
 * Get Application Script
 */
window.app = require('./module/index.js');


/**
 * Page Build
 */
const pagelist = window.app.pagelist;
pagelist.forEach((d)=>{
  router(d.address, function() {
    riot.mount('router', d.address);
  });
})

/**
 * Default
 */
router(function() {
  riot.mount('router', "app-a-main");
})


riot.mount("app");
router.start(true);
window.document.title = "Index Page";
