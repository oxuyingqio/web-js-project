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