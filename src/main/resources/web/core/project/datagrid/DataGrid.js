/**
 * @name	DataGrid
 * @package core.project.datagrid
 * @desc	数据列表
 * @type	类型
 * 
 * @constructor core.project.datagrid.DataGrid(string id/object jQuery)
 * 
 * @extend	core.html.easyui.datagrid.DataGrid
 * 
 * @date	2018年5月11日 10:46:43
 */
core.project.datagrid.DataGrid = (function() {

	/**
	 * 对象转JSON字符串
	 * 
	 * @param object{object}
	 * @returns {string}
	 */
	function object2JSONStr(object) {

		if (typeof (object) == "object")

			return JSON.stringify(object);
		else if (object == "")

			return "[]";
		else

			return object;
	}

	/**
	 * 构造函数
	 */
	var Constructor = function() {

		// 调用父类构造
		core.project.datagrid.DataGrid.superClass.constructor.call(this, arguments[0]);
		// 默认参数修改
		this.striped(true);
		this.pagination(true);
		this.rownumbers(true);
		this.singleSelect(true);

		/**
		 * 属性
		 */
		/**
		 * Json参数
		 */
		var jsonParam = [];
		/**
		 * SQL参数
		 */
		var sqlParam = "";

		/**
		 * 获取/设置Json参数
		 * 
		 * @param jsonParam{array}
		 * @returns {array/core.project.datagrid.DataGrid}
		 */
		this.jsonParam = function() {

			switch (arguments.length) {
			case 0:
				return jsonParam;
			default:
				jsonParam = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置SQL参数
		 * 
		 * @param sqlParam{string}
		 * @returns {string/core.project.datagrid.DataGrid}
		 */
		this.sqlParam = function() {

			switch (arguments.length) {
			case 0:
				return sqlParam;
			default:
				sqlParam = arguments[0];
				return this;
			}
		};
	};
	// 继承父类
	core.lang.Class.extend(Constructor, core.html.easyui.datagrid.DataGrid);

	/**
	 * 创建数据列表
	 * 
	 * @returns
	 */
	Constructor.prototype.project = function() {

		// 添加指定参数
		this.queryParams($.extend({
			params : object2JSONStr(this.jsonParam()),
			whereSql : this.sqlParam(),
			TimeStamp : new Date().getTime()
		}, this.queryParams()));

		// 返回初始化后的datagrid
		return this.init();
	};

	/**
	 * 重新加载数据
	 * 
	 * @param jsonParam
	 * @param sqlParam
	 * @param deprecated
	 *            废弃不用参数
	 * @param otherParam
	 * @returns
	 */
	Constructor.prototype.load = function(jsonParam, sqlParam, deprecated, otherParam) {

		var param = {
			params : object2JSONStr(jsonParam),
			whereSql : sqlParam,
			TimeStamp : new Date().getTime()
		}

		if (typeof (otherParam) === "object") {

			param = $.extend(param, otherParam);
		}

		return this.$jQuery().datagrid("load", param);
	};

	/**
	 * 重新加载数据,且停留在当前页面
	 * 
	 * @param jsonParam
	 * @param sqlParam
	 * @param deprecated
	 *            废弃不用参数
	 * @param otherParam
	 * @returns
	 */
	Constructor.prototype.reload = function(jsonParam, sqlParam, deprecated, otherParam) {

		var param = {
			params : object2JSONStr(jsonParam),
			whereSql : sqlParam,
			TimeStamp : new Date().getTime()
		}

		if (typeof (otherParam) === "object") {

			param = $.extend(param, otherParam);
		}

		return this.$jQuery().datagrid("reload", param);
	};

	// 返回构造函数
	return Constructor;
})();