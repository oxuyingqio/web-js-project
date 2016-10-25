/**
 * @name Form
 * @package core.project.form
 * @desc 表单
 * @type 类
 * 
 * @date 2016年9月18日 10:39:32
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
		tr.append(new core.html.element.viewer.Td().style(config.tdStyle ? config.tdStyle : "").colspan(
				config.colspan ? config.colspan : 1).rowspan(config.rowspan ? config.rowspan : 1).append(
				config.before ? config.before : "").append(
				new core.html.element.viewer.A(config.id).append(config.value))
				.append(config.after ? config.after : ""));
	}

	/**
	 * 处理Label
	 * 
	 * @param tr
	 * @param config
	 */
	function dealLabel(tr, config) {

		// 行添加单元格,单元格添加Label
		tr.append(new core.html.element.viewer.Td().style(config.tdStyle ? config.tdStyle : "").colspan(
				config.colspan ? config.colspan : 1).rowspan(config.rowspan ? config.rowspan : 1).append(
				new core.html.element.viewer.Label(config.id).append(config.text)));
	}

	/**
	 * 处理Div
	 * 
	 * @param tr
	 * @param config
	 */
	function dealDiv(tr, config) {

		// 行添加单元格,单元格添加Div
		tr.append(new core.html.element.viewer.Td().style(config.tdStyle ? config.tdStyle : "").colspan(
				config.colspan ? config.colspan : 1).rowspan(config.rowspan ? config.rowspan : 1).append(
				new core.html.element.viewer.Div(config.id)));
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
					config.name ? config.name : config.id).value(config.value ? "" : config.value));
		} else {

			// 行添加单元格,单元格添加Label
			tr.append(new core.html.element.viewer.Td().style("text-align:right;").rowspan(
					config.rowspan ? config.rowspan : 1).append(
					new core.html.element.viewer.Label().append(config.label + ":")));

			// 创建输入框单元格
			var td = new core.html.element.viewer.Td().colspan(config.colspan ? config.colspan : 1).rowspan(
					config.rowspan ? config.rowspan : 1);
			// 前元素
			td.append(config.before ? config.before : "");

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
			td.append(config.after ? config.after : "");

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
		tr.append(new core.html.element.viewer.Td().style("text-align:right;").rowspan(
				config.rowspan ? config.rowspan : 1).append(
				new core.html.element.viewer.Label().append(config.label + ":")));

		// 创建输入框单元格
		var td = new core.html.element.viewer.Td().colspan(config.colspan ? config.colspan : 1).rowspan(
				config.rowspan ? config.rowspan : 1);
		// 前元素
		td.append(config.before ? config.before : "");

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
		td.append(config.after ? config.after : "");

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
		var form = new core.html.element.viewer.Form(this.formId()).style("padding-top:15px;");
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