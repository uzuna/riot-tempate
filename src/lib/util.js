
/**
 * @typedef {Object} GroupKeyOption
 * @property [String] keys - parameter names
 */


/**
 * List Grouping by parameter keys
 * @param [Object] list - Object list
 * @param {GroupKeyOption} opt - Object list
 * @return {String:[Object]} - hash map
 */
export function keygroup(list, opt){
  return list.reduce((a, b)=>{
    const key = opt.keys.map((d)=>{
      return b[d];
    }).join("-");
    if(!(key in a)) { a[key] = []; }
    a[key].push(b);
    return a;
  }, {});
}

/**
 * Create Hash map from parameter keys
 * @param [Object] list - Object list
 * @param {GroupKeyOption} opt - Object list
 * @return {String:Object} - hash map
 */
export function keygroup_single(list, opt){
  return list.reduce((a, b)=>{
    const key = opt.keys.map((d)=>{
      return b[d];
    }).join("-");
    a[key] = b;
    return a;
  }, {});
}

/**
 * Create Key Generator
 * @param {GroupKeyOption} opt - Object list
 * @return {function(Object): String}
 */
export function key_generator(opt){
  return function(data){
    return opt.keys.map((d)=>{
      return data[d];
    }).join("-");
  };
}

export function key_uniq(list, opt){
  const kg = key_generator(opt);
  const group = list.reduce((a, b)=>{
    const key = kg(b);
    a[key] = true;
    return a;
  }, {});
  return Object.keys(group);
}
