/**
 *
 *
 */

import * as common from  '../lib/common';
const Comp = common.component;
export {common};
/**
 * Page list
 */
export const pagelist = [
  { address: "sub-a-main", name: "Sub:A"},
  { address: "sub-b-main", name: "Sub:B"},
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

export function mainpage(){
  const mixin = {
    init: function(){
      // console.log("init")
    }
  };
  return mixin;
}