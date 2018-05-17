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