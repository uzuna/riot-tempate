/**
 * Riot Route Contoroll
 */

/**
 * Load Common Reference and bind to modules
 */
import * as common from  '../lib/common';
const Comp = common.component;
export {common};

/**
 * Page list
 */
export const pagelist = [
  { address: "app-a-main", name: "App:A"},
  { address: "app-b-main", name: "App:B"},
];

/**
 * Riot Router Level Component
 */
export function createPagenation(){
  return Comp.pagenation({
    title: "riot level pagenation",
    pagelist: pagelist,
  });
}

/**
 * Pages Entry Point
 */
require('../parts/app_a.tag');
import * as app_a from './app_a';
export {app_a};
