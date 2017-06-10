/**
 * Application level
 */

/**
 * Load Common Library
 */
import {co} from 'co';
require('date-utils');
import route from 'riot-route';

import {common} from  './index';


/**
 * MainPage:A
 */

export function mainpage(){
  return {
    init: function(){
      const self = this;

      this.one('mount', function(){
        /**
         * Get Query String + Initial Query Modifycate
         */
        const qs = route.query();

        qs.start = qs.start || new Date().addDays(-7).toFormat("YYYY-MM-DD");
        qs.end = qs.end || new Date().addDays(1).toFormat("YYYY-MM-DD");

        /**
         * Mount Request Ctrl Component
         */
        const ctrl = riot.mount('part-app-a-reqdate', qs)[0];

        /**
         * Generate Views with Parameter
         */
        const tag = riot.mount('entry', "app-request-sample", {ctrl:ctrl})[0];

        // Run First Time
        // ctrl.load();
      });
    }
  };
}



/**
 * Request Form
 */
export function requestDate(opt){
  const mixin = {
    init: function(){
      // cancel page move
      this.one('mount', ()=>{
        this.refs.requestForm.onsubmit = function(){
          return false;
        };
      });
    },
    load: function(){
      const query = this.getVariable();
      this.trigger("load-by-date", query);
    },
    getVariable: function(){
      return Object.keys(this.refs).reduce((a, b)=>{
        if(/input|textarea|select/i.test(this.refs[b].tagName)){
          a[b] = this.refs[b].value;
        }
        return a;
      }, {});
    },
    write: function(opts){
      this.opts = opts;
      this.update();
    },
  };
  return mixin;
}



/**
 * request_sample Superagent
 */
export function request_sample(opt){
  const mixin = {
    init: function(){
      /**
       * catch Other Compontent events
       */
      opt.ctrl.on("load-by-date", (data)=>{
        this.load(data);
      });
    },
    load: function(data){
      /**
       * Request
       */
      const self = this;
      co(function*(){
        const records = yield common.request.get({
          url: "/"
        });
        self.text = records.text;
        self.query = Object.keys(data).map((d)=>{
          return {
            name: d,
            value: data[d],
          };
        });
      })
      .then((data)=>{
        self.update();
      })
      .catch((err)=>{
        self.errorMessage = err.message;
        self.update();
      });
    }
  };
  return mixin;
}
