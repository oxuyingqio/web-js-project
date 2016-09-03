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
	 * @param tdData
	 */
	function dealTdData(tdData) {

		switch (tdData.type) {
		case core.project.form.Type.A:

			return new core.html.element.viewer.A(tdData.id).append(tdData.value);
		case core.project.form.Type.EASYUI.COMBO:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui下拉框模板
				var combo = new core.html.easyui.form.Combo(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					combo[attr] && combo[attr](easyui[attr]);
				}
				// 初始化
				combo.init();
			});

			return input;
		case core.project.form.Type.EASYUI.COMBOBOX:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui下拉列表框模板
				var combobox = new core.html.easyui.form.ComboBox(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					combobox[attr] && combobox[attr](easyui[attr]);
				}
				// 初始化
				combobox.init();
			});

			return input;
		case core.project.form.Type.EASYUI.DATEBOX:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui日期框模板
				var datebox = new core.html.easyui.form.DateBox(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					datebox[attr] && datebox[attr](easyui[attr]);
				}
				// 初始化
				datebox.init();
			});

			return input;
		case core.project.form.Type.EASYUI.DATETIMEBOX:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui日期时间框模板
				var datetimebox = new core.html.easyui.form.DateTimeBox(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					datetimebox[attr] && datetimebox[attr](easyui[attr]);
				}
				// 初始化
				datetimebox.init();
			});

			return input;
		case core.project.form.Type.EASYUI.DATETIMESPINNER:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui日期时间微调框模板
				var datetimespinner = new core.html.easyui.form.DateTimeSpinner(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					datetimespinner[attr] && datetimespinner[attr](easyui[attr]);
				}
				// 初始化
				datetimespinner.init();
			});

			return input;
		case core.project.form.Type.EASYUI.FILEBOX:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui文件框模板
				var filebox = new core.html.easyui.form.FileBox(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					filebox[attr] && filebox[attr](easyui[attr]);
				}
				// 初始化
				filebox.init();
			});

			return input;
		case core.project.form.Type.EASYUI.NUMBERBOX:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui数字框模板
				var numberbox = new core.html.easyui.form.NumberBox(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					numberbox[attr] && numberbox[attr](easyui[attr]);
				}
				// 初始化
				numberbox.init();
			});

			return input;
		case core.project.form.Type.EASYUI.NUMBERSPINNER:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui数字微调框模板
				var numberspinner = new core.html.easyui.form.NumberSpinner(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					numberspinner[attr] && numberspinner[attr](easyui[attr]);
				}
				// 初始化
				numberspinner.init();
			});

			return input;
		case core.project.form.Type.EASYUI.PASSWORDBOX:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui密码框模板
				var passwordbox = new core.html.easyui.form.PasswordBox(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					passwordbox[attr] && passwordbox[attr](easyui[attr]);
				}
				// 初始化
				passwordbox.init();
			});

			return input;
		case core.project.form.Type.EASYUI.SLIDER:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui拖动条模板
				var slider = new core.html.easyui.form.Slider(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					slider[attr] && slider[attr](easyui[attr]);
				}
				// 初始化
				slider.init();
			});

			return input;
		case core.project.form.Type.EASYUI.SPINNER:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui微调框模板
				var spinner = new core.html.easyui.form.Spinner(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					spinner[attr] && spinner[attr](easyui[attr]);
				}
				// 初始化
				spinner.init();
			});

			return input;
		case core.project.form.Type.EASYUI.TEXTBOX:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui文本框模板
				var textbox = new core.html.easyui.form.TextBox(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					textbox[attr] && textbox[attr](easyui[attr]);
				}
				// 初始化
				textbox.init();
			});

			return input;
		case core.project.form.Type.EASYUI.TIMESPINNER:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui时间微调框模板
				var timespinner = new core.html.easyui.form.TimeSpinner(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					timespinner[attr] && timespinner[attr](easyui[attr]);
				}
				// 初始化
				timespinner.init();
			});

			return input;
		case core.project.form.Type.EASYUI.VALIDATEBOX:

			// 创建输入框
			var input = new core.html.element.viewer.Input(tdData.id);
			// 设置加载事件
			input.load(function() {

				// 获取easyui配置
				var easyui = tdData.easyui ? tdData.easyui : {};

				// 调用easyui验证框模板
				var validatebox = new core.html.easyui.form.ValidateBox(input.id());
				// 遍历配置
				for (attr in easyui) {
					// 设置对应参数
					validatebox[attr] && validatebox[attr](easyui[attr]);
				}
				// 初始化
				validatebox.init();
			});

			return input;
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
		var content = [ {
			data : []
		} ];
		/**
		 * 是否分组
		 */
		var showGroup = false;

		/**
		 * 获取/设置表单对象
		 * 
		 * @param form
		 */
		this.form = function() {

			switch (arguments.length) {
			case 0:
				return form;
			default:
				form = arguments[0];
				return this;
			}
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
				content[0].data = arguments[0];
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
		 * @param showGroup
		 */
		this.showGroup = function() {

			switch (arguments.length) {
			case 0:
				return showGroup;
			default:
				showGroup = arguments[0];
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
		var showGroup = this.showGroup();
		
		// 清空表单内容
		form.clear();
		
		// 遍历表单内容
		for (var i = 0, length = content.length; i < length; i++) {

			// 获取本组内容
			var groupContent = content[i];

			// 创建表格对象
			var table = new core.html.element.viewer.Table(groupContent.id).style("width:100%");
			// 处理是否分组
			if (showGroup) {

				// 创建分组对象,并添加分组描述信息,并添加表格对象,并添加至表单对象
				new core.html.element.viewer.Fieldset().append(
						new core.html.element.viewer.Legend().append(groupContent.text)).append(table).appendTo(form);
			} else {

				// 将表格对象添加至表单对象中
				table.appendTo(form);
			}

			// 获取本组数据
			var groupData = groupContent.data;
			// 遍历本组数据
			for (var i = 0, length = groupData.length; i < length; i++) {

				// 创建行对象,并添加至表格对象中
				var tr = new core.html.element.viewer.Tr().appendTo(table);

				// 每行的数据
				var trData = groupData[i];
				// 遍历每行的数据
				for (var j = 0, jLength = trData.length; j < jLength; j++) {

					// 每单元格的数据
					var tdData = trData[j];

					// 创建标签单元格对象,并设置样式,并添加标签对象,并添加至行对象中
					var labelTd = new core.html.element.viewer.Td().style("text-align:right;").append(
							new core.html.element.viewer.Label().append(tdData.label + ":")).appendTo(tr);
					// 创建数据单元格对象
					var dataTd = new core.html.element.viewer.Td().colspan(tdData.colspan ? tdData.colspan : 1).append(
							dealTdData(tdData)).appendTo(tr);
				}
			}
		}

		// 显示表单
		form.show();
	};

	// 返回构造函数
	return Constructor;
})();