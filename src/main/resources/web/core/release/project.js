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
 * @name Font
 * @package core.project.constant
 * @desc 语言
 * @type 枚举
 * 
 * @date 2016年11月2日 09:53:40
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
	Constructor.prototype.content = function(html) {

		this.div().clear().append(html);

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
 * @name DataGrid
 * @package core.project.datagrid
 * @desc 数据列表
 * @type 类型
 * 
 * @constructor core.project.datagrid.DataGrid(String id)
 * 
 * @extend core.html.easyui.datagrid.DataGrid
 * 
 * @date 2016年9月1日 16:02:05
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
	Constructor.prototype.project = function() {

		// 添加指定参数
		this.queryParams($.extend({
			rightsFilter : this.rightsFilter(),
			params : JSON.stringify(this.jsonParam()),
			whereSql : this.sqlParam(),
			orderBy : "[]",
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
	 * @param orderParam
	 * @param otherParam
	 * @returns
	 */
	Constructor.prototype.load = function(jsonParam, sqlParam, orderParam, otherParam) {

		var param = {
			rightsFilter : this.rightsFilter(),
			params : object2JsonStr(jsonParam),
			whereSql : sqlParam,
			orderBy : object2JsonStr(orderParam),
			TimeStamp : new Date().getTime()
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
			orderBy : object2JsonStr(orderParam),
			TimeStamp : new Date().getTime()
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
 * @date	2017年6月14日 15:16:35
 */

core.project.form.Form = (function() {

	/**
	 * 处理A
	 * 
	 * @param tr
	 * @param config
	 */
	function dealA(tr, config) {

		// 行添加单元格,单元格添加A
		tr.append(new core.html.element.viewer.Td().style(config.tdStyle ? config.tdStyle : "white-space:nowrap;")
				.colspan(config.colspan).rowspan(config.rowspan).append(config.before).append(
						new core.html.element.viewer.A(config.id).append(config.value)).append(config.after));
	}

	/**
	 * 处理Label
	 * 
	 * @param tr
	 * @param config
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
	 */
	function dealInput(tr, config) {

		// 隐藏域特殊处理
		if (config.type === core.project.form.Type.INPUT.HIDDEN) {

			// 添加隐藏域
			tr.append(new core.html.element.viewer.Input(config.id).type("hidden").name(
					config.name ? config.name : config.id).value(config.value));
		} else {

			// 行添加单元格,单元格添加Label
			tr.append(new core.html.element.viewer.Td().style("white-space:nowrap;text-align:right;").rowspan(
					config.rowspan).append(new core.html.element.viewer.Label().append(config.label + ":")));

			// 创建输入框单元格
			var td = new core.html.element.viewer.Td().style("white-space:nowrap;").colspan(config.colspan).rowspan(
					config.rowspan);
			// 前元素
			td.append(config.before);

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
	 */
	function dealEasyUI(tr, config) {

		// 行添加单元格,单元格添加Label
		tr.append(new core.html.element.viewer.Td().style("white-space:nowrap;text-align:right;").rowspan(
				config.rowspan).append(new core.html.element.viewer.Label().append(config.label + ":")));

		// 创建输入框单元格
		var td = new core.html.element.viewer.Td().style("white-space:nowrap;").colspan(config.colspan).rowspan(
				config.rowspan);
		// 前元素
		td.append(config.before);

		// 创建输入框对象
		var input = new core.html.element.viewer.Input(config.id).name(config.name ? config.name : config.id);
		// 获取easyui配置
		var easyui = config.easyui ? config.easyui : {};

		// 判断EasyUI输入框类型
		switch (config.type) {
		case core.project.form.Type.EASYUI.SWITCHBUTTON:

			// 添加输入框
			td.append(input.load(function(_this) {

				// 调用easyui选择按钮模板
				var switchbutton = new core.html.easyui.button.SwitchButton(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					switchbutton[attr] && switchbutton[attr](easyui[attr]);
				}
				// 初始化
				switchbutton.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.COMBO:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.COMBOBOX:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.DATEBOX:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.DATETIMEBOX:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.DATETIMESPINNER:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.FILEBOX:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.NUMBERBOX:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.NUMBERSPINNER:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.PASSWORDBOX:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.SLIDER:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.SPINNER:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.TAGBOX:

			// 添加输入框
			td.append(input.load(function(_this) {

				// 调用easyui标签模板
				var tagbox = new core.html.easyui.form.TagBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					tagbox[attr] && tagbox[attr](easyui[attr]);
				}
				// 初始化
				tagbox.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.TEXTBOX:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.TEXTAREA:

			// 添加输入框
			td.append(input.load(function(_this) {

				// 调用easyui文本区模板
				var textarea = new core.html.easyui.form.Textarea(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					textarea[attr] && textarea[attr](easyui[attr]);
				}
				// 初始化
				textarea.init();

				// 回收引用
				easyui = null;
			}));

			break;
		case core.project.form.Type.EASYUI.TIMESPINNER:

			// 添加输入框
			td.append(input.load(function(_this) {

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
			}));

			break;
		case core.project.form.Type.EASYUI.VALIDATEBOX:

			// 添加输入框
			td.append(input.load(function(_this) {

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
	 * 
	 * @param id{String}
	 *            ID
	 */
	var Constructor = function(id) {

		// 调用父类构造
		core.project.form.Form.superClass.constructor.call(this, id);
		// 标题
		this.title(null);
		// 宽
		this.width("100%");
		// 左偏移
		this.left("0px");
		// 上偏移
		this.top("0px");
		// 边框
		this.border(false);
		// 关闭按钮
		this.closable(false);
		// 可拖动
		this.draggable(false);
		// 阴影
		this.shadow(false);

		/**
		 * 表单ID
		 */
		var formId;
		/**
		 * 表单内容
		 */
		var data = [];
		/**
		 * 是否分组
		 */
		var isGroup = false;

		/**
		 * 获取/设置表单ID
		 * 
		 * @param formId
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
		 * 获取/设置表单内容
		 * 
		 * @param data
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
		 * 获取/设置分组表单内容
		 * 
		 * @param groupData
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
	// 继承EaysUI 弹出框模板
	core.lang.Class.extend(Constructor, core.html.easyui.window.Dialog);

	/**
	 * 表单初始化
	 */
	Constructor.prototype.project = function() {

		// 创建表单对象
		var form = new core.html.element.viewer.Form(this.formId()).style("padding-top:15px;").method("post").enctype(
				"multipart/form-data");
		// 添加表单HTML
		this.content(form.convertHtml());
		// 初始化dialog
		this.init();

		// 获取是否分组
		var isGroup = this.isGroup();
		// 获取表单内容
		var data = this.groupData();
		// 遍历表单内容
		for (var i = 0, length = data.length; i < length; i++) {

			// 获取本组内容
			var groupData = data[i];

			// 创建组内表格对象
			var table = new core.html.element.viewer.Table(groupData.id).style("border-spacing:5px;font-size:12px;")
					.align("center");
			// 依据是否分组,处理表格对象
			if (isGroup) {

				// 创建分组对象,并添加分组描述信息,并添加表格对象,并添加至表单对象
				new core.html.element.viewer.Fieldset().append(
						new core.html.element.viewer.Legend().append(groupData.text)).append(table).appendTo(form);
			} else {

				// 将表格对象添加至表单对象中
				table.appendTo(form);
			}

			// 获取表格数据
			var tableData = groupData.data;
			// 遍历表格数据
			for (var m = 0, mLength = tableData.length; m < mLength; m++) {

				// 创建行对象,并添加至表格对象中
				var tr = new core.html.element.viewer.Tr().appendTo(table);

				// 获取行数据
				var trData = tableData[m];
				// 遍历行数据
				for (var n = 0, nLength = trData.length; n < nLength; n++) {

					// 单元格数据
					var tdData = trData[n];

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
						dealInput(tr, tdData);
						break;
					case core.project.form.Type.EASYUI.SWITCHBUTTON:
					case core.project.form.Type.EASYUI.COMBO:
					case core.project.form.Type.EASYUI.COMBOBOX:
					case core.project.form.Type.EASYUI.DATEBOX:
					case core.project.form.Type.EASYUI.DATETIMEBOX:
					case core.project.form.Type.EASYUI.DATETIMESPINNER:
					case core.project.form.Type.EASYUI.FILEBOX:
					case core.project.form.Type.EASYUI.NUMBERBOX:
					case core.project.form.Type.EASYUI.NUMBERSPINNER:
					case core.project.form.Type.EASYUI.PASSWORDBOX:
					case core.project.form.Type.EASYUI.SLIDER:
					case core.project.form.Type.EASYUI.SPINNER:
					case core.project.form.Type.EASYUI.TEXTBOX:
					case core.project.form.Type.EASYUI.TEXTAREA:
					case core.project.form.Type.EASYUI.TIMESPINNER:
					case core.project.form.Type.EASYUI.VALIDATEBOX:
						dealEasyUI(tr, tdData);
						break;
					}
				}
			}
		}

		return this;
	};

	/**
	 * 表单提交
	 * 
	 * @param options
	 * @returns
	 */
	Constructor.prototype.submit = function(options) {

		return $("#" + this.formId()).form("submit", options);
	};

	/**
	 * 加载数据
	 * 
	 * @param data
	 * @returns
	 */
	Constructor.prototype.load = function(data) {

		return $("#" + this.formId()).form("load", data);
	};

	/**
	 * 清空表单
	 * 
	 * @returns
	 */
	Constructor.prototype.clear = function() {

		return $("#" + this.formId()).form("clear");
	};

	/**
	 * 重置表单
	 * 
	 * @returns
	 */
	Constructor.prototype.reset = function() {

		return $("#" + this.formId()).form("reset");
	};

	/**
	 * 验证表单
	 * 
	 * @returns
	 */
	Constructor.prototype.validate = function() {

		return $("#" + this.formId()).form("validate");
	};

	/**
	 * 启用表单验证
	 * 
	 * @returns
	 */
	Constructor.prototype.enableValidation = function() {

		return $("#" + this.formId()).form("enableValidation");
	};

	/**
	 * 禁用表单验证
	 * 
	 * @returns
	 */
	Constructor.prototype.disableValidation = function() {

		return $("#" + this.formId()).form("disableValidation");
	};

	/**
	 * 重置表单验证
	 * 
	 * @returns
	 */
	Constructor.prototype.resetValidation = function() {

		return $("#" + this.formId()).form("resetValidation");
	};

	/**
	 * 
	 * @returns
	 */
	Constructor.prototype.resetDirty = function() {

		return $("#" + this.formId()).form("resetDirty");
	};

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
		RADIO : "radio"
	},
	EASYUI : {
		SWITCHBUTTON : "switchbutton",
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
		TAGBOX : "tagbox",
		TEXTBOX : "textbox",
		TEXTAREA : "textarea",
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
	BOOLEAN : "boolean",
	STRING : "string",
	DATE : "date",
	DATETIME : "datetime"
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
 * 数据库类型
 */
core.project.search.CurrentDBType = core.project.search.DBType.ORACLE;
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
 * @name	Search
 * @package core.project.search
 * @desc	搜索
 * @type	类
 * 
 * @date	2017年8月10日 14:52:16
 */

core.project.search.Search = (function() {

	/**
	 * 处理EasyUI
	 * 
	 * @param search
	 * @param tr
	 * @param config
	 */
	function dealEasyUI(search, tr, config) {

		// 添加标签单元格
		tr.append(new core.html.element.viewer.Td().append(new core.html.element.viewer.Label().append(config.label
				+ ":")));

		// 添加搜索框单元格
		var td = new core.html.element.viewer.Td().style("word-break:keep-all; white-space:nowrap;").colspan(
				config.colspan === undefined ? 1 : config.colspan).rowspan(
				config.rowspan === undefined ? 1 : config.rowspan);

		// 获取easyui配置
		var easyui = config.easyui ? config.easyui : {};

		// 判断类型
		switch (config.type) {
		case core.project.search.Type.EASYUI.COMBOBOX:

			// easyui下拉列表框
			var combobox;

			// 添加输入框,配置EasyUI
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

			break;
		case core.project.search.Type.EASYUI.DATEBOX:

			// easyui日期框
			var startdatebox;
			var enddatebox;

			// 添加输入框,配置EasyUI
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
			})).append("&nbsp;-&nbsp;").append(
					new core.html.element.viewer.Input("end" + config.id).load(function(_this) {

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

			break;
		case core.project.search.Type.EASYUI.DATETIMEBOX:

			// easyui日期时间框
			var startdatetimebox;
			var enddatetimebox;

			// 添加输入框,配置EasyUI
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
			})).append("&nbsp;-&nbsp;").append(
					new core.html.element.viewer.Input("end" + config.id).load(function(_this) {

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

			break;
		case core.project.search.Type.EASYUI.NUMBERBOX:

			// easyui数字框
			var startnumberbox;
			var endnumberbox;

			// 添加输入框,配置EasyUI
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
			})).append("&nbsp;-&nbsp;").append(
					new core.html.element.viewer.Input("end" + config.id).load(function(_this) {

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

			break;
		case core.project.search.Type.EASYUI.TAGBOX:

			// easyui标签框
			var tagbox;

			// 添加输入框,配置EasyUI
			td.append(new core.html.element.viewer.Input(config.id).load(function(_this) {

				// 调用easyui标签框模板
				tagbox = new core.html.easyui.form.TagBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					tagbox[attr] && tagbox[attr](easyui[attr]);
				}
				// 初始化
				tagbox.init();
			}));

			// 添加字段
			search.addField({
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.STRING,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.EQ,
				min : function() {
					return tagbox.getValue();
				},
				max : function() {
					return null;
				},
				clear : function() {
					tagbox.setValue("");
				}
			});

			break;
		case core.project.search.Type.EASYUI.TEXTBOX:

			// easyui文本框
			var textbox;

			// 创建输入框,配置EasyUI
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

			break;
		}

		// 添加单元格
		tr.append(td);
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
		 * 搜索按钮事件
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
	 * @param configs
	 */
	Constructor.prototype.project = function(configs) {

		// 备份this对象
		var search = this;

		// 创建表格对象,添加至div中,并清空div
		var table = new core.html.element.viewer.Table().style("font-size:12px;").appendTo(this.div().clear());
		// 遍历配置项
		for (var i = 0, length = configs.length; i < length; i++) {

			// 创建表格行
			var tr = new core.html.element.viewer.Tr().appendTo(table);

			// 获取行配置集合
			var trConfigs = configs[i];
			// 遍历行配置
			for (var j = 0, jLength = trConfigs.length; j < jLength; j++) {

				// 获取单元格配置
				var tdConfig = trConfigs[j];
				// 依据类型处理配置
				switch (tdConfig.type) {
				case core.project.search.Type.EASYUI.COMBOBOX:
				case core.project.search.Type.EASYUI.DATEBOX:
				case core.project.search.Type.EASYUI.DATETIMEBOX:
				case core.project.search.Type.EASYUI.NUMBERBOX:
				case core.project.search.Type.EASYUI.TEXTBOX:
				case core.project.search.Type.EASYUI.SWITCHBUTTON:
					dealEasyUI(this, tr, tdConfig);
					break;
				}
			}

			// 第一行添加按钮
			if (i === 0) {

				// 添加按钮
				tr.append(new core.html.element.viewer.Td().style("word-break:keep-all;white-space:nowrap;").append(
						"&nbsp;").append(
						new core.html.element.viewer.A().load(function(_this) {

							new core.html.easyui.button.LinkButton(_this.id()).width("80px").text(
									"搜&nbsp;&nbsp;&nbsp;索").onClick(function() {
								search.searchEvent()();
							}).init();

						})).append("&nbsp;").append(
						new core.html.element.viewer.A().load(function(_this) {

							new core.html.easyui.button.LinkButton(_this.id()).width("80px").text(
									"重&nbsp;&nbsp;&nbsp;置").onClick(function() {
								var fields = search.getFields();
								for (var j = 0; j < fields.length; j++) {
									fields[j].clear();
								}
							}).init();

						})));
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

			// 最大值为空,即单框条件
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
		TAGBOX : "tagbox",
		TEXTBOX : "textbox"
	}
}
