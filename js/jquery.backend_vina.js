(function ($) {
	$.fn.backend_vina = function(options) {

		var defaults = $.extend({
			},options);

		var obj = $(this);
		var opts = $.extend(defaults,options);
		var pos_headerbox = $('.headerbox-vina').offset();

		method = {
			chooseImgAlbum: function() {
				$('.imgAlbum label').removeClass('active');
				var checked_in = $('.imgAlbum').find('input:checked');
				checked_in.each(function() {
					var input_id = $(this).attr('id');
					$('.imgAlbum label[for="' + input_id + '"]').addClass('active');
				});
			},
		};

		return this.each(function() {
			

			/*==============Chọn ảnh cho album================*/
			$('.imgAlbum input').change(function() { method.chooseImgAlbum(); });
			method.chooseImgAlbum(); //hiển thị các ảnh đã được chọn



			$(window).scroll(function() {
			    if ($(this).scrollTop() > pos_headerbox.top)
					$('.headerbox-vina').addClass('fixed-vina');
				else
					$('.headerbox-vina').removeClass('fixed-vina');
		    });

			/*----------------MOBILE----------------*/

			//Thiết lập chiều cao mặc định cho trang
			var current_height= ($(".sidebar-vina").height());
			$('.contentbox-vina').css('min-height', current_height);

			//Ẩn or hiện menu mobile
			obj.find('.navbar-admin button').click(function() {
				$('.container-vina').toggleClass('container-m');
			});

			//Thu nhỏ phóng to menu mobile
			obj.find('.sidecoll-vina a').click(function() {
				var ele_wrapper = $('.wrapper');
				if (ele_wrapper.hasClass('expand-menu'))
				{
					ele_wrapper.removeClass('expand-menu').addClass('mini-menu');
					$(this).find('i').removeClass('fa-angle-double-left').addClass('fa-angle-double-right');
				}
				else
				{
					ele_wrapper.removeClass('mini-menu').addClass('expand-menu');
					$(this).find('i').removeClass('fa-angle-double-right').addClass('fa-angle-double-left');
				}
			});
			/*----------------MOBILE----------------*/

			//XÓA NHIỀU TRONG TRANG INDEX
			obj.find('._delete_all a').click(function() {
				if (confirm("Bạn chắc chắn muốn xóa các mục này?")) {
					$('._form_delete_all').submit();
				};
				return false;
			});

			//HIỂN THỊ & ẨN CÁC TAB TRANG SP
			obj.find('.nav_product li a').each(function() {
				$(this).click(function() {
					$('.nav_product li').removeClass('active');
					$('.tab-box').hide();
					$($(this).attr('href')).show();
					$(this).parent().addClass('active');
					return false; 
				});
			});

			/*==============THÊM NHANH SẢN PHẨM================*/

			//THÊM SẢN PHẨM KHÔNG XÓA DỮ LIỆU
			obj.find('._add_fast a').click(function() {
				$('._form_fast').submit();
				return false;
			});

			//THÊM SẢN PHẨM KHÔNG XÓA DỮ LIỆU
			obj.find('._add_delete_fast a').click(function() {
				if (confirm("Bạn muốn thêm sản phẩm và xóa dữ liệu tạm?"))
				{
					$('.add_delete_input').val(1);
					$('._form_fast').submit();
				};
				return false;
			});

			/*==============SEO================*/

			//HIỂN THỊ & ẨN SEO
			obj.find('a.editseo-vina').click(function() {
				$('.hideseo-vina').toggle('medium');
				return false;
			});

			/*==============FORM================*/

			//KÍCH HOẠT FORM
			obj.find('.active_submit').click(function() {
				$(this).parents('body').find('form:first-child').submit();
				return false;
			});

			/*==============CHỌN TẤT CẢ================*/

			obj.find('.listtask-vina a.all-task').click(function() {
				$(this).parents('.listtask-vina').find('input').prop('checked', true);
				return false;
			});

			obj.find('.listtask-vina a.none-task').click(function() {
				$(this).parents('.listtask-vina').find('input').prop('checked', false);
				return false;
			});

			/*==============MENU KÉO THẢ================*/
			obj.find("ol.menu_list").sortable({
				group: 'nested',
				onDrop: function ($item, container, _super) {

					var menu_arr = [];

					el_ol = $item.parent();
					el_ol.children().each(function() {
						menu_arr[menu_arr.length] = $(this).attr("data-id");
					});

					parent_id = el_ol.parent().attr("data-id");
					if (!parent_id)
						parent_id = 0;
					el_id = $item.attr("data-id");
					group_id = $item.parents('.menu_group').attr("data-pos");

					$.ajax({
						method: "GET",
						url: opts.url_orderMenu,
						data: {sort_str: menu_arr.join(), parent_id: parent_id, el_id:el_id, group_id:group_id},
						async: false,
						success: function(data) {}
					});
					_super($item, container);
				}
			});

		});
	};
})(jQuery);