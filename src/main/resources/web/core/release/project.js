/**
 * 包
 */

// 项目包
core.project = {

	// 遮盖层
	cover : {},

	// 数据列表
	datagrid : {},

	// 表单
	form : {},

	// 搜索
	search : {}
};
/**
 * @name	Cover
 * @package core.project.cover
 * @desc	遮盖层
 * @type	类
 * 
 * @method	static core.project.cover.Cover		getInstance()			获取遮盖层实例
 * 			core.project.cover.Cover			append(Object html)		添加HTML信息
 * 			core.project.cover.Cover			show()					显示遮盖层
 * 			core.project.cover.Cover			hide()					隐藏遮盖层
 *  
 * @date	2018年5月11日 10:34:39
 */
core.project.cover.Cover = (function() {

	/**
	 * 遮盖层
	 */
	var cover;

	/**
	 * 构造函数
	 */
	var Constructor = function() {

		/**
		 * 遮盖层样式
		 */
		var style = [];
		style.push("position: absolute;");
		style.push("width: 100%;");
		style.push("height: 100%;");
		style.push("top: 0px;")
		style.push("z-index: 99999;");
		style.push("margin: 0px;");
		style.push("padding: 0px;");
		style.push("background: #F8F8F8;");
		style.push("filter: alpha(opacity=85);");
		style.push("opacity: 0.85;");
		/**
		 * 遮盖层
		 */
		var div = new core.html.element.viewer.Div().style(style.join(" ")).appendTo("body");
		// 隐藏遮盖层
		div.$jQuery().hide();

		/**
		 * 获取/设置遮盖层
		 * 
		 * @param div{object}
		 * @returns {object/core.project.cover.Cover}
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
	};

	/**
	 * 添加HTML信息
	 * 
	 * @param html{string}
	 * @returns {core.project.cover.Cover}
	 */
	Constructor.prototype.content = function(html) {

		this.div().$jQuery().html(html);

		return this;
	};

	/**
	 * 显示遮盖层
	 * 
	 * @returns {core.project.cover.Cover}
	 */
	Constructor.prototype.show = function() {

		this.div().$jQuery().show();

		return this;
	};

	/**
	 * 隐藏遮盖层
	 * 
	 * @returns {core.project.cover.Cover}
	 */
	Constructor.prototype.hide = function() {

		this.div().$jQuery().hide();

		return this;
	};

	return {

		/**
		 * 获取遮盖层实例
		 * 
		 * @returns {core.project.cover.Cover}
		 */
		getInstance : function() {

			if (!cover) {
				
				cover = new Constructor();
			}

			return cover;
		}
	};
})();
/**
 * @name DataGrid
 * @package core.project.datagrid
 * @desc 数据列表
 * @type 类型
 * 
 * @constructor core.project.datagrid.DataGrid(string id/object jQuery)
 * 
 * @extend core.html.easyui.datagrid.DataGrid
 * 
 * @date 2018年5月11日 10:46:43
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
		this.onLoadError(function() {

			core.html.easyui.window.Messager.getInstance().alert(null, "远程数据加载失败，请刷新页面重试。<br>点击[确定]将自动刷新本页面。", null,
					function() {

						location.reload();
					});
		});

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
/**
 * @name Form
 * @package core.project.form
 * @desc 表单
 * @type 类
 * 
 * @date 2019年4月29日 15:08:06
 */
core.project.form.Form = (function() {

	/**
	 * 处理分组
	 * 
	 * @param table
	 * @param config
	 * @returns
	 */
	function dealGroup(table, config) {

		// 实例化行
		var tr = new core.html.element.viewer.Tr().clazz("formTr").append(
				new core.html.element.viewer.Td().clazz("formGroupTd").colspan(config.colspan ? config.colspan : 1)
						.rowspan(config.rowspan ? config.rowspan : 1).append(
								"<span class='formGroupContent'>" + (config.content ? config.content : config.text)
										+ "</span>"));

		// 添加行到表格
		tr.appendTo(table);
	}

	/**
	 * 处理分组数据
	 * 
	 * @param table
	 * @param config
	 */
	function dealGroupData(table, config) {

		// 获取分组行数据
		var data = config.data;
		// 遍历分组行数据
		for (var i = 0, length = data.length; i < length; i++) {

			// 实例化行
			var tr = new core.html.element.viewer.Tr().clazz("formTr");

			// 遍历行格数据
			for (var j = 0, jLength = data[i].length; j < jLength; j++) {

				// 处理行格
				dealTrTd(tr, data[i][j], config.showOnly);
			}

			// 添加行到表格
			tr.appendTo(table);
		}
	}

	/**
	 * 处理行格
	 * 
	 * @param tr
	 * @param config
	 * @param showOnly
	 * @returns
	 */
	function dealTrTd(tr, config, showOnly) {

		// 判断是否存在标签
		if (config.label) {

			// 实例化格
			var td = new core.html.element.viewer.Td(config.label.id);
			// 实例化样式
			var clazz = [];
			// 默认样式
			clazz.push("formTd");
			clazz.push("formLabelTd");
			// 判断是否为仅展示
			if (showOnly) {

				clazz.push("formInfoTd");
				clazz.push("formInfoLabelTd");
			}
			// 设置样式
			td.clazz(clazz.join(" "));

			// 判断标签类型
			if (typeof (config.label) === "string") {

				// 添加标签内容
				td.append(config.label + " :");
			} else {

				// 设置
				td.style(config.label.tdStyle ? config.label.tdStyle : "").colspan(
						config.label.colspan ? config.label.colspan : 1).rowspan(
						config.label.rowspan ? config.label.rowspan : 1).append(config.label.content + " :");
			}

			// 添加格到行
			td.appendTo(tr);
		}

		// 若为隐藏输入框,特殊处理
		if (config.type === core.project.form.Type.INPUT.HIDDEN) {

			// 添加到行
			new core.html.element.viewer.Input(config.id).type("hidden").name(config.name ? config.name : config.id)
					.value(config.value).appendTo(tr);
		} else {

			// 实例化格
			var td = new core.html.element.viewer.Td();
			// 实例化样式
			var clazz = [];
			// 默认样式
			clazz.push("formTd");
			// 判断是否为仅展示
			if (showOnly) {

				clazz.push("formInfoTd");
				clazz.push("formInfoValueTd");
			}
			// 设置样式
			td.clazz(clazz.join(" "));

			// 设置
			td.style(config.tdStyle ? config.tdStyle : "").colspan(config.colspan ? config.colspan : 1).rowspan(
					config.rowspan ? config.rowspan : 1).append(config.before);

			// 依据单元格数据类型,处理
			switch (config.type) {
			case core.project.form.Type.A:
				// 处理A
				td.append(new core.html.element.viewer.A(config.id).append(config.content ? config.content
						: config.text));
				break;
			case core.project.form.Type.LABEL:
				// 处理Label
				td.append(new core.html.element.viewer.Label(config.id).append(config.content ? config.content
						: config.text));
				break;
			case core.project.form.Type.DIV:
				// 处理DIV
				td.append(new core.html.element.viewer.Div(config.id).append(config.content));
				break;
			case core.project.form.Type.INPUT.RADIO:
			case core.project.form.Type.INPUT.CHECKBOX:
				// 处理input
				dealInput(td, config);
				break;
			case core.project.form.Type.EASYUI.SWITCHBUTTON:
			case core.project.form.Type.EASYUI.CALENDAR:
			case core.project.form.Type.EASYUI.CHECKBOX:
			case core.project.form.Type.EASYUI.COMBO:
			case core.project.form.Type.EASYUI.COMBOBOX:
			case core.project.form.Type.EASYUI.COMBOGRID:
			case core.project.form.Type.EASYUI.COMBOTREE:
			case core.project.form.Type.EASYUI.COMBOTREEGRID:
			case core.project.form.Type.EASYUI.DATEBOX:
			case core.project.form.Type.EASYUI.DATETIMEBOX:
			case core.project.form.Type.EASYUI.DATETIMESPINNER:
			case core.project.form.Type.EASYUI.FILEBOX:
			case core.project.form.Type.EASYUI.MASKEDBOX:
			case core.project.form.Type.EASYUI.NUMBERBOX:
			case core.project.form.Type.EASYUI.NUMBERSPINNER:
			case core.project.form.Type.EASYUI.PASSWORDBOX:
			case core.project.form.Type.EASYUI.RADIOBUTTON:
			case core.project.form.Type.EASYUI.SLIDER:
			case core.project.form.Type.EASYUI.SPINNER:
			case core.project.form.Type.EASYUI.TAGBOX:
			case core.project.form.Type.EASYUI.TEXTAREA:
			case core.project.form.Type.EASYUI.TEXTBOX:
			case core.project.form.Type.EASYUI.TIMESPINNER:
			case core.project.form.Type.EASYUI.VALIDATEBOX:
				// 处理input
				dealEasyUIInput(td, config);
				break;
			}

			// 添加尾,添加格到行
			td.append(config.after).appendTo(tr);
		}
	}

	/**
	 * 处理输入框
	 * 
	 * @param td
	 * @param config
	 * @returns
	 */
	function dealInput(td, config) {

		// 判断输入框类型
		switch (config.type) {
		case core.project.form.Type.INPUT.RADIO:

			// 获取数据
			var data = config.data;
			// 遍历数据
			for (var i = 0; i < data.length; i++) {

				// 添加输入框
				td.append(new core.html.element.viewer.Input(config.id + i).type("radio").name(
						config.name ? config.name : config.id).value(data[i].value));
				// 添加标签
				td.append(new core.html.element.viewer.Label().forAttr(config.id + i).append(data[i].text));
			}

			break;
		case core.project.form.Type.INPUT.CHECKBOX:

			// 获取数据
			var data = config.data;
			// 遍历数据
			for (var i = 0; i < data.length; i++) {

				// 添加输入框
				td.append(new core.html.element.viewer.Input(config.id + i).type("checkbox").name(
						config.name ? config.name : config.id).value(data[i].value));
				// 添加标签
				td.append(new core.html.element.viewer.Label().forAttr(config.id + i).append(data[i].text));
			}

			break;
		default:
			// 添加输入框
			td.append(new core.html.element.viewer.Input(config.id).name(config.name ? config.name : config.id));

			break;
		}
	}

	/**
	 * 处理EasyUI输入框
	 * 
	 * @param td
	 * @param config
	 * @returns
	 */
	function dealEasyUIInput(td, config) {

		// 实例化输入框
		var input = new core.html.element.viewer.Input(config.id).name(config.name ? config.name : config.id);
		// 获取EASYUI配置
		var easyuiConfig = config.easyui ? config.easyui : {};

		// 判断输入框类型
		switch (config.type) {
		case core.project.form.Type.EASYUI.SWITCHBUTTON:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.button.SwitchButton(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.CALENDAR:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.Calendar(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.CHECKBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.CheckBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.COMBO:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.Combo(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.COMBOBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.ComboBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.COMBOGRID:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.ComboGrid(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.COMBOTREE:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.ComboTree(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.COMBOTREEGRID:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.ComboTreeGrid(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.DATEBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.DateBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.DATETIMEBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.DateTimeBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.DATETIMESPINNER:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.DateTimeSpinner(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.FILEBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.FileBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.MASKEDBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.MaskedBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.NUMBERBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.NumberBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.NUMBERSPINNER:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.NumberSpinner(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.PASSWORDBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.PasswordBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.RADIOBUTTON:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.RadioButton(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.SLIDER:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.Slider(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.SPINNER:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.Spinner(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.TAGBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.TagBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.TEXTAREA:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.Textarea(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.TEXTBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.TextBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.TIMESPINNER:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.TimeSpinner(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		case core.project.form.Type.EASYUI.VALIDATEBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 实例化EasyUI
				var easyui = new core.html.easyui.form.ValidateBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyuiConfig) {

					// 设置对应参数
					easyui[attr] && easyui[attr](easyuiConfig[attr]);
				}
				// 初始化
				easyui.init();

				// 回收配置引用
				easyuiConfig = null;
			}));

			break;
		}
	}

	/**
	 * 构造函数
	 */
	var Constructor = function() {

		// 调用父类构造
		core.project.form.Form.superClass.constructor.call(this, arguments[0]);
		// 默认参数修改
		this.title(null);
		this.width("100%");
		this.left("0px");
		this.top("0px");
		this.bodyCls("formBody");
		this.border(false);
		this.closable(false);
		this.draggable(false);
		this.shadow(false);

		/**
		 * 表单ID
		 */
		var formId;
		/**
		 * 表单数据
		 */
		var data = [];

		/**
		 * 获取/设置表单ID
		 * 
		 * @param formId{string}
		 * @returns {string/core.project.form.Form}
		 */
		this.formId = function() {

			switch (arguments.length) {
			case 0:
				return formId;
			default:
				formId = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置表单数据
		 * 
		 * @param data{array}
		 * @returns {array/core.project.form.Form}
		 */
		this.data = function() {

			switch (arguments.length) {
			case 0:
				return data[0].data;
			default:
				data = [ {
					data : arguments[0]
				} ];
				return this;
			}
		};

		/**
		 * 获取/设置表单数据
		 * 
		 * @param groupData{array}
		 * @returns {array/core.project.form.Form}
		 */
		this.groupData = function() {

			switch (arguments.length) {
			case 0:
				return data;
			default:
				data = arguments[0];
				return this;
			}
		};

		/**
		 * 废弃
		 * 
		 * @returns {core.project.form.Form}
		 */
		this.isGroup = function() {

			return this;
		};
	};
	// 继承父类
	core.lang.Class.extend(Constructor, core.html.easyui.window.Dialog);

	/**
	 * 表单初始化
	 * 
	 * @returns {core.project.form.Form}
	 */
	Constructor.prototype.project = function() {

		// 实例化表单
		var form = new core.html.element.viewer.Form(this.formId()).style("padding: 1px;").method("post").enctype(
				"multipart/form-data");
		// 添加表单HTML
		this.content(form.convertHtml());
		// 初始化Dialog
		this.init();

		// 实例化表格
		var table = new core.html.element.viewer.Table().clazz("formTable");
		// 获取表单数据
		var data = this.groupData();
		// 遍历表单数据
		for (var i = 0, length = data.length; i < length; i++) {

			// 获取本组数据
			var groupData = data[i];

			// 依据是否存在组描述,判断是否创建分组
			if (groupData.content || groupData.text) {

				// 处理分组
				dealGroup(table, groupData);
			}

			// 处理分组数据
			dealGroupData(table, groupData);
		}
		// 添加表格到表单
		table.appendTo(form);

		// 返回
		return this;
	};

	/**
	 * 获取表单jQuery对象
	 * 
	 * @returns {object}
	 */
	Constructor.prototype.$formjQuery = function() {

		return $("#" + this.formId());
	};

	/**
	 * 表单提交
	 * 
	 * @param options{object}
	 * @returns
	 */
	Constructor.prototype.submit = function(options) {

		return this.$formjQuery().form("submit", options);
	};

	/**
	 * 加载数据
	 * 
	 * @param data{object}
	 * @returns
	 */
	Constructor.prototype.load = function(data) {

		return this.$formjQuery().form("load", data);
	};

	/**
	 * 清空表单
	 * 
	 * @returns
	 */
	Constructor.prototype.clear = function() {

		return this.$formjQuery().form("clear");
	};

	/**
	 * 重置表单
	 * 
	 * @returns
	 */
	Constructor.prototype.reset = function() {

		return this.$formjQuery().form("reset");
	};

	/**
	 * 验证表单
	 * 
	 * @returns
	 */
	Constructor.prototype.validate = function() {

		return this.$formjQuery().form("validate");
	};

	/**
	 * 启用表单验证
	 * 
	 * @returns
	 */
	Constructor.prototype.enableValidation = function() {

		return this.$formjQuery().form("enableValidation");
	};

	/**
	 * 禁用表单验证
	 * 
	 * @returns
	 */
	Constructor.prototype.disableValidation = function() {

		return this.$formjQuery().form("disableValidation");
	};

	/**
	 * 重置表单验证
	 * 
	 * @returns
	 */
	Constructor.prototype.resetValidation = function() {

		return this.$formjQuery().form("resetValidation");
	};

	/**
	 * 
	 * @returns
	 */
	Constructor.prototype.resetDirty = function() {

		return this.$formjQuery().form("resetDirty");
	};

	// 返回构造
	return Constructor;
})();
/**
 * @name Type
 * @package core.project.form
 * @desc 表单数据内容类型
 * @type 枚举
 * 
 * @date 2016年9月2日 16:25:11
 */
core.project.form.Type = {

	A : "a",
	LABEL : "label",
	DIV : "div",
	INPUT : {
		HIDDEN : "hidden",
		RADIO : "radio",
		CHECKBOX : "checkbox"
	},
	EASYUI : {
		SWITCHBUTTON : "switchbutton",

		CALENDAR : "calendar",
		CHECKBOX : "easyui_checkbox",
		COMBO : "combo",
		COMBOBOX : "combobox",
		COMBOGRID : "combogrid",
		COMBOTREE : "combotree",
		COMBOTREEGRID : "combotreegrid",
		DATEBOX : "datebox",
		DATETIMEBOX : "datetimebox",
		DATETIMESPINNER : "datetimespinner",
		FILEBOX : "filebox",
		MASKEDBOX : "maskedbox",
		NUMBERBOX : "numberbox",
		NUMBERSPINNER : "numberspinner",
		PASSWORDBOX : "passwordbox",
		RADIOBUTTON : "radiobutton",
		SLIDER : "slider",
		SPINNER : "spinner",
		TAGBOX : "tagbox",
		TEXTAREA : "textarea",
		TEXTBOX : "textbox",
		TIMESPINNER : "timespinner",
		VALIDATEBOX : "validatebox"
	}
};
/**
 * @name	DataType
 * @package core.project.search
 * @desc	数据类型
 * @type	枚举
 * 
 * @date	2016年9月5日 15:20:07
 */
core.project.search.DataType = {

	BYTE : "byte",
	SHOT : "shot",
	INT : "int",
	LONG : "long",
	
	FLOAT : "float",
	DOUBLE : "double",
	
	CHAR : "char",
	STRING : "string",
	
	DATE : "date",
	DATETIME : "datetime",
	
	BOOLEAN : "boolean"
};
/**
 * @name	DBType
 * @package core.project.search
 * @desc	数据库类型
 * @type	枚举
 * 
 * @date	2017年8月10日 14:21:52
 */
core.project.search.DBType = {

	ORACLE : "oracle",
	MYSQL : "mysql"
};

/**
 * 当前数据库类型
 */
core.project.search.CurrentDBType = core.project.search.DBType.MYSQL;
/**
 * @name Font
 * @package core.project.search
 * @desc 语言
 * @type 枚举
 * 
 * @date 2018年8月4日 15:22:21
 */
core.project.search.Font = function() {

	// 获取浏览器语言设置
	var language = navigator.language;
	if (!language)
		language = navigator.browserLanguage;

	if (language.toLowerCase().indexOf("zh") >= 0) {

		return {
			search : "搜&nbsp;&nbsp;&nbsp;索",
			reset : "重&nbsp;&nbsp;&nbsp;置"
		};
	} else if (language.toLowerCase().indexOf("en") >= 0) {

		return {
			search : "搜索",
			reset : "重置"
		};
	}
}();
/**
 * @name	QueryMode
 * @package core.project.search
 * @desc	查询模式
 * @type	枚举
 * 
 * @date	2018年5月16日 14:02:24
 */
core.project.search.QueryMode = {

	/**
	 * 等于
	 */
	EQ : "eq",
	/**
	 * 不等于
	 */
	NE : "ne",
	/**
	 * 大于等于
	 */
	GE : "ge",
	/**
	 * 小于等于
	 */
	LE : "le",
	/**
	 * 大于
	 */
	GT : "gt",
	/**
	 * 小于
	 */
	LT : "lt",
	/**
	 * 在其中
	 */
	INSIDE : "in",
	/**
	 * 在之间
	 */
	BETWEEN : "between",
	/**
	 * 类似
	 */
	LIKE : "like",
	/**
	 * 起始位类似
	 */
	LIKESTART : "likeStart",
	/**
	 * 结束位类似
	 */
	LIKEEND : "likeEnd",
	/**
	 * 是“”
	 */
	ISEMPTY : "isEmpty",
	/**
	 * 不是“”
	 */
	ISNOTEMPTY : "isNotEmpty",
	/**
	 * 是NULL
	 */
	ISNULL : "isNull",
	/**
	 * 不是NULL
	 */
	ISNOTNULL : "isNotNull"
};
/**
 * @name	Search
 * @package core.project.search
 * @desc	搜索
 * @type	类
 * 
 * @date	2018年5月17日 10:18:40
 */
core.project.search.Search = (function() {

	/**
	 * 处理表格行数据
	 * 
	 * @param search
	 * @param tr
	 * @param trData
	 * @returns
	 */
	function dealTableTrData(search, tr, trData) {

		// 遍历行配置
		for (var i = 0, length = trData.length; i < length; i++) {

			// 获取单元格配置
			var tdData = trData[i];

			// 判断是否存在label属性
			if (tdData.label) {

				// 创建添加label
				tr.append(new core.html.element.viewer.Td().style("word-break:keep-all; white-space:nowrap;").append(
						new core.html.element.viewer.Label().append(tdData.label + ":")));
			}

			// 依据类型处理配置
			switch (tdData.type) {
			case core.project.search.Type.EASYUI.SWITCHBUTTON:

			case core.project.search.Type.EASYUI.COMBOBOX:
			case core.project.search.Type.EASYUI.DATEBOX:
			case core.project.search.Type.EASYUI.DATETIMEBOX:
			case core.project.search.Type.EASYUI.NUMBERBOX:
			case core.project.search.Type.EASYUI.NUMBERSPINNER:
			case core.project.search.Type.EASYUI.TAGBOX:
			case core.project.search.Type.EASYUI.TEXTBOX:
				dealEasyUIInput(search, tr, tdData);
				break;
			}
		}
	}

	/**
	 * 处理按钮
	 * 
	 * @param search
	 * @param tr
	 * @returns
	 */
	function dealButton(search, tr) {

		// 添加按钮
		tr.append(new core.html.element.viewer.Td().style("word-break:keep-all;white-space:nowrap;").colspan(2).append(
				"&nbsp;").append(
				new core.html.element.viewer.A().onInit(function(_this) {

					new core.html.easyui.button.LinkButton(_this.id()).width("80px").text(
							core.project.search.Font.search).onClick(function() {

						search.searchEvent()();
					}).init();
				})).append("&nbsp;").append(
				new core.html.element.viewer.A().onInit(function(_this) {

					new core.html.easyui.button.LinkButton(_this.id()).width("80px").text(
							core.project.search.Font.reset).onClick(function() {

						var fields = search.getFields();
						for (var j = 0, jLength = fields.length; j < jLength; j++) {

							fields[j].clear();
						}
					}).init();
				})));
	}

	/**
	 * 处理EasyUI输入框
	 * 
	 * @param search
	 * @param tr
	 * @param config
	 * @returns
	 */
	function dealEasyUIInput(search, tr, config) {

		// 创建单元格
		var td = new core.html.element.viewer.Td().style("word-break:keep-all; white-space:nowrap;").colspan(
				config.colspan).rowspan(config.rowspan);

		// 获取easyui配置
		var easyui = config.easyui ? config.easyui : {};
		// 除tagbox,添加清除按钮
		if (config.type !== core.project.search.Type.EASYUI.TAGBOX) {

			// 清除按钮
			var clearButton = {
				iconCls : "icon-clear",
				handler : function(e) {

					$(e.data.target).textbox("setValue", "");
				}
			};

			// 是否配置icons属性
			if (easyui.icons) {

				// 添加清除按钮
				easyui.icons.push(clearButton);
			} else {

				// 添加清除按钮
				easyui.icons = [ clearButton ];
			}
		}

		// 判断类型
		switch (config.type) {
		case core.project.search.Type.EASYUI.SWITCHBUTTON:

			// easyui
			var switchbutton;

			// 添加输入框,配置EasyUI
			td.append(new core.html.element.viewer.Input(config.id).onInit(function(_this) {

				// 实例化
				switchbutton = new core.html.easyui.button.SwitchButton(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					switchbutton[attr] && switchbutton[attr](easyui[attr]);
				}
				// 初始化
				switchbutton.init();

				// 回收引用
				easyui = null;
			}));

			// 添加字段
			search.addField({
				ignore : config.ignore,
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.STRING,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.EQ,
				values : function() {

					return [ switchbutton.getValue() ];
				},
				start : function() {

					return switchbutton;
				},
				clear : function() {

					switchbutton.setValue("");
				}
			});

			break;
		case core.project.search.Type.EASYUI.COMBOBOX:

			// easyui
			var combobox;

			// 添加输入框,配置EasyUI
			td.append(new core.html.element.viewer.Input(config.id).onInit(function(_this) {

				// 实例化
				combobox = new core.html.easyui.form.ComboBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					combobox[attr] && combobox[attr](easyui[attr]);
				}
				// 初始化
				combobox.init();

				// 回收引用
				easyui = null;
			}));

			// 添加字段
			search.addField({
				ignore : config.ignore,
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.STRING,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.EQ,
				values : function() {

					return [ combobox.getValue() ];
				},
				start : function() {

					return combobox;
				},
				clear : function() {

					combobox.setValue("");
				}
			});

			break;
		case core.project.search.Type.EASYUI.DATEBOX:

			// easyui
			var startdatebox;
			var enddatebox;

			// 添加输入框,配置EasyUI
			td.append(
					new core.html.element.viewer.Input(config.id ? ("start" + config.id) : config.id).onInit(function(
							_this) {

						// 实例化
						startdatebox = new core.html.easyui.form.DateBox(_this.$jQuery());
						// 遍历参数
						for ( var attr in easyui) {
							// 设置对应参数
							startdatebox[attr] && startdatebox[attr](easyui[attr]);
						}
						// 初始化
						startdatebox.init();
					})).append("&nbsp;-&nbsp;").append(
					new core.html.element.viewer.Input(config.id ? ("end" + config.id) : config.id).onInit(function(
							_this) {

						// 实例化
						enddatebox = new core.html.easyui.form.DateBox(_this.$jQuery());
						// 遍历参数
						for (attr in easyui) {
							// 设置对应参数
							enddatebox[attr] && enddatebox[attr](easyui[attr]);
						}
						// 初始化
						enddatebox.init();
					}));

			// 添加字段
			search.addField({
				ignore : config.ignore,
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.DATE,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.BETWEEN,
				values : function() {

					return [ startdatebox.getValue(), enddatebox.getValue() ];
				},
				start : function() {

					return startdatebox;
				},
				end : function() {

					return enddatebox;
				},
				clear : function() {

					startdatebox.setValue("");
					enddatebox.setValue("");
				}
			});

			break;
		case core.project.search.Type.EASYUI.DATETIMEBOX:

			// easyui
			var startdatetimebox;
			var enddatetimebox;

			// 添加输入框,配置EasyUI
			td.append(
					new core.html.element.viewer.Input(config.id ? ("start" + config.id) : config.id).onInit(function(
							_this) {

						// 实例化
						startdatetimebox = new core.html.easyui.form.DateTimeBox(_this.$jQuery());
						// 遍历参数
						for ( var attr in easyui) {
							// 设置对应参数
							startdatetimebox[attr] && startdatetimebox[attr](easyui[attr]);
						}
						// 初始化
						startdatetimebox.init();
					})).append("&nbsp;-&nbsp;").append(
					new core.html.element.viewer.Input(config.id ? ("end" + config.id) : config.id).onInit(function(
							_this) {

						// 实例化
						enddatetimebox = new core.html.easyui.form.DateTimeBox(_this.$jQuery());
						// 遍历参数
						for ( var attr in easyui) {
							// 设置对应参数
							enddatetimebox[attr] && enddatetimebox[attr](easyui[attr]);
						}
						// 初始化
						enddatetimebox.init();
					}));

			// 添加字段
			search.addField({
				ignore : config.ignore,
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.DATETIME,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.BETWEEN,
				values : function() {

					return [ startdatetimebox.getValue(), enddatetimebox.getValue() ];
				},
				start : function() {

					return startdatetimebox;
				},
				end : function() {

					return enddatetimebox;
				},
				clear : function() {

					startdatetimebox.setValue("");
					enddatetimebox.setValue("");
				}
			});

			break;
		case core.project.search.Type.EASYUI.NUMBERBOX:

			// easyui
			var startnumberbox;
			var endnumberbox;

			// 添加输入框,配置EasyUI
			td.append(
					new core.html.element.viewer.Input(config.id ? ("start" + config.id) : config.id).onInit(function(
							_this) {

						// 实例化
						startnumberbox = new core.html.easyui.form.NumberBox(_this.$jQuery());
						// 遍历参数
						for ( var attr in easyui) {
							// 设置对应参数
							startnumberbox[attr] && startnumberbox[attr](easyui[attr]);
						}
						// 初始化
						startnumberbox.init();
					})).append("&nbsp;-&nbsp;").append(
					new core.html.element.viewer.Input(config.id ? ("end" + config.id) : config.id).onInit(function(
							_this) {

						// 实例化
						endnumberbox = new core.html.easyui.form.NumberBox(_this.$jQuery());
						// 遍历参数
						for ( var attr in easyui) {
							// 设置对应参数
							endnumberbox[attr] && endnumberbox[attr](easyui[attr]);
						}
						// 初始化
						endnumberbox.init();
					}));

			// 添加字段
			search.addField({
				ignore : config.ignore,
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.DOUBLE,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.BETWEEN,
				values : function() {

					return [ startnumberbox.getValue(), endnumberbox.getValue() ];
				},
				start : function() {

					return startnumberbox;
				},
				end : function() {

					return endnumberbox;
				},
				clear : function() {

					startnumberbox.setValue("");
					endnumberbox.setValue("");
				}
			});

			break;
		case core.project.search.Type.EASYUI.NUMBERSPINNER:

			// easyui
			var startnumberspinner;
			var endnumberspinner;

			// 添加输入框,配置EasyUI
			td.append(
					new core.html.element.viewer.Input(config.id ? ("start" + config.id) : config.id).onInit(function(
							_this) {

						// 实例化
						startnumberspinner = new core.html.easyui.form.NumberSpinner(_this.$jQuery());
						// 遍历参数
						for ( var attr in easyui) {
							// 设置对应参数
							startnumberspinner[attr] && startnumberspinner[attr](easyui[attr]);
						}
						// 初始化
						startnumberspinner.init();
					})).append("&nbsp;-&nbsp;").append(
					new core.html.element.viewer.Input(config.id ? ("end" + config.id) : config.id).onInit(function(
							_this) {

						// 实例化
						endnumberspinner = new core.html.easyui.form.NumberSpinner(_this.$jQuery());
						// 遍历参数
						for ( var attr in easyui) {
							// 设置对应参数
							endnumberspinner[attr] && endnumberspinner[attr](easyui[attr]);
						}
						// 初始化
						endnumberspinner.init();
					}));

			// 添加字段
			search.addField({
				ignore : config.ignore,
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.DOUBLE,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.BETWEEN,
				values : function() {

					return [ startnumberspinner.getValue(), endnumberspinner.getValue() ];
				},
				start : function() {

					return startnumberspinner;
				},
				end : function() {

					return endnumberspinner;
				},
				clear : function() {

					startnumberspinner.setValue("");
					endnumberspinner.setValue("");
				}
			});

			break;
		case core.project.search.Type.EASYUI.TAGBOX:

			// easyui
			var tagbox;

			// 添加输入框,配置EasyUI
			td.append(new core.html.element.viewer.Input(config.id).onInit(function(_this) {

				// 实例化
				tagbox = new core.html.easyui.form.TagBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					tagbox[attr] && tagbox[attr](easyui[attr]);
				}
				// 初始化
				tagbox.init();

				// 回收引用
				easyui = null;
			}));

			// 添加字段
			search.addField({
				ignore : config.ignore,
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.STRING,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.EQ,
				values : function() {

					return [ tagbox.getValue() ];
				},
				start : function() {

					return tagbox;
				},
				clear : function() {

					tagbox.setValue("");
				}
			});

			break;
		case core.project.search.Type.EASYUI.TEXTBOX:

			// easyui
			var textbox;

			// 创建输入框,配置EasyUI
			td.append(new core.html.element.viewer.Input(config.id).onInit(function(_this) {

				// 实例化
				textbox = new core.html.easyui.form.TextBox(_this.$jQuery());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					textbox[attr] && textbox[attr](easyui[attr]);
				}
				// 初始化
				textbox.init();

				// 回收引用
				easyui = null;
			}));

			// 添加字段
			search.addField({
				ignore : config.ignore,
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.STRING,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.LIKE,
				values : function() {

					return [ textbox.getValue() ];
				},
				start : function() {

					return textbox;
				},
				clear : function() {

					textbox.setValue("");
				}
			});

			break;
		}

		// 添加单元格
		tr.append(td);
	}

	/**
	 * 通过字段获取JSON
	 * 
	 * @param fields{array}
	 * @returns {array}
	 */
	function getJsonFromFields(fields) {

		// 返回的json
		var json = [];

		// 遍历搜索字段
		for (var i = 0, length = fields.length; i < length; i++) {

			// 搜索字段
			var field = fields[i];

			// 判断该字段是否需要忽略
			if (field.ignore === undefined || !field.ignore) {

				// 判断值的个数
				if (field.values().length === 1) {

					// 获取值
					var value = field.values()[0];

					// 值不为空
					if (value !== "") {

						// 添加数据
						json.push({
							field : field.field,
							value : [ value ],
							fieldtype : field.dataType,
							model : field.queryMode
						});
					}
				} else {

					// 获取值
					var min = field.values()[0];
					var max = field.values()[1];

					// 判断最小值最大值的存在关系
					if (min === "" && max !== "") {

						json
								.push({
									field : field.field,
									value : [ max ],
									fieldtype : field.dataType,
									model : field.queryMode === core.project.search.QueryMode.BETWEEN ? core.project.search.QueryMode.LE
											: field.queryMode
								});
					} else if (min !== "" && max === "") {

						json
								.push({
									field : field.field,
									value : [ min ],
									fieldtype : field.dataType,
									model : field.queryMode === core.project.search.QueryMode.BETWEEN ? core.project.search.QueryMode.GE
											: field.queryMode
								});
					} else if (min !== "" && max !== "") {

						json.push({
							field : field.field,
							value : [ min, max ],
							fieldtype : field.dataType,
							model : field.queryMode
						});
					}
				}
			}
		}

		return json;
	}

	/**
	 * 通过字段获取SQL
	 * 
	 * @param fields{array}
	 * @returns {string}
	 */
	function getSqlFromFields(fields) {

		// 返回的sql
		var sql = [];

		// 遍历搜索字段
		for (var i = 0, length = fields.length; i < length; i++) {

			// 搜索字段
			var field = fields[i];

			// 判断该字段是否需要忽略
			if (field.ignore === undefined || !field.ignore) {

				// 判断值的个数
				if (field.values().length === 1) {

					// 获取值
					var value = field.values()[0];

					// 值不为空
					if (value !== "") {

						sql.push(" and ");
						sql.push(field.field);
						switch (field.queryMode) {
						case core.project.search.QueryMode.EQ:
							sql.push(" ='" + value + "' ");
							break;
						case core.project.search.QueryMode.NE:
							sql.push(" <>'" + value + "' ");
							break;
						case core.project.search.QueryMode.GE:
							sql.push(" >='" + value + "' ");
							break;
						case core.project.search.QueryMode.LE:
							sql.push(" <='" + value + "' ");
							break;
						case core.project.search.QueryMode.GT:
							sql.push(" >'" + value + "' ");
							break;
						case core.project.search.QueryMode.LT:
							sql.push(" <'" + value + "' ");
							break;
						case core.project.search.QueryMode.LIKE:
							sql.push(" like '%" + value + "%' ");
							break;
						case core.project.search.QueryMode.LIKESTART:
							sql.push(" like '" + value + "%' ");
							break;
						case core.project.search.QueryMode.LIKEEND:
							sql.push(" like '%" + value + "' ");
							break;
						case core.project.search.QueryMode.ISEMPTY:
							sql.push((value === true || value === "true") ? " = " : " <> ");
							sql.push(" '' ");
							break;
						case core.project.search.QueryMode.ISNOTEMPTY:
							sql.push((value === true || value === "true") ? " <> " : " = ");
							sql.push(" '' ");
							break;
						case core.project.search.QueryMode.ISNULL:
							sql.push(" is ");
							sql.push((value === true || value === "true") ? "" : " not ");
							sql.push(" null ");
							break;
						case core.project.search.QueryMode.ISNOTNULL:
							sql.push(" is ");
							sql.push((value === true || value === "true") ? " not " : "");
							sql.push(" null ");
							break;
						}
					}
				} else {

					// 获取值
					var min = field.values()[0];
					var max = field.values()[1];

					// 判断最小值最大值的存在关系
					if (min === "" && max !== "") {

						sql.push(" and ");
						sql.push(field.field);

						if (core.project.search.CurrentDBType === core.project.search.DBType.ORACLE
								&& field.dataType === core.project.search.DataType.DATE) {

							sql.push(" <=to_date('" + max + "', 'yyyy-mm-dd') ");
						} else if (core.project.search.CurrentDBType === core.project.search.DBType.ORACLE
								&& field.dataType === core.project.search.DataType.DATETIME) {

							sql.push(" <=to_date('" + max + "', 'yyyy-mm-dd hh24:mi:ss') ");
						} else {

							sql.push(" <='" + max + "' ");
						}
					} else if (min !== "" && max === "") {

						sql.push(" and ");
						sql.push(field.field);

						if (core.project.search.CurrentDBType === core.project.search.DBType.ORACLE
								&& field.dataType === core.project.search.DataType.DATE) {

							sql.push(" >=to_date('" + min + "', 'yyyy-mm-dd') ");
						} else if (core.project.search.CurrentDBType === core.project.search.DBType.ORACLE
								&& field.dataType === core.project.search.DataType.DATETIME) {

							sql.push(" >=to_date('" + min + "', 'yyyy-mm-dd hh24:mi:ss') ");
						} else {

							sql.push(" >='" + min + "' ");
						}
					} else if (min !== "" && max !== "") {

						sql.push(" and ");
						sql.push(field.field);

						if (core.project.search.CurrentDBType === core.project.search.DBType.ORACLE
								&& field.dataType === core.project.search.DataType.DATE) {

							sql.push(" between to_date('" + min + "', 'yyyy-mm-dd') and to_date('" + max
									+ "', 'yyyy-mm-dd') ");
						} else if (core.project.search.CurrentDBType === core.project.search.DBType.ORACLE
								&& field.dataType === core.project.search.DataType.DATETIME) {

							sql.push(" between to_date('" + min + "', 'yyyy-mm-dd hh24:mi:ss') and to_date('" + max
									+ "', 'yyyy-mm-dd hh24:mi:ss') ");
						} else {

							sql.push(" between '" + min + "' and '" + max + "' ");
						}
					}
				}
			}
		}

		// 返回sql
		return sql.join("");
	}

	/**
	 * 构造函数
	 * 
	 * @param id
	 * @returns
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
		 * 按钮位置
		 */
		var buttonPosition = true;
		
		/**
		 * 搜索按钮事件
		 */
		var searchEvent = function() {

		};

		/**
		 * 获取Div对象
		 * 
		 * @return core.html.element.Element
		 */
		this.div = function() {

			return div;
		};

		/**
		 * 添加搜索字段
		 * 
		 * @param field{object}
		 * @returns
		 */
		this.addField = function(field) {

			fields.push(field);
		};

		/**
		 * 返回搜索字段
		 * 
		 * @returns {array}
		 */
		this.getFields = function() {

			return fields;
		};

		/**
		 * 获取/设置按钮位置
		 * 
		 * @param buttonPosition{Boolean}
		 * @returns {Boolean/core.project.search.Search}
		 */
		this.buttonPosition = function() {

			switch (arguments.length) {
			case 0:
				return buttonPosition;
			default:
				buttonPosition = arguments[0];
				return this;
			}
		};
		
		/**
		 * 获取/设置搜索事件
		 * 
		 * @param searchEvent{function}
		 * @returns {function/core.project.search.Search}
		 */
		this.searchEvent = function() {

			switch (arguments.length) {
			case 0:
				return searchEvent;
			default:
				searchEvent = arguments[0];
				return this;
			}
		};
	};

	/**
	 * 搜索初始化
	 * 
	 * @param configs{array}
	 * @returns
	 */
	Constructor.prototype.project = function(configs) {

		// 创建表格对象
		var table = new core.html.element.viewer.Table().style("font-size:12px;").appendTo(this.div());
		// 遍历配置项
		for (var i = 0, length = configs.length; i < length; i++) {

			// 创建表格行
			var tr = new core.html.element.viewer.Tr().appendTo(table);

			// 处理表格行数据
			dealTableTrData(this, tr, configs[i]);
			// 为第一行,则处理按钮
			if (this.buttonPosition()) {

				i === 0 && dealButton(this, tr);
			} else {

				i === (length - 1) && dealButton(this, tr);
			}
		}

		return this;
	};

	/**
	 * 显示搜索框
	 */
	Constructor.prototype.show = function() {

		this.div().$jQuery().show();

		return this;
	};

	/**
	 * 隐藏搜索框
	 */
	Constructor.prototype.hide = function() {

		this.div().$jQuery().hide();

		return this;
	};

	/**
	 * 获取json
	 * 
	 * @returns {array}
	 */
	Constructor.prototype.getJson = function() {

		return getJsonFromFields(this.getFields());
	};

	/**
	 * 获取sql
	 * 
	 * @returns {string}
	 */
	Constructor.prototype.getSql = function() {

		return getSqlFromFields(this.getFields());
	};

	/**
	 * 获取字段对象
	 * 
	 * @param field{string}
	 * @returns {object}
	 */
	Constructor.prototype.getField = function(field) {

		var fields = this.getFields();

		for (var i = 0, length = fields.length; i < length; i++) {

			if (fields[i].field === field) {

				return fields[i];
			}
		}

		return null;
	};

	return Constructor;
})();
/**
 * @name	Type
 * @package core.project.search
 * @desc	搜索框类型
 * @type	枚举
 * 
 * @date	2016年9月2日 16:25:11
 */
core.project.search.Type = {

	EASYUI : {
		SWITCHBUTTON : "switchbutton",

		COMBOBOX : "combobox",
		DATEBOX : "datebox",
		DATETIMEBOX : "datetimebox",
		NUMBERBOX : "numberbox",
		NUMBERSPINNER : "numberspinner",
		TAGBOX : "tagbox",
		TEXTBOX : "textbox"
	}
};
