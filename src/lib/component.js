
/**
 * Riot Router level Pagenation
 */
export function pagenation(opt){
	const title = opt.title;
	const pagelist = opt.pagelist || [];
	return {
		init:  function(){
			this.title = title;
			const self = this;
			const route_hash = window.location.hash.substr(1);
			if(route_hash.length < 1){
				pagelist[0].classstr = "active";
			}
			else {
				for(const vd of pagelist){
					if(vd.address === route_hash){
						vd.classstr = 'active';
					} else {
						vd.classstr = '';
					}
				}
			}
			self.pagelist = pagelist;
		}
	};
}
