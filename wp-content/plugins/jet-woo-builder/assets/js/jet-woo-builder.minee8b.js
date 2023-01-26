!function(e,t){"use strict";var o={init:function(){var i={"jet-single-images.default":o.productImages,"jet-single-add-to-cart.default":o.addToCart,"jet-single-tabs.default":o.productTabs,"jet-woo-products.default":o.widgetProducts,"jet-woo-categories.default":o.widgetCategories};e.each(i,function(e,o){t.hooks.addAction("frontend/element_ready/"+e,o)});var a=navigator.userAgent;-1!==a.indexOf("Safari")&&-1===a.indexOf("Chrome")&&document.addEventListener("click",function(e){e.target.matches(".add_to_cart_button .button-text")&&e.target.parentNode.focus();(e.target.matches(".add_to_cart_button")||e.target.matches(".single_add_to_cart_button"))&&e.target.focus()}),t.hooks.addFilter("jet-popup/widget-extensions/popup-data",o.prepareJetPopup),e(window).on("jet-popup/render-content/ajax/success",o.jetPopupLoaded),e("form.cart").on("change","input.qty",o.ajaxLoopAddToCartWithQty),e(document).on("wc_update_cart added_to_cart",o.jetCartPopupOpen).on("jet-filter-content-rendered",o.reInitCarousel).on("click",".jet-woo-switcher-btn",o.layoutSwitcher).on("jet-filter-content-rendered",o.reInitAjaxLoopAddToCartWithQty).on("jet-woo-builder-content-rendered",o.reInitAjaxLoopAddToCartWithQty).on("jet-engine/listing-grid/after-load-more",o.reInitAjaxLoopAddToCartWithQty).on("jet-engine/listing-grid/after-lazy-load",o.reInitAjaxLoopAddToCartWithQty).on("jet-cw-loaded",o.reInitAjaxLoopAddToCartWithQty)},layoutSwitcher:function(t){t.preventDefault();var i=e(t.currentTarget).parents(".jet-woo-builder-products-loop").find(".jet-woo-products-wrapper"),a=i.data("layout-switcher"),n=e(t.currentTarget).hasClass("jet-woo-switcher-btn-main")?a.main:a.secondary,r=e(document).find(".jet-woo-switcher-controls-wrapper .jet-woo-switcher-btn");if(window.JetSmartFilters&&window.JetSmartFilters.filterGroups["woocommerce-archive/default"])var d=window.JetSmartFilters.filterGroups["woocommerce-archive/default"].query;e(t.currentTarget).hasClass("active")||(r.hasClass("active")&&r.removeClass("active"),e(t.currentTarget).addClass("active")),e.ajax({type:"POST",url:window.jetWooBuilderData.ajax_url,data:{action:"jet_woo_builder_get_layout",query:window.jetWooBuilderData.products,layout:n,filters:d},beforeSend:function(e){i.addClass("jet-layout-loading")},success:function(t){i.removeClass("jet-layout-loading"),i.html(t),o.elementorFrontendInit(i),e(document).trigger("jet-woo-builder-content-rendered")}})},ajaxLoopAddToCartWithQty:function(){"0"!==this.value||e(this.form).hasClass("grouped_form")||(this.value="1"),e(this.form).find("button[data-quantity]").attr("data-quantity",this.value)},jetPopupLoaded:function(t,o){let i=e("#"+o.data.popupId);setTimeout(function(){e(window).trigger("resize"),i.hasClass("quick-view-product")||(i.addClass("woocommerce product quick-view-product"),i.find(".jet-popup__container-content").addClass("product")),e(".jet-popup .variations_form").each(function(){e(this).wc_variation_form()}),e(".jet-popup .woocommerce-product-gallery.images").each(function(){e(this).wc_product_gallery()}),e(document).on("wc_update_cart added_to_cart",function(t){t.preventDefault(),e(window).trigger({type:"jet-popup-close-trigger",popupData:{popupId:o.data.popupId,constantly:!1}})})},500)},prepareJetPopup:function(t,o,i,a){var n;o["is-jet-woo-builder"]&&(t.isJetWooBuilder=!0,t.templateId=o["jet-woo-builder-qv-template"],(n=i.hasClass("elementor-widget-jet-woo-products")||i.hasClass("elementor-widget-jet-woo-products-list")?e(a.target).parents(".jet-woo-builder-product"):i.parents(".jet-woo-builder-product")).length&&(t.productId=n.data("product-id")));return t},productImages:function(t){t.find(".jet-single-images__loading").remove(),e("body").hasClass("single-product")||t.find(".woocommerce-product-gallery").each(function(){e(this).wc_product_gallery()})},addToCart:function(t){e("body").hasClass("single-product")||"undefined"!=typeof wc_add_to_cart_variation_params&&t.find(".variations_form").each(function(){e(this).wc_variation_form()})},productTabs:function(t){if(t.find(".jet-single-tabs__loading").remove(),!e("body").hasClass("single-product")){var o=window.location.hash,i=window.location.href,a=t.find(".wc-tabs, ul.tabs").first();a.find("a").addClass("elementor-clickable"),t.find(".wc-tab, .woocommerce-tabs .panel:not(.panel .panel)").hide(),o.toLowerCase().indexOf("comment-")>=0||"#reviews"===o||"#tab-reviews"===o?a.find("li.reviews_tab a").trigger("click"):i.indexOf("comment-page-")>0||i.indexOf("cpage=")>0?a.find("li.reviews_tab a").trigger("click"):"#tab-additional_information"===o?a.find("li.additional_information_tab a").trigger("click"):a.find("li:first a").trigger("click")}},widgetProducts:function(e){var t=e.find(".jet-woo-carousel"),i=e.find(".jet-woo-products"),a=i.data("mobile-hover"),n=i.find(".jet-woo-products__item"),r=n.find(".jet-woo-products-cqw-wrapper"),d=n.find(".hovered-content"),s=!1,c=!1;r.length>0&&r.html().trim().length>0&&(s=!0),d.length>0&&d.html().trim().length>0&&(c=!0),(s||c)&&a&&o.mobileHoverOnTouch(n,".jet-woo-product-thumbnail"),t.length&&o.initCarousel(t,t.data("slider_options"))},widgetCategories:function(e){var t=e.find(".jet-woo-carousel"),i=e.find(".jet-woo-categories"),a=i.data("mobile-hover"),n=i.find(".jet-woo-categories__item"),r=n.find(".jet-woo-category-count");(i.hasClass("jet-woo-categories--preset-2")&&r.length>0||i.hasClass("jet-woo-categories--preset-3"))&&a&&o.mobileHoverOnTouch(n,".jet-woo-category-thumbnail"),t.length&&o.initCarousel(t,t.data("slider_options"))},mobileHoverOnTouch:function(t,i){void 0!==window.ontouchstart&&t.each(function(){let t=e(this),a=t.find(i+" a"),n=t.siblings();if(t.hasClass("jet-woo-products__item")){t.not(i).each(function(){let i=e(this);o.mobileTouchEvent(t,i,n)})}o.mobileTouchEvent(t,a,n)})},mobileTouchEvent:function(t,o,i){o.on("click",function(o){t.hasClass("mobile-hover")||(o.preventDefault(),i.each(function(){e(this).hasClass("mobile-hover")&&e(this).removeClass("mobile-hover")}),t.addClass("mobile-hover"))})},reInitCarousel:function(e,t){o.widgetProducts(t)},reInitAjaxLoopAddToCartWithQty:function(){e("form.cart").on("change","input.qty",o.ajaxLoopAddToCartWithQty)},initCarousel:function(o,i){var a,n,r,d,s,c=o.find(".swiper-slide").length;if(a=i.slidesToShow.mobile?i.slidesToShow.mobile:1,n=i.slidesToShow.tablet?i.slidesToShow.tablet:1===i.slidesToShow.desktop?1:2,r=i.slidesToShow.desktop,s=e(window).width()<768?a:e(window).width()<1025?n:r,d={slidesPerView:1,fadeEffect:{crossFade:"fade"===i.effect},breakpoints:{0:{slidesPerView:a,slidesPerGroup:1},768:{slidesPerView:n,slidesPerGroup:1},1025:{slidesPerView:r}}},i.paginationEnable&&(d.pagination={el:".swiper-pagination",clickable:!0}),i.navigationEnable&&(d.navigation={nextEl:".jet-swiper-button-next",prevEl:".jet-swiper-button-prev"}),c>s){if("undefined"==typeof Swiper){new(0,t.utils.swiper)(o,e.extend({},d,i))}else new Swiper(o,e.extend({},d,i));o.find(".jet-arrow").show()}else"vertical"===i.direction?(o.addClass("swiper-container-vertical"),o.find(".jet-arrow").hide()):o.find(".jet-arrow").hide()},jetCartPopupOpen:function(t,o,i,a){var n=e(a).parents(".jet-woo-products, .jet-woo-products-list, .jet-woo-builder-archive-add-to-cart, .jet-woo-builder-single-ajax-add-to-cart").data("cart-popup-enable"),r=e(a).parents(".jet-woo-products, .jet-woo-products-list, .jet-woo-builder-archive-add-to-cart, .jet-woo-builder-single-ajax-add-to-cart").data("cart-popup-id");r=e(r)[0],n&&e(window).trigger({type:"jet-popup-open-trigger",popupData:{popupId:"jet-popup-"+r}})},elementorFrontendInit:function(t){t.find("div[data-element_type]").each(function(){var t=e(this),o=t.data("element_type");o&&("widget"===o&&(o=t.data("widget_type"),window.elementorFrontend.hooks.doAction("frontend/element_ready/widget",t,e)),window.elementorFrontend.hooks.doAction("frontend/element_ready/global",t,e),window.elementorFrontend.hooks.doAction("frontend/element_ready/"+o,t,e))})}};e(window).on("elementor/frontend/init",o.init)}(jQuery,window.elementorFrontend);