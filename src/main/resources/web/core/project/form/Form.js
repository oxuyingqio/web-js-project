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