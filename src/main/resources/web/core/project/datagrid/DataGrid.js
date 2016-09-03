/**
 * @name	DataGrid
 * @package core.project.datagrid
 * @desc	数据列表
 * @type	类型
 * 
 * @date	2016年9月1日 16:02:05
 */

core.project.datagrid.DataGrid = (function() {

	/**
	 * 对象转字符串
	 */
	function object2JsonStr(object) {

		if (typeof (object) == "object")
			return JSON.stringify(object);
		else if (object == "")
			return "[]";
		else
			return object;
	}

	/**
	 * 构造函数
	 * 
	 * @param id{String}
	 *            ID
	 */
	var Constructor = function(id) {

		// 调用父类构造
		core.project.datagrid.DataGrid.superClass.constructor.call(this, id);
		// 各行变色
		this.striped(true);
		// 页脚工具栏
		this.pagination(true);
		// 行号
		this.rownumbers(true);
		// 单选
		this.singleSelect(true);

		/**
		 * 属性
		 */
		/**
		 * 权限过滤
		 */
		var rightsFilter = true;
		/**
		 * Json参数
		 */
		var jsonParam = [];
		/**
		 * SQL参数
		 */
		var sqlParam = "";

		/**
		 * 获取/设置权限过滤
		 * 
		 * @param rightsFilter
		 */
		this.rightsFilter = function() {

			switch (arguments.length) {
			case 0:
				return rightsFilter;
			default:
				rightsFilter = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置Json参数
		 * 
		 * @param jsonParam
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
		 * @param sqlParam
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
	// 继承EaysUI 数据列表模板
	core.lang.Class.extend(Constructor, core.html.easyui.datagrid.DataGrid);

	/**
	 * 创建数据列表
	 * 
	 * @returns
	 */
	Constructor.prototype.createDataGrid = function() {

		// 添加指定参数
		this.queryParams($.extend({
			rightsFilter : this.rightsFilter(),
			params : JSON.stringify(this.jsonParam()),
			whereSql : this.sqlParam(),
			orderBy : "[]"
		}, this.queryParams()));

		return this.init();
	};

	/**
	 * 重新加载数据
	 * 
	 * @param jsonParam
	 * @param sqlParam
	 * @param orderParam
	 * @param otherParam
	 * @returns
	 */
	Constructor.prototype.load = function(jsonParam, sqlParam, orderParam, otherParam) {

		var param = {
			rightsFilter : this.rightsFilter(),
			params : object2JsonStr(jsonParam),
			whereSql : sqlParam,
			orderBy : object2JsonStr(orderParam)
		}

		if (typeof (_otherParam) === "object") {
			param = $.extend(param, otherParam);
		}

		return $("#" + this.id()).datagrid("load", param);
	};

	/**
	 * 重新加载数据,且停留在当前页面
	 * 
	 * @param jsonParam
	 * @param sqlParam
	 * @param orderParam
	 * @param otherParam
	 * @returns
	 */
	Constructor.prototype.reload = function(jsonParam, sqlParam, orderParam, otherParam) {

		var param = {
			rightsFilter : this.rightsFilter(),
			params : object2JsonStr(jsonParam),
			whereSql : sqlParam,
			orderBy : object2JsonStr(orderParam)
		}

		if (typeof (_otherParam) === "object") {
			param = $.extend(param, otherParam);
		}

		return $("#" + this.id()).datagrid("reload", param);
	};

	// 返回构造函数
	return Constructor;
})();