import VcError from './error';

class VcBasic {
	setConfig(options = {}) {
		this.config = {
			...this.config,
			...options
		};
	}
	
	/**
	 * 清理Portals类型组件
	 * @param  {str | array} cName 清理的组件名
	 * @param  {str | array} force 是否强制清理, cName 存在会变为true
	 */
	clean(cName, force = false) {
		try {
			// 清理对象 
			let target = [];
			if (cName) {
				if (typeof cName === 'string') {
					target = [cName];
				} else if (cName instanceof Array && cName.length > 0) {
					target = cName;
				}
				target = target.reduce((pre, cur) => { pre[cur] = ''; return pre; }, {});

				// 清理
				force = true;
			} else {
				target = this.APIS;
			}
			for (let i in target) {
				if (this.APIS[i] && (force === true || this.APIS[i].__AUTO_DESTROY__ === true)) {
					this.APIS[i].$emit('destroy');
					delete this.APIS[i];
				}
			}
		} catch (e) {
			throw new VcError('instance', e);
		}
		return this;
	}

	/**
	 * 清理全部
	 */
	cleanAll() {
		try {
			for (let i in this.APIS) {
				if (this.APIS[i]) {
					this.APIS[i].$emit('destroy');
					delete this.APIS[i];
				}
			}
		} catch (e) {
			throw new VcError('instance', e);
		}
		return this;
	}
}

/**
 * 仅用户共享属性
 */
VcBasic.prototype.APIS = {};

VcBasic.prototype.config = {
	/**
	 * vuex + vue-router
	 */
	store: undefined,
	router: undefined,
	eventStore: undefined,
	/**
	 * components
	 */
	PGallery: {
		URL_PGALLERY_PATHS_LIST_GET: undefined,
		URL_PGALLERY_PATHS_ITEM_RENAME_POST: undefined,
		URL_PGALLERY_PATHS_ITEM_DEL_POST: undefined,
		URL_PGALLERY_PATHS_ITEM_ADD_POST: undefined,
		URL_PGALLERY_IMGS_LIST_GET: undefined,
		URL_PGALLERY_IMGS_ITEM_DEL_POST: undefined,
		URL_PGALLERY_IMGS_UPLOAD_POST: undefined,
		URL_PGALLERY_IMGS_ITEM_ADD_POST: undefined,
		URL_PGALLERY_IMGS_ITEM_RENAME_POST: undefined,
		URL_PGALLERY_IMGS_ITEM_MOVE_POST: undefined,
	},	
	Upload: {
		IMG_UPLOAD_URL: undefined,
		FILE_UPLOAD_URL: undefined,
		onPostBefore: undefined,
		onPostArter: undefined,
	},
	CreatePortal: {
		aliveRegExp: undefined
	},
	Paging: {
		stripe: undefined,
		tableOpts: undefined,
		pageOpts: undefined,
	}
};

export default VcBasic;