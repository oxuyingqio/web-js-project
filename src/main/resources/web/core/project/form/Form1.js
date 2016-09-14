/**
 * @name Form
 * @package core.project.from
 * @desc 表单
 * @type 类
 * 
 * @date 2016年9月14日 11:28:53
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
		case core.project.form.Type.EASYUI.SWITCHBUTTON:

			// 获取easyui配置
			var easyui = data.easyui ? data.easyui : {};

			// 返回输入框
			return new core.html.element.viewer.Input(data.id).load(function(_this) {

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
			});
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
	 *            ID
	 */
	var Constructor = function(id) {

		// 调用父类构造
		core.project.form.Form.superClass.constructor.call(this, id);

		/**
		 * 表单内容
		 */
		var content = [];
		/**
		 * 是否分组
		 */
		var isGroup = false;

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
	}
	// 继承HTML表单元素
	core.lang.Class.extend(Constructor, core.html.element.viewer.Div);

	/**
	 * 表单初始化
	 */
	Constructor.prototype.init = function() {

		// 清空表单内容
		this.clear();

		// 获取表单内容
		var content = this.groupContent();
		// 获取是否分组
		var isGroup = this.isGroup();

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
						new core.html.element.viewer.Legend().append(groupContent.text)).append(table).appendTo(this);
			} else {

				// 将表格对象添加至表单对象中
				table.appendTo(this);
			}

			// 获取本组行数据
			var trData = groupContent.data;
			// 遍历本组行数据
			for (var i = 0, length = trData.length; i < length; i++) {

				// 创建行对象,并添加至表格对象中
				var tr = new core.html.element.viewer.Tr().appendTo(table);

				// 获取本行内容
				var trContent = trData[i];
				// 遍历本行内容
				for (var j = 0, jLength = trContent.length; j < jLength; j++) {

					// 每个单元格内容
					var tdContent = trContent[j];

					// 创建标签单元格对象,并设置样式,并添加标签对象,并添加至行对象中
					new core.html.element.viewer.Td().style("text-align:right;").rowspan(
							tdContent.rowspan ? tdContent.rowspan : 1).append(
							new core.html.element.viewer.Label().append(tdContent.label + ":")).appendTo(tr);
					// 创建数据单元格对象
					var td = new core.html.element.viewer.Td();
					// 处理列站位,行站位
					td.colspan(tdContent.colspan ? tdContent.colspan : 1).rowspan(
							tdContent.rowspan ? tdContent.rowspan : 1);
					// 前
					tdContent.before && td.append(tdContent.before);
					// td
					td.append(dealTdData(tdContent));
					// 后
					tdContent.after && td.append(tdContent.after);
					// 添加至
					td.appendTo(tr);
				}
			}
		}

		return this;
	};

	return Constructor;
})();
