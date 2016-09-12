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

		switch (config.type) {
		case core.project.search.Type.EASYUI.COMBOBOX:

			// 字段
			var field = {
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.STRING,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.EQ,
				min : function() {
					return null;
				},
				max : function() {
					return null;
				}
			};

			// 获取easyui配置
			var easyui = config.easyui ? config.easyui : {};

			// 添加输入框
			td.append(new core.html.element.viewer.Input(config.id).load(function(_this) {

				// 调用easyui下拉列表框模板
				var combobox = new core.html.easyui.form.ComboBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					combobox[attr] && combobox[attr](easyui[attr]);
				}
				// 初始化
				combobox.init();

				// 最小值
				field.min = function() {
					return combobox.getValue();
				};
			}));

			// 添加字段
			search.addField(field);
			// 跳出
			break;
		case core.project.search.Type.EASYUI.DATEBOX:

			// 字段
			var field = {
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.DATE,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.BETWEEN,
				min : function() {
					return null;
				},
				max : function() {
					return null;
				}
			};

			// 获取easyui配置
			var easyui = config.easyui ? config.easyui : {};

			// 添加输入框
			td.append(new core.html.element.viewer.Input("start" + config.id).load(function(_this) {

				// 调用easyui日期框模板
				var datebox = new core.html.easyui.form.DateBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					datebox[attr] && datebox[attr](easyui[attr]);
				}
				// 初始化
				datebox.init();

				// 最小值
				field.min = function() {
					return datebox.getValue();
				};
			}));
			td.append("&nbsp;至&nbsp;");
			td.append(new core.html.element.viewer.Input("end" + config.id).load(function(_this) {

				// 调用easyui日期框模板
				var datebox = new core.html.easyui.form.DateBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					datebox[attr] && datebox[attr](easyui[attr]);
				}
				// 初始化
				datebox.init();

				// 最大值
				field.max = function() {
					return datebox.getValue();
				};
			}));

			// 添加字段
			search.addField(field);
			// 跳出
			break;
		case core.project.search.Type.EASYUI.DATETIMEBOX:

			// 字段
			var field = {
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.DATETIME,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.BETWEEN,
				min : function() {
					return null;
				},
				max : function() {
					return null;
				}
			};

			// 获取easyui配置
			var easyui = config.easyui ? config.easyui : {};

			// 添加输入框
			td.append(new core.html.element.viewer.Input("start" + config.id).load(function(_this) {

				// 调用easyui日期时间框模板
				var datetimebox = new core.html.easyui.form.DateTimeBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					datetimebox[attr] && datetimebox[attr](easyui[attr]);
				}
				// 初始化
				datetimebox.init();

				// 最小值
				field.min = function() {
					return datetimebox.getValue();
				};
			}));
			td.append("&nbsp;至&nbsp;");
			td.append(new core.html.element.viewer.Input("end" + config.id).load(function(_this) {

				// 调用easyui日期时间框模板
				var datetimebox = new core.html.easyui.form.DateTimeBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					datetimebox[attr] && datetimebox[attr](easyui[attr]);
				}
				// 初始化
				datetimebox.init();

				// 最大值
				field.max = function() {
					return datetimebox.getValue();
				};
			}));

			// 添加字段
			search.addField(field);
			// 跳出
			break;
		case core.project.search.Type.EASYUI.NUMBERBOX:

			// 字段
			var field = {
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.DOUBLE,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.BETWEEN,
				min : function() {
					return null;
				},
				max : function() {
					return null;
				}
			};

			// 获取easyui配置
			var easyui = config.easyui ? config.easyui : {};

			// 添加输入框
			td.append(new core.html.element.viewer.Input("start" + config.id).load(function(_this) {

				// 调用easyui数字框模板
				var numberbox = new core.html.easyui.form.NumberBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					numberbox[attr] && numberbox[attr](easyui[attr]);
				}
				// 初始化
				numberbox.init();

				// 最小值
				field.min = function() {
					return numberbox.getValue();
				};
			}));
			td.append("&nbsp;至&nbsp;");
			td.append(new core.html.element.viewer.Input("end" + config.id).load(function(_this) {

				// 调用easyui数字框模板
				var numberbox = new core.html.easyui.form.NumberBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					numberbox[attr] && numberbox[attr](easyui[attr]);
				}
				// 初始化
				numberbox.init();

				// 最大值
				field.max = function() {
					return numberbox.getValue();
				};
			}));

			// 添加字段
			search.addField(field);
			// 跳出
			break;
		case core.project.search.Type.EASYUI.TEXTBOX:

			// 字段
			var field = {
				field : config.field,
				dataType : config.dataType ? config.dataType : core.project.search.DataType.STRING,
				queryMode : config.queryMode ? config.queryMode : core.project.search.QueryMode.LIKE,
				min : function() {
					return null;
				},
				max : function() {
					return null;
				}
			};

			// 获取easyui配置
			var easyui = config.easyui ? config.easyui : {};

			// 创建输入框
			td.append(new core.html.element.viewer.Input(config.id).load(function(_this) {

				// 调用easyui文本框模板
				var textbox = new core.html.easyui.form.TextBox(_this.id());
				// 遍历参数
				for (attr in easyui) {
					// 设置对应参数
					textbox[attr] && textbox[attr](easyui[attr]);
				}
				// 初始化
				textbox.init();

				// 最小值
				field.min = function() {
					return textbox.getValue();
				};
			}));

			// 添加字段
			search.addField(field);
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

		// 获取div
		var div = this.div();
		// 清空div
		div.clear();

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
				new core.html.element.viewer.A().append("&nbsp;").load(function(_this) {

					var linkbutton = new core.html.easyui.button.LinkButton(_this.id());
					linkbutton.text("搜索");
					linkbutton.onClick(function() {
						search.searchEvent()();
					});
					linkbutton.init();
					alert(111111111111111111111111)
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