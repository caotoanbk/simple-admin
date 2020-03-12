(function ($) {
	$.fn.tags = function(options) {

		var defaults = $.extend({},options);

		var obj = $(this);
		var ele_ul = obj.parent().find('.list_tags');		//thẻ ul liệt kê các tags theo từ khóa hiện tại
		var ele_a = obj.parent().find('.add_tag_mod');		//thẻ a thêm mới 1 tags
		var ele_hidden = obj.parent().find('.hidden_recordId');	//thẻ input hidden chứa id sản phẩm
		var ele_div = obj.parent().find('.existed_tags');   //thẻ div chứa các tags đã thêm cho sản phẩm

		var opts = $.extend(defaults,options);

		return this.each(function() {

			/*
			* THIẾT LẬP CHIỀU RỘNG CHIỀU CAO CHO BOX CHỨA CÁC TAG
			*/
			obj_pos = obj.position();
			obj_height = obj.outerHeight();
			listtags_pos = obj_pos.top + obj_height;
			ele_ul.css('top', listtags_pos + 'px').outerWidth(obj.outerWidth());

			/*
			* HIỂN THỊ DANH SÁC TAG THEO TỪ KHÓA NHẬP VÀO
			* @obj_txt - bản ghi thêm vào
			*/
			obj.keyup(function() {
				var obj_txt = $(this).val();
				if (obj_txt.length > opts.num_character) {
					$.ajax({
					  	method: "GET",
					  	url: opts.url_loadTags,
					  	data: { value_tag: obj_txt },
					  	async: false,
					  	success: function(data) {
					  		if (data) {
					  			ele_ul.show().html(data);
					  			ele_a.css('display', 'none');
					  		}
					  		else
					  		{
					  			ele_ul.empty().hide();
					  			ele_a.css('display', 'inline-block');
					  		}
						},
					});
				}
				else
				{
					ele_a.css('display', 'none');
					ele_ul.empty().hide();
				}
			});

			/*
			* THÊM TAG MỚI CHO SẢN PHẨM
			* @cur_tag_id - id tag thêm vào
			* @record_id - id của sản phẩm hoặc tin tức thêm vào
			*/
			ele_ul.on('click', 'li a', function() {
				var cur_tag_id = $(this).attr('href');
				var record_id = ele_hidden.val();
				$.ajax({
					method: "GET",
					url: opts.url_addTags,
					data: {tag_id: cur_tag_id, record_id: record_id},
					async: false,
					success: function(data) {
						if (data)
						{
							ele_div.prepend(data);
							ele_ul.empty().hide();
							obj.val("");
						}
					},
				});
				return false;
			});

			/*
			* XÓA 1 TAG ĐÃ CÓ CỦA SẢN PHẨM
			* @delete_tag_id - id bản ghi trong bảng tags_product bị xóa
			*/
			ele_div.on('click', 'span a', function() {
				delete_tag_id = $(this).attr('href');
				$.ajax({
					method: "GET",
					context: this,
					url: opts.url_removeTags,
					data: {tag_id: delete_tag_id},
					async: false,
					success: function(data) {
						if (data) 
							$(this).parent().remove();
					},
				});

				return false;
			});

			/*
			* THÊM TỪ KHÓA MỚI NẾU TỪ KHÓA CHƯA TỒN TẠI
			* @obj_txt - tag được thêm mới
			* @record_id - id sản phẩm hoặc tin tức được thêm tag
			*/
			ele_a.click(function() {
				var obj_txt = obj.val();
				var record_id = ele_hidden.val();
				$.ajax({
					method: "GET",
					url: opts.url_newTags,
					data: {new_tag: obj_txt, record_id: record_id},
					async: false,
					success: function(data) {
						if (data)
						{
							ele_div.prepend(data);
							ele_ul.empty().hide();
							obj.val("");
							ele_a.css('display', 'none');
						}
					}
				});
				return false;
			});



		});

	};
})(jQuery);