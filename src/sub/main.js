
/**
 * Common library
 */
import * as route from 'riot-route';
const router = route.default;
import * as common from '../lib/common';
export {common};

/**
 * 共通Component
 */
require('../comp/approute.tag');
require('./index.tag');



/**
 * Get Application Script
 */
window.app = require('./index.js');


/**
 * Page Build
 */
const pagelist = window.app.pagelist;
pagelist.forEach((d)=>{
  router(d.address, function() {
    riot.mount('router', d.address);
  });
});

/**
 * Default
 */
router(function() {
  riot.mount('router', "sub-a-main");
});


riot.mount("app");
router.start(true);
window.document.title = "Sub Page";