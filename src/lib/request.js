
import * as superagent from 'superagent';

export function get(opt){
  
  return new Promise((res)=>{
    const sa = superagent.get(opt.url);
    
    if("query" in opt){
      sa.query(opt.query);
    }
    
    if("header" in opt){
      Object.keys(opt.header).forEach((d)=>{
        sa.set(d, opt.header[d]);
      });
    }
    sa.end((err, resp)=>{
      if(err) { return res(err); }
      res(resp);
    });
  });
}

export function post(opt){
  return new Promise((res)=>{
    const sa = superagent
      .post(opt.url)
      .send(opt.body);
    
    if("header" in opt){
      Object.keys(opt.header).forEach((d)=>{
        sa.set(d, opt.header[d]);
      });
    }
    sa.end((err, resp)=>{
      if(err) { return res(err); }
      res(resp);
    });
  });
}

