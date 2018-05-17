/**
 * 包
 */

// 项目包
core.project = {

	// 常量包
	constant : {},

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
 * @name	Font
 * @package core.project.constant
 * @desc	语言
 * @type	枚举
 * 
 * @date	2016年11月2日 09:53:40
 */
core.project.constant.Font = function() {

	// 获取浏览器语言设置
	var language = navigator.language;
	if (!language)
		language = navigator.browserLanguage;

	if (language.toLowerCase().indexOf("zh") >= 0) {
		
		return {
			add : "增加",
			edit : "编辑",
			del : "删除",
			save : "保存",
			update : "更新",
			remove : "移除",
			confirm : "确认",
			cancel : "取消",
			search : "搜索",
			reset : "重置",
			back : "后退",
			print : "打印",
			download : "下载",
			upload : "上传",
			yes : "是",
			no : "否",
			success : "成功",
			failure : "失败"
		};
	} else if (language.toLowerCase().indexOf("en") >= 0) {
		
		return {};
	}
}();
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
		var div = new core.html.element.viewer.Div().style(style.join(" ")).init();

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
/**
 * @name	Form
 * @package core.project.form
 * @desc	表单
 * @type	类
 * 
 * @date	2018年5月11日 14:47:27
 */
core.project.form.Form = (function() {

	/**
	 * 处理组内表格行数据
	 * 
	 * @param tr
	 * @param trData
	 * @returns
	 */
	function dealTableTrData(tr, trData) {

		// 遍历表格行的格数据
		for (var i = 0, length = trData.length; i < length; i++) {

			// 格数据
			var tdData = trData[i];

			// 判断是否存在label属性
			if (tdData.label) {

				// 创建添加label
				tr.append(new core.html.element.viewer.Td().style("white-space:nowrap;text-align:right;").append(
						new core.html.element.viewer.Label().append(tdData.label + ":")));
			}

			// 依据单元格数据类型,处理
			switch (tdData.type) {
			case core.project.form.Type.A:
				dealA(tr, tdData);
				break;
			case core.project.form.Type.LABEL:
				dealLabel(tr, tdData);
				break;
			case core.project.form.Type.DIV:
				dealDiv(tr, tdData);
				break;
			case core.project.form.Type.INPUT.HIDDEN:
			case core.project.form.Type.INPUT.RADIO:
			case core.project.form.Type.INPUT.CHECKBOX:
				dealInput(tr, tdData);
				break;
			case core.project.form.Type.EASYUI.SWITCHBUTTON:
			case core.project.form.Type.EASYUI.CALENDAR:
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
			case core.project.form.Type.EASYUI.SLIDER:
			case core.project.form.Type.EASYUI.SPINNER:
			case core.project.form.Type.EASYUI.TAGBOX:
			case core.project.form.Type.EASYUI.TEXTAREA:
			case core.project.form.Type.EASYUI.TEXTBOX:
			case core.project.form.Type.EASYUI.TIMESPINNER:
			case core.project.form.Type.EASYUI.VALIDATEBOX:
				dealEasyUIInput(tr, tdData);
				break;
			}
		}
	}

	/**
	 * 处理A
	 * 
	 * @param tr
	 * @param config
	 * @returns
	 */
	function dealA(tr, config) {

		// 行添加单元格,单元格添加A
		tr.append(new core.html.element.viewer.Td().style(config.tdStyle ? config.tdStyle : "white-space:nowrap;")
				.colspan(config.colspan).rowspan(config.rowspan).append(config.before).append(
						new core.html.element.viewer.A(config.id).append(config.text)).append(config.after));
	}

	/**
	 * 处理Label
	 * 
	 * @param tr
	 * @param config
	 * @returns
	 */
	function dealLabel(tr, config) {

		// 行添加单元格,单元格添加Label
		tr.append(new core.html.element.viewer.Td().style(config.tdStyle ? config.tdStyle : "white-space:nowrap;")
				.colspan(config.colspan).rowspan(config.rowspan).append(config.before).append(
						new core.html.element.viewer.Label(config.id).append(config.text)).append(config.after));
	}

	/**
	 * 处理Div
	 * 
	 * @param tr
	 * @param config
	 * @returns
	 */
	function dealDiv(tr, config) {

		// 行添加单元格,单元格添加Div
		tr.append(new core.html.element.viewer.Td().style(config.tdStyle).colspan(config.colspan).rowspan(
				config.rowspan).append(config.before).append(
				new core.html.element.viewer.Div(config.id).append(config.content)).append(config.after));
	}

	/**
	 * 处理输入框
	 * 
	 * @param tr
	 * @param config
	 * @returns
	 */
	function dealInput(tr, config) {

		// 隐藏域特殊处理
		if (config.type === core.project.form.Type.INPUT.HIDDEN) {

			// 添加隐藏域
			tr.append(new core.html.element.viewer.Input(config.id).type("hidden").name(
					config.name ? config.name : config.id).value(config.value));
		} else {

			// 创建输入框单元格
			var td = new core.html.element.viewer.Td().style(config.tdStyle ? config.tdStyle : "white-space:nowrap;")
					.colspan(config.colspan).rowspan(config.rowspan).append(config.before);

			// 判断输入框类型
			switch (config.type) {
			case core.project.form.Type.INPUT.RADIO:

				// 获取数据
				var data = config.data;
				// 遍历数据
				for (var i = 0; i < data.length; i++) {

					// 添加单选
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

					// 添加单选
					td.append(new core.html.element.viewer.Input(config.id + i).type("checkbox").name(
							config.name ? config.name : config.id).value(data[i].value));
					// 添加标签
					td.append(new core.html.element.viewer.Label().forAttr(config.id + i).append(data[i].text));
				}

				break;
			}

			// 后元素
			td.append(config.after);

			// 行添加单元格
			tr.append(td);
		}
	}

	/**
	 * 处理EasyUI输入框
	 * 
	 * @param tr
	 * @param config
	 * @returns
	 */
	function dealEasyUIInput(tr, config) {

		// 创建输入框单元格
		var td = new core.html.element.viewer.Td().style(config.tdStyle ? config.tdStyle : "white-space:nowrap;")
				.colspan(config.colspan).rowspan(config.rowspan).append(config.before);

		// 创建输入框对象
		var input = new core.html.element.viewer.Input(config.id).name(config.name ? config.name : config.id);
		// 获取easyui配置
		var easyui = config.easyui ? config.easyui : {};

		// 判断EasyUI输入框类型
		switch (config.type) {
		case core.project.form.Type.EASYUI.SWITCHBUTTON:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui选择按钮模板
				var switchbutton = new core.html.easyui.button.SwitchButton(_this.$jQuery());
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

			break;
		case core.project.form.Type.EASYUI.CALENDAR:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui选择按钮模板
				var calendar = new core.html.easyui.form.Calendar(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					calendar[attr] && calendar[attr](easyui[attr]);
				}
				// 初始化
				calendar.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.COMBO:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui下拉框模板
				var combo = new core.html.easyui.form.Combo(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					combo[attr] && combo[attr](easyui[attr]);
				}
				// 初始化
				combo.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.COMBOBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui下拉列表框模板
				var combobox = new core.html.easyui.form.ComboBox(_this.$jQuery());
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

			break;
		case core.project.form.Type.EASYUI.COMBOGRID:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui下拉列表框模板
				var combogrid = new core.html.easyui.form.ComboGrid(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					combogrid[attr] && combogrid[attr](easyui[attr]);
				}
				// 初始化
				combogrid.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.COMBOTREE:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui下拉列表框模板
				var combotree = new core.html.easyui.form.ComboTree(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					combotree[attr] && combotree[attr](easyui[attr]);
				}
				// 初始化
				combotree.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.COMBOTREEGRID:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui下拉列表框模板
				var combotreegrid = new core.html.easyui.form.ComboTreeGrid(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					combotreegrid[attr] && combotreegrid[attr](easyui[attr]);
				}
				// 初始化
				combotreegrid.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.DATEBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui日期框模板
				var datebox = new core.html.easyui.form.DateBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					datebox[attr] && datebox[attr](easyui[attr]);
				}
				// 初始化
				datebox.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.DATETIMEBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui日期时间框模板
				var datetimebox = new core.html.easyui.form.DateTimeBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					datetimebox[attr] && datetimebox[attr](easyui[attr]);
				}
				// 初始化
				datetimebox.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.DATETIMESPINNER:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui日期时间微调框模板
				var datetimespinner = new core.html.easyui.form.DateTimeSpinner(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					datetimespinner[attr] && datetimespinner[attr](easyui[attr]);
				}
				// 初始化
				datetimespinner.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.FILEBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui文件框模板
				var filebox = new core.html.easyui.form.FileBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					filebox[attr] && filebox[attr](easyui[attr]);
				}
				// 初始化
				filebox.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.MASKEDBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui文件框模板
				var maskedbox = new core.html.easyui.form.MaskedBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					maskedbox[attr] && maskedbox[attr](easyui[attr]);
				}
				// 初始化
				maskedbox.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.NUMBERBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui数字框模板
				var numberbox = new core.html.easyui.form.NumberBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					numberbox[attr] && numberbox[attr](easyui[attr]);
				}
				// 初始化
				numberbox.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.NUMBERSPINNER:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui数字微调框模板
				var numberspinner = new core.html.easyui.form.NumberSpinner(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					numberspinner[attr] && numberspinner[attr](easyui[attr]);
				}
				// 初始化
				numberspinner.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.PASSWORDBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui密码框模板
				var passwordbox = new core.html.easyui.form.PasswordBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					passwordbox[attr] && passwordbox[attr](easyui[attr]);
				}
				// 初始化
				passwordbox.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.SLIDER:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui拖动条模板
				var slider = new core.html.easyui.form.Slider(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					slider[attr] && slider[attr](easyui[attr]);
				}
				// 初始化
				slider.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.SPINNER:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui微调框模板
				var spinner = new core.html.easyui.form.Spinner(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					spinner[attr] && spinner[attr](easyui[attr]);
				}
				// 初始化
				spinner.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.TAGBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui标签模板
				var tagbox = new core.html.easyui.form.TagBox(_this.$jQuery());
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

			break;
		case core.project.form.Type.EASYUI.TEXTAREA:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui文本区模板
				var textarea = new core.html.easyui.form.Textarea(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					textarea[attr] && textarea[attr](easyui[attr]);
				}
				// 初始化
				textarea.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.TEXTBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui文本框模板
				var textbox = new core.html.easyui.form.TextBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					textbox[attr] && textbox[attr](easyui[attr]);
				}
				// 初始化
				textbox.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.TIMESPINNER:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui时间微调框模板
				var timespinner = new core.html.easyui.form.TimeSpinner(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					timespinner[attr] && timespinner[attr](easyui[attr]);
				}
				// 初始化
				timespinner.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.VALIDATEBOX:

			// 添加输入框
			td.append(input.onInit(function(_this) {

				// 调用easyui验证框模板
				var validatebox = new core.html.easyui.form.ValidateBox(_this.$jQuery());
				// 遍历参数
				for ( var attr in easyui) {
					// 设置对应参数
					validatebox[attr] && validatebox[attr](easyui[attr]);
				}
				// 初始化
				validatebox.init();

				// 回收引用
				easyui = null;
			}));

			break;
		}

		// 后元素
		td.append(config.after);

		// 行添加单元格
		tr.append(td);
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
		 * 是否分组
		 */
		var isGroup = false;

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
		 * 获取/设置是否分组
		 * 
		 * @param isGroup{boolean}
		 * @returns {boolean/core.project.form.Form}
		 */
		this.isGroup = function() {

			switch (arguments.length) {
			case 0:
				return isGroup;
			default:
				isGroup = arguments[0];
				return this;
			}
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

		// 创建表单对象
		var form = new core.html.element.viewer.Form(this.formId()).style("padding-top:15px;").method("post").enctype(
				"multipart/form-data");
		// 添加表单HTML
		this.content(form.convertHtml());
		// 初始化Dialog
		this.init();

		// 获取是否分组
		var isGroup = this.isGroup();
		// 获取表单数据
		var data = this.groupData();
		// 遍历表单数据
		for (var i = 0, length = data.length; i < length; i++) {

			// 获取本组数据
			var groupData = data[i];

			// 创建组内表格对象
			var table = new core.html.element.viewer.Table(groupData.id).style("border-spacing:5px;font-size:12px;")
					.align("center");
			// 依据是否分组,判断是否创建组描述
			if (isGroup) {

				// 创建分组对象,并添加分组描述信息,并添加表格对象,并添加至表单对象
				new core.html.element.viewer.Fieldset().append(
						new core.html.element.viewer.Legend().append(groupData.text)).append(table).appendTo(form);
			} else {

				// 将表格对象添加至表单对象中
				table.appendTo(form);
			}

			// 获取组内表格数据
			var tableData = groupData.data;
			// 遍历组内表格数据
			for (var j = 0, jLength = tableData.length; j < jLength; j++) {

				// 处理组内表格行数据
				dealTableTrData(new core.html.element.viewer.Tr().appendTo(table), tableData[j]);
			}
		}

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

	return Constructor;
})();
/**
 * @name	Type
 * @package core.project.form
 * @desc	表单数据内容类型
 * @type	枚举
 * 
 * @date	2016年9月2日 16:25:11
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
core.project.search.CurrentDBType = core.project.search.DBType.ORACLE;
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

					new core.html.easyui.button.LinkButton(_this.id()).width("80px").text("搜&nbsp;&nbsp;&nbsp;索")
							.onClick(function() {

								search.searchEvent()();
							}).init();
				})).append("&nbsp;").append(
				new core.html.element.viewer.A().onInit(function(_this) {

					new core.html.easyui.button.LinkButton(_this.id()).width("80px").text("重&nbsp;&nbsp;&nbsp;置")
							.onClick(function() {

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
				start : switchbutton,
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
				start : combobox,
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
				start : startdatebox,
				end : enddatebox,
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
				start : startdatetimebox,
				end : enddatetimebox,
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
				start : startnumberbox,
				end : endnumberbox,
				clear : function() {

					startnumberbox.setValue("");
					endnumberbox.setValue("");
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
				start : tagbox,
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
				start : textbox,
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

		// 备份this对象
		var search = this;

		// 创建表格对象
		var table = new core.html.element.viewer.Table().style("font-size:12px;").appendTo(this.div());
		// 遍历配置项
		for (var i = 0, length = configs.length; i < length; i++) {

			// 创建表格行
			var tr = new core.html.element.viewer.Tr().appendTo(table);

			// 处理表格行数据
			dealTableTrData(this, tr, configs[i]);
			// 为第一行,则处理按钮
			i === 0 && dealButton(this, tr);
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
	 * @returns {Array}
	 */
	Constructor.prototype.getJson = function() {

		return getJsonFromFields(this.getFields());
	};

	/**
	 * 获取sql
	 * 
	 * @returns {String}
	 */
	Constructor.prototype.getSql = function() {

		return getSqlFromFields(this.getFields());
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
		TAGBOX : "tagbox",
		TEXTBOX : "textbox"
	}
};
