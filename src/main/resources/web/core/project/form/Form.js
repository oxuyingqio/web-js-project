core.project.form.Form = (function() {

	/**
	 * 构造函数
	 * 
	 * @param id{String}
	 *            ID
	 */
	var Constructor = function(id) {

		// 调用父类构造
		core.project.form.Form.superClass.constructor.call(this, id);
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
		 * 表单内容
		 */
		var content = [];
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
	// 继承EaysUI 面板模板
	core.lang.Class.extend(Constructor, core.html.easyui.window.Dialog);
	
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