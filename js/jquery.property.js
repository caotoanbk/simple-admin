(function ($) {
	$.fn.property = function(options) {

		var defaults = $.extend({
			},options);

		var obj = $(this);
		var opts = $.extend(defaults,options);

		var prop = obj.find('.properties-vina > ul');
		var selected_prop = obj.find('.selected-properties-vina > div');

		return this.each(function() {

			//THÊM TẠM THUỘC TÍNH CHO SẢN PHẨM
			obj.find('.properties-vina ul li a').click(function() {
				$.ajax({
				  	method: "GET",
				  	url: opts.url_create,
				  	data: { row_ids: $(this).attr('href') },
				  	async: false,
				  	success: function(data) {
				  		if (data)
				  			selected_prop.prepend(data);
				  		else
				  			alert("Thêm thuộc tính không thành công!");
					},
				});

				return false;
			});

			//CẬP NHẬT GIÁ TRỊ MỚI CHO THUỘC TÍNH CỦA SẢN PHẨM
			obj.on('change', '.selected-properties-vina select', function() {
				var row_id = $(this).attr('data-id');
				var value_row = $(this).val();

				$.ajax({
				  	method: "GET",
				  	url: opts.url_update,
				  	data: { row_id: row_id, value_row: value_row },
				  	async: false,
				  	success: function(data) {
				  		if (data) {
				  			if (data == 2) {
					  			alert("Sản phẩm đã có giá trị vừa chọn cho thông số tương ứng! Vui lòng chọn giá trị khác!");
					  		}
				  		}
				  		else
				  			alert("Cập nhật thuộc tính không thành công!");
					},
				});
			});

			obj.find('.selected-properties-vina dl dd a').click(function() {
				var chk_val = false;
				$.ajax({
				  	method: "GET",
				  	url: opts.url_delete,
				  	data: { row_ids: $(this).attr('href') },
				  	async: false,
				  	success: function(data) {
				  		if (data)
				  			chk_val = true;
				  		else
				  			alert("Xóa thông số không thành công!");
					},
				});

				if (chk_val) {
					$(this).parents().filter('dl').remove();
				};
				
				return false;
			});


		});

	};
})(jQuery);