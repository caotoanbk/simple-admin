(function ($) {
	$.fn.addimg = function(options) {

		var defaults = $.extend({
			},options);

		var obj = $(this);
		var opts = $.extend(defaults,options);

		return this.each(function() {

			//Chọn ảnh mặc định
			obj.on('change', 'li label input', function() {
				var attachment_id = $(this).parents('li').find('img').attr('alt');
				$.ajax({
					method: "GET",
				  	url: opts.url_changeDefault,
				  	data: {attachment_id: attachment_id},
				  	success: function(result) {
				  		if(result == "0")
							alert("Thiết lập ảnh mặc định không thành công!");
				  	}
				});
			});

			//Xóa ảnh
			obj.on('click', 'li > a', function() {
				var parent_li = $(this).parent();
				var attachment_id = parent_li.find('img').attr('alt');
				$.ajax({
					method: "GET",
				  	url: opts.url_delete,
				  	data: {attachment_id: attachment_id},
				  	success: function(result) {
				  		if(result == "0")
							alert("Xóa ảnh không thành công!");
						else
							parent_li.remove();
				  	}
				});
				return false;
			});


		});

	};
})(jQuery);