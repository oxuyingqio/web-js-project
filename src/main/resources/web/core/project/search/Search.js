core.project.search.Search = (function() {

	/**
	 * 构造函数
	 */
	var Constructor = function(id) {

		/**
		 * Div
		 */
		var div = new core.html.element.viewer.Div(id);
		/**
		 * 搜索字段
		 */
		var fields = [];

		/**
		 * 获取/设置Div对象
		 * 
		 * @param div
		 */
		this.div = function() {

			switch (arguments.length) {
			case 0:
				return div;
			default:
				div = arguments[0];
				return this;
			}
		};

		/**
		 * 添加字段
		 */
		this.addFiled = function(field) {

			fields.push(field);
		}
	};

	Constructor.prototype.init = function(config) {

		var div = this.div();
		div.clear();
		var table = new core.html.element.viewer.Table().style("width:100%").appendTo(table);
	};

	Constructor.prototype.show = function(config) {

		this.div().show();
	};

	return Constructor;
})();