/**
 * 包
 */

// 项目包
core.project = {

	cover : {},

	datagrid : {},

	form : {},

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
 * @date	2016年9月3日 09:36:45
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
		style.push("width : 99%;");
		style.push("height : 98%;");
		style.push("margin : 0px;");
		style.push("padding : 0px;");
		style.push("position : absolute;");
		style.push("background : #F8F8F8;");
		style.push("filter : alpha(opacity=70);");
		style.push("opacity : 0.7;");
		style.push("z-index : 99999;");
		/**
		 * 遮盖层
		 */
		var div = new core.html.element.viewer.Div().style(style.join(""));

		/**
		 * 获取/设置遮盖层
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
	};

	/**
	 * 添加HTML信息
	 * 
	 * @param html
	 * @returns {core.project.cover.Cover}
	 */
	Constructor.prototype.append = function(html) {

		this.div().append(html);
		
		return this;
	};

	/**
	 * 显示遮盖层
	 * 
	 * @returns {core.project.cover.Cover}
	 */
	Constructor.prototype.show = function() {

		this.div().show();
		
		return this;
	};

	/**
	 * 隐藏遮盖层
	 * 
	 * @returns {core.project.cover.Cover}
	 */
	Constructor.prototype.hide = function() {

		this.div().hide();
		
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
 * @constructor	core.project.datagrid.DataGrid(String id)
 * 
 * @extend	core.html.easyui.datagrid.DataGrid
 * 
 * @date	2016年9月1日 16:02:05
 */

core.project.datagrid.DataGrid = (function() {

	/**
	 * 对象转字符串
	 * 
	 * @param object{Object}
	 * @returns {String}
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
/**
 * @name	Form
 * @package core.project.form
 * @desc	表单
 * @type	类
 * 
 * @date	2016年9月2日 16:25:11
 */

core.project.form.Form = (function() {

	/**
	 * 处理单元格数据
	 * 
	 * @param data
	 */
	function dealTdData(data) {

		// 判断类型
		switch (data.type) {
		case core.project.form.Type.A:

			return new core.html.element.viewer.A(data.id).append(data.value);
		case core.project.form.Type.EASYUI.COMBO:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui下拉框模板
				var combo = new core.html.easyui.form.Combo(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					combo[attr] && combo[attr](easyui[attr]);
				}
				// 初始化
				combo.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.COMBOBOX:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui下拉列表框模板
				var combobox = new core.html.easyui.form.ComboBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					combobox[attr] && combobox[attr](easyui[attr]);
				}
				// 初始化
				combobox.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.DATEBOX:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui日期框模板
				var datebox = new core.html.easyui.form.DateBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					datebox[attr] && datebox[attr](easyui[attr]);
				}
				// 初始化
				datebox.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.DATETIMEBOX:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui日期时间框模板
				var datetimebox = new core.html.easyui.form.DateTimeBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					datetimebox[attr] && datetimebox[attr](easyui[attr]);
				}
				// 初始化
				datetimebox.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.DATETIMESPINNER:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui日期时间微调框模板
				var datetimespinner = new core.html.easyui.form.DateTimeSpinner(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					datetimespinner[attr] && datetimespinner[attr](easyui[attr]);
				}
				// 初始化
				datetimespinner.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.FILEBOX:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui文件框模板
				var filebox = new core.html.easyui.form.FileBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					filebox[attr] && filebox[attr](easyui[attr]);
				}
				// 初始化
				filebox.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.NUMBERBOX:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui数字框模板
				var numberbox = new core.html.easyui.form.NumberBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					numberbox[attr] && numberbox[attr](easyui[attr]);
				}
				// 初始化
				numberbox.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.NUMBERSPINNER:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui数字微调框模板
				var numberspinner = new core.html.easyui.form.NumberSpinner(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					numberspinner[attr] && numberspinner[attr](easyui[attr]);
				}
				// 初始化
				numberspinner.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.PASSWORDBOX:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui密码框模板
				var passwordbox = new core.html.easyui.form.PasswordBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					passwordbox[attr] && passwordbox[attr](easyui[attr]);
				}
				// 初始化
				passwordbox.init();

				// 回收引用
				easyui = null;
			});

			return input;
		case core.project.form.Type.EASYUI.SLIDER:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui拖动条模板
				var slider = new core.html.easyui.form.Slider(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					slider[attr] && slider[attr](easyui[attr]);
				}
				// 初始化
				slider.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.SPINNER:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui微调框模板
				var spinner = new core.html.easyui.form.Spinner(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					spinner[attr] && spinner[attr](easyui[attr]);
				}
				// 初始化
				spinner.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.TEXTBOX:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui文本框模板
				var textbox = new core.html.easyui.form.TextBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					textbox[attr] && textbox[attr](easyui[attr]);
				}
				// 初始化
				textbox.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.TIMESPINNER:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui时间微调框模板
				var timespinner = new core.html.easyui.form.TimeSpinner(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					timespinner[attr] && timespinner[attr](easyui[attr]);
				}
				// 初始化
				timespinner.init();

				// 回收引用
				easyui = null;
			});
		case core.project.form.Type.EASYUI.VALIDATEBOX:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

				// 调用easyui验证框模板
				var validatebox = new core.html.easyui.form.ValidateBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					validatebox[attr] && validatebox[attr](easyui[attr]);
				}
				// 初始化
				validatebox.init();

				// 回收引用
				easyui = null;
			});
		}
	}

	/**
	 * 构造函数
	 * 
	 * @param id
	 */
	var Constructor = function(id) {

		/**
		 * 表单对象
		 */
		var form = new core.html.element.viewer.Form(id);
		/**
		 * 表单内容
		 */
		var content = [];
		/**
		 * 是否分组
		 */
		var isGroup = false;

		/**
		 * 获取表单对象
		 */
		this.form = function() {

			return form;
		};

		/**
		 * 获取/设置表单内容
		 * 
		 * @param content
		 */
		this.content = function() {

			switch (arguments.length) {
			case 0:
				return content[0].data;
			default:
				content = [ {
					data : arguments[0]
				} ];
				return this;
			}
		};

		/**
		 * 获取/设置分组表单内容
		 * 
		 * @param groupContent
		 */
		this.groupContent = function() {

			switch (arguments.length) {
			case 0:
				return content;
			default:
				content = arguments[0];
				return this;
			}
		};

		/**
		 * 获取/设置是否分组
		 * 
		 * @param isGroup
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

	/**
	 * 表单初始化
	 */
	Constructor.prototype.init = function() {

		// 获取表单对象
		var form = this.form();
		// 获取表单内容
		var content = this.groupContent();
		// 获取是否分组
		var isGroup = this.isGroup();

		// 清空表单内容
		form.clear();

		// 遍历表单内容
		for (var i = 0, length = content.length; i < length; i++) {

			// 获取本组内容
			var groupContent = content[i];

			// 创建表格对象
			var table = new core.html.element.viewer.Table(groupContent.id).style("width:100%");
			// 处理是否分组
			if (isGroup) {

				// 创建分组对象,并添加分组描述信息,并添加表格对象,并添加至表单对象
				new core.html.element.viewer.Fieldset().append(
						new core.html.element.viewer.Legend().append(groupContent.text)).append(table).appendTo(form);
			} else {

				// 将表格对象添加至表单对象中
				table.appendTo(form);
			}

			// 获取本组行内容
			var trContent = groupContent.data;
			// 遍历本组行内容
			for (var i = 0, length = trContent.length; i < length; i++) {

				// 创建行对象,并添加至表格对象中
				var tr = new core.html.element.viewer.Tr().appendTo(table);

				// 获取单元格内容
				var tdContent = trContent[i];
				// 遍历单元格内容
				for (var j = 0, jLength = tdContent.length; j < jLength; j++) {

					// 每个单元格的数据
					var tdData = tdContent[j];

					// 创建标签单元格对象,并设置样式,并添加标签对象,并添加至行对象中
					new core.html.element.viewer.Td().style("text-align:right;").rowspan(
							tdData.rowspan ? tdData.rowspan : 1).append(
							new core.html.element.viewer.Label().append(tdData.label + ":")).appendTo(tr);
					// 创建数据单元格对象
					new core.html.element.viewer.Td().colspan(tdData.colspan ? tdData.colspan : 1).rowspan(
							tdData.rowspan ? tdData.rowspan : 1).append(dealTdData(tdData)).appendTo(tr);
				}
			}
		}
	};

	/**
	 * 显示表单
	 */
	Constructor.prototype.show = function() {

		this.form().show();
	};

	/**
	 * 隐藏表单
	 */
	Constructor.prototype.hide = function() {

		this.form().hide();
	};

	// 返回构造函数
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
	BUTTON : "button",
	DIV : "div",
	INPUT : "input",
	LABEL : "label",
	TEXTAREA : "textarea",
	EASYUI : {
		COMBO : "combo",
		COMBOBOX : "combobox",
		DATEBOX : "datebox",
		DATETIMEBOX : "datetimebox",
		DATETIMESPINNER : "datetimespinner",
		FILEBOX : "filebox",
		NUMBERBOX : "numberbox",
		NUMBERSPINNER : "numberspinner",
		PASSWORDBOX : "passwordbox",
		SLIDER : "slider",
		SPINNER : "spinner",
		TEXTBOX : "textbox",
		TIMESPINNER : "timespinner",
		VALIDATEBOX : "validatebox"
	}
}
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
	BOOLEAN : "boolean",
	STRING : "string",
	DATE : "date",
	DATETIME : "datetime"
};
/**
 * @name	QueryMode
 * @package core.project.search
 * @desc	查询模式
 * @type	枚举
 * 
 * @date	2016年9月5日 15:12:38
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
 * @name Search
 * @package core.project.search
 * @desc 搜索
 * @type 类
 * 
 * @date 2016年9月7日 15:52:52
 */

core.project.search.Search = (function() {

	/**
	 * 处理单元格数据
	 * 
	 * @param search
	 * @param config
	 * @param td
	 */
	function dealTdData(search, config, td) {

		/**
		 * 判断类型
		 */
		switch (config.type) {
		case core.project.search.Type.EASYUI.COMBOBOX:

			// 获取easyui配置
			var easyui = config.easyui ? config.easyui : {};
			// easyui下拉列表框
			var combobox;

			// 添加输入框
			td.append(new core.html.element.viewer.Input(config.id).load(function(_this) {

				// 调用easyui下拉列表框模板
				combobox = new core.html.easyui.form.ComboBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					combobox[attr] && combobox[attr](easyui[attr]);
				}
				// 初始化
				combobox.init();
			}));

			// 添加字段
			search.addField({
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.STRING,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.EQ,
				min : function() {
					return combobox.getValue();
				},
				max : function() {
					return null;
				},
				clear : function() {
					combobox.setValue("");
				}
			});
			// 跳出
			break;
		case core.project.search.Type.EASYUI.DATEBOX:

			// 获取easyui配置
			var easyui = config.easyui ? config.easyui : {};
			// easyui日期框
			var startdatebox;
			var enddatebox;

			// 添加输入框
			td.append(new core.html.element.viewer.Input("start" + config.id).load(function(_this) {

				// 调用easyui日期框模板
				startdatebox = new core.html.easyui.form.DateBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					startdatebox[attr] && startdatebox[attr](easyui[attr]);
				}
				// 初始化
				startdatebox.init();
			}));
			td.append("&nbsp;至&nbsp;");
			td.append(new core.html.element.viewer.Input("end" + config.id).load(function(_this) {

				// 调用easyui日期框模板
				enddatebox = new core.html.easyui.form.DateBox(_this.id());
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
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.DATE,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.BETWEEN,
				min : function() {
					return startdatebox.getValue();
				},
				max : function() {
					return enddatebox.getValue();
				},
				clear : function() {
					startdatebox.setValue("");
					enddatebox.setValue("");
				}
			});
			// 跳出
			break;
		case core.project.search.Type.EASYUI.DATETIMEBOX:

			// 获取easyui配置
			var easyui = config.easyui ? config.easyui : {};
			// easyui日期时间框
			var startdatetimebox;
			var enddatetimebox;

			// 添加输入框
			td.append(new core.html.element.viewer.Input("start" + config.id).load(function(_this) {

				// 调用easyui日期时间框模板
				startdatetimebox = new core.html.easyui.form.DateTimeBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					startdatetimebox[attr] && startdatetimebox[attr](easyui[attr]);
				}
				// 初始化
				startdatetimebox.init();
			}));
			td.append("&nbsp;至&nbsp;");
			td.append(new core.html.element.viewer.Input("end" + config.id).load(function(_this) {

				// 调用easyui日期时间框模板
				enddatetimebox = new core.html.easyui.form.DateTimeBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					enddatetimebox[attr] && enddatetimebox[attr](easyui[attr]);
				}
				// 初始化
				enddatetimebox.init();
			}));

			// 添加字段
			search.addField({
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.DATETIME,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.BETWEEN,
				min : function() {
					return startdatetimebox.getValue();
				},
				max : function() {
					return enddatetimebox.getValue();
				},
				clear : function() {
					startdatetimebox.setValue("");
					enddatetimebox.setValue("");
				}
			});
			// 跳出
			break;
		case core.project.search.Type.EASYUI.NUMBERBOX:

			// 获取easyui配置
			var easyui = config.easyui ? config.easyui : {};
			// easyui数字框
			var startnumberbox;
			var endnumberbox;

			// 添加输入框
			td.append(new core.html.element.viewer.Input("start" + config.id).load(function(_this) {

				// 调用easyui数字框模板
				startnumberbox = new core.html.easyui.form.NumberBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					startnumberbox[attr] && startnumberbox[attr](easyui[attr]);
				}
				// 初始化
				startnumberbox.init();
			}));
			td.append("&nbsp;至&nbsp;");
			td.append(new core.html.element.viewer.Input("end" + config.id).load(function(_this) {

				// 调用easyui数字框模板
				endnumberbox = new core.html.easyui.form.NumberBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					endnumberbox[attr] && endnumberbox[attr](easyui[attr]);
				}
				// 初始化
				endnumberbox.init();
			}));

			// 添加字段
			search.addField({
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.DOUBLE,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.BETWEEN,
				min : function() {
					return startnumberbox.getValue();
				},
				max : function() {
					return endnumberbox.getValue();
				},
				clear : function() {
					startnumberbox.setValue("");
					endnumberbox.setValue("");
				}
			});
			// 跳出
			break;
		case core.project.search.Type.EASYUI.TEXTBOX:

			// 获取easyui配置
			var easyui = config.easyui ? config.easyui : {};
			// easyui文本框
			var textbox;

			// 创建输入框
			td.append(new core.html.element.viewer.Input(config.id).load(function(_this) {

				// 调用easyui文本框模板
				textbox = new core.html.easyui.form.TextBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					textbox[attr] && textbox[attr](easyui[attr]);
				}
				// 初始化
				textbox.init();
			}));

			// 添加字段
			search.addField({
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.STRING,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.LIKE,
				min : function() {
					return textbox.getValue();
				},
				max : function() {
					return null;
				},
				clear : function() {
					textbox.setValue("");
				}
			});
			// 跳出
			break;
		}
	}

	/**
	 * 构造函数
	 * 
	 * @param id
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
		 * 搜索事件
		 */
		var searchEvent = function() {

		};

		/**
		 * 获取Div对象
		 */
		this.div = function() {

			return div;
		};

		/**
		 * 添加搜索字段
		 */
		this.addField = function(field) {

			fields.push(field);
		};

		/**
		 * 返回搜索字段
		 */
		this.getFields = function() {

			return fields;
		};

		/**
		 * 获取/设置搜索事件
		 * 
		 * @param searchEvent
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
	 * @param config
	 */
	Constructor.prototype.init = function(config) {

		// 备份this
		var search = this;

		// 获取div,并清空
		var div = this.div().clear();

		// 创建表格对象
		var table = new core.html.element.viewer.Table().style("font-size:12px;").appendTo(div);
		// 遍历配置
		for (var i = 0, length = config.length; i < length; i++) {

			// 创建表格行
			var tr = new core.html.element.viewer.Tr().appendTo(table);

			// 获取行配置
			var trConfig = config[i];
			// 遍历行配置
			for (var j = 0, jLength = trConfig.length; j < jLength; j++) {

				// 获取单元格配置
				var tdConfig = trConfig[j];
				// 添加标签单元格
				new core.html.element.viewer.Td().append(
						new core.html.element.viewer.Label().append(tdConfig.label + ":")).appendTo(tr);
				// 添加搜索框
				var td = new core.html.element.viewer.Td().style("word-break:keep-all; white-space:nowrap;");
				// 处理单元格数据
				dealTdData(this, tdConfig, td);
				// 添加到行
				td.appendTo(tr);
			}

			// 第一行添加按钮
			if (i === 0) {

				// 单元格
				var td = new core.html.element.viewer.Td().style("word-break:keep-all; white-space:nowrap;").appendTo(
						tr);

				// 添加按钮
				td.append("&nbsp;");
				new core.html.element.viewer.A().load(function(_this) {

					var linkbutton = new core.html.easyui.button.LinkButton(_this.id());
					linkbutton.text("搜索");
					linkbutton.onClick(function() {
						search.searchEvent()();
					});
					linkbutton.init();
				}).appendTo(td);
				td.append("&nbsp;");
				new core.html.element.viewer.A().load(function(_this) {

					var linkbutton = new core.html.easyui.button.LinkButton(_this.id());
					linkbutton.text("重置");
					linkbutton.onClick(function() {

						var fields = search.getFields();
						for (var j = 0; j < fields.length; j++) {
							fields[j].clear();
						}
					});
					linkbutton.init();
				}).appendTo(td);
			}
		}

		return this;
	};

	/**
	 * 显示搜索框
	 */
	Constructor.prototype.show = function() {

		this.div().show();

		return this;
	};

	/**
	 * 隐藏搜索框
	 */
	Constructor.prototype.hide = function() {

		this.div().hide();

		return this;
	};

	/**
	 * 获取json
	 * 
	 * @returns {Array}
	 */
	Constructor.prototype.getJson = function() {

		// 返回的json数组
		var json = [];

		// 获取搜索字段
		var fields = this.getFields();
		// 遍历搜索字段
		for (var i = 0, length = fields.length; i < length; i++) {

			// 搜索字段
			var field = fields[i];
			// 最小值
			var min = field.min();
			// 最大值
			var max = field.max();

			// 最大值为空
			if (max === null) {

				// 最小值不为空
				if (min != "") {

					json.push({
						field : field.field,
						value : [ min ],
						fieldtype : field.dataType,
						model : field.queryMode
					})
				}
			} else {

				// 最小为空,最大不为空
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

		// 返回json数组
		return json;
	};

	/**
	 * 获取sql
	 * 
	 * @returns {String}
	 */
	Constructor.prototype.getSql = function() {

		// 返回的sql
		var sql = [];

		// 获取搜索字段
		var fields = this.getFields();
		// 遍历搜索字段
		for (var i = 0, length = fields.length; i < length; i++) {

			// 搜索字段
			var field = fields[i];
			// 最小值
			var min = field.min();
			// 最大值
			var max = field.max();

			// 最大值为空
			if (max === null) {

				// 最小值不为空
				if (min != "") {

					sql.push(" and ");
					sql.push(field.field);
					switch (field.queryMode) {
					case core.project.search.QueryMode.EQ:
						sql.push(" ='" + min + "' ");
						break;
					case core.project.search.QueryMode.LIKE:
						sql.push(" like '%" + min + "%' ");
						break;
					}
				}
			} else {

				// 最小为空,最大不为空
				if (min === "" && max !== "") {

					sql.push(" and ");
					sql.push(field.field);
					sql.push(" <='" + max + "' ");
				} else if (min !== "" && max === "") {

					sql.push(" and ");
					sql.push(field.field);
					sql.push(" >='" + min + "' ");
				} else if (min !== "" && max !== "") {

					sql.push(" and ");
					sql.push(field.field);
					sql.push(" between '" + min + "' and '" + max + "' ");
				}
			}
		}

		// 返回sql
		return sql.join("");
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
		COMBOBOX : "combobox",
		DATEBOX : "datebox",
		DATETIMEBOX : "datetimebox",
		NUMBERBOX : "numberbox",
		TEXTBOX : "textbox"
	}
}
