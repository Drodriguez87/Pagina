!function(a){a(window).on("elementor/frontend/init",function(){var e=elementorModules.frontend.handlers.Base.extend({settings:{},getDefaultSettings:function(){return{selectors:{user:".fa-user",activeCat:".category.active",loading:".premium-loading-feed",blogElement:".premium-blog-wrap",blogFilterTabs:".premium-blog-filter",contentWrapper:".premium-blog-content-wrapper",blogPost:".premium-blog-post-outer-container",metaSeparators:".premium-blog-meta-separator",filterLinks:".premium-blog-filters-container li a",currentPage:".premium-blog-pagination-container .page-numbers.current",activeElememnt:".premium-blog-filters-container li .active"}}},getDefaultElements:function(){var e=this.getSettings("selectors");return{$blogElement:this.$element.find(e.blogElement),$blogFilterTabs:this.$element.find(e.blogFilterTabs),$activeCat:this.$element.find(e.activeCat),$filterLinks:this.$element.find(e.filterLinks),$blogPost:this.$element.find(e.blogPost),$contentWrapper:this.$element.find(e.contentWrapper)}},bindEvents:function(){this.setLayoutSettings(),this.removeMetaSeparators(),this.run()},setLayoutSettings:function(){var e=this.getElementSettings(),t=this.elements.$blogPost,s={pageNumber:1,isLoaded:!0,count:2,equalHeight:e.force_height,layout:e.premium_blog_layout,carousel:"yes"===e.premium_blog_carousel,infinite:"yes"===e.premium_blog_infinite_scroll,scrollAfter:"yes"===e.scroll_to_offset,grid:"yes"===e.premium_blog_grid,total:t.data("total")};s.carousel&&(s.slidesToScroll=e.slides_to_scroll,s.spacing=parseInt(e.premium_blog_carousel_spacing),s.autoPlay="yes"===e.premium_blog_carousel_play,s.arrows="yes"===e.premium_blog_carousel_arrows,s.fade="yes"===e.premium_blog_carousel_fade,s.center="yes"===e.premium_blog_carousel_center,s.dots="yes"===e.premium_blog_carousel_dots,s.speed=""!==e.carousel_speed?parseInt(e.carousel_speed):300,s.autoplaySpeed=""!==e.premium_blog_carousel_autoplay_speed?parseInt(e.premium_blog_carousel_autoplay_speed):5e3),this.settings=s},removeMetaSeparators:function(){var s=this.getSettings("selectors"),e=this.$element.find(s.blogPost),t=e.first().find(s.metaSeparators),i=e.find(s.user);1===t.length?i.length||e.find(s.metaSeparators).remove():i.length||e.each(function(e,t){a(t).find(s.metaSeparators).first().remove()})},run:function(){var e=this,t=this.elements.$blogElement,s=this.elements.$activeCat.data("filter"),i=this.elements.$blogFilterTabs.length,n=t.data("pagination");this.settings.activeCategory=s,this.settings.filterTabs=i,this.settings.filterTabs&&this.filterTabs(),this.settings.filterTabs&&"*"!==this.settings.activeCategory||"masonry"!==this.settings.layout||this.settings.carousel||t.imagesLoaded(function(){t.isotope(e.getIsoTopeSettings())}),this.settings.carousel&&(t.slick(this.getSlickSettings()),t.removeClass("premium-carousel-hidden")),"even"===this.settings.layout&&this.settings.equalHeight&&t.imagesLoaded(function(){e.forceEqualHeight()}),n&&this.paginate(),this.settings.infinite&&t.is(":visible")&&this.getInfiniteScrollPosts()},paginate:function(){var s=this,i=this.$element,n=this.getSettings("selectors");i.on("click",".premium-blog-pagination-container .page-numbers",function(e){if(e.preventDefault(),!a(this).hasClass("current")){var t=parseInt(i.find(n.currentPage).html());a(this).hasClass("next")?s.settings.pageNumber=t+1:a(this).hasClass("prev")?s.settings.pageNumber=t-1:s.settings.pageNumber=a(this).html(),s.getPostsByAjax(s.settings.scrollAfter)}})},forceEqualHeight:function(){var i=new Array,e=this.getSettings("selectors").contentWrapper,t=this.$element.find(e);t.each(function(e,t){var s=a(t).outerHeight();i.push(s)});var s=Math.max.apply(null,i);t.css("height",s+"px")},getSlickSettings:function(){var e=this.settings,t=e.grid?this.getSlickCols():null,s=e.grid?t.cols:1,i=e.grid?t.colsTablet:1,n=e.grid?t.colsMobile:1,o=e.arrows?'<a type="button" data-role="none" class="carousel-arrow carousel-prev" aria-label="Previous" role="button" style=""><i class="fas fa-angle-left" aria-hidden="true"></i></a>':"",a=e.arrows?'<a type="button" data-role="none" class="carousel-arrow carousel-next" aria-label="Next" role="button" style=""><i class="fas fa-angle-right" aria-hidden="true"></i></a>':"";return{infinite:!0,slidesToShow:s,slidesToScroll:e.slidesToScroll||s,responsive:[{breakpoint:1025,settings:{slidesToShow:i,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:n,slidesToScroll:1}}],autoplay:e.autoPlay,rows:0,speed:e.speed,autoplaySpeed:e.autoplaySpeed,nextArrow:a,prevArrow:o,fade:e.fade,centerMode:e.center,centerPadding:e.spacing+"px",draggable:!0,dots:e.dots,customPaging:function(){return'<i class="fas fa-circle"></i>'}}},getSlickCols:function(){var e=this.getElementSettings(),t=e.premium_blog_columns_number,s=e.premium_blog_columns_number_tablet,i=e.premium_blog_columns_number_mobile;return{cols:parseInt(100/t.substr(0,t.indexOf("%"))),colsTablet:parseInt(100/s.substr(0,s.indexOf("%"))),colsMobile:parseInt(100/i.substr(0,i.indexOf("%")))}},getIsoTopeSettings:function(){return{itemSelector:".premium-blog-post-outer-container",percentPosition:!0,filter:this.settings.activeCategory,animationOptions:{duration:750,easing:"linear",queue:!1}}},filterTabs:function(){var t=this,s=this.getSettings("selectors");this.elements.$filterLinks.click(function(e){e.preventDefault(),t.$element.find(s.activeElememnt).removeClass("active"),a(this).addClass("active"),t.settings.activeCategory=a(this).attr("data-filter"),t.settings.pageNumber=1,t.settings.infinite?(t.getPostsByAjax(!1),t.settings.count=2,t.getInfiniteScrollPosts()):t.getPostsByAjax(t.settings.scrollAfter)})},getPostsByAjax:function(t){void 0===this.settings.activeCategory&&(this.settings.activeCategory="*");var i=this,n=this.elements.$blogElement,o=this.getSettings("selectors");a.ajax({url:PremiumSettings.ajaxurl,dataType:"json",type:"POST",data:{action:"pa_get_posts",page_id:n.data("page"),widget_id:i.$element.data("id"),page_number:i.settings.pageNumber,category:i.settings.activeCategory,nonce:PremiumSettings.nonce},beforeSend:function(){n.append('<div class="premium-loading-feed"><div class="premium-loader"></div></div>');var e=0;0<a(".elementor-sticky").length&&(e=100),t&&a("html, body").animate({scrollTop:n.offset().top-50-e},"slow")},success:function(e){if(e.data){n.find(o.loading).remove();var t=e.data.posts,s=e.data.paging;i.settings.infinite?(i.settings.isLoaded=!0,i.settings.filterTabs&&1===i.settings.pageNumber?n.html(t):n.append(t)):(n.html(t),i.$element.find(".premium-blog-footer").html(s)),i.removeMetaSeparators(),i.settings.layout&&("even"===i.settings.layout?i.settings.equalHeight&&i.forceEqualHeight():n.imagesLoaded(function(){n.isotope("reloadItems"),n.isotope({itemSelector:".premium-blog-post-outer-container",animate:!1})}))}},error:function(e){console.log(e)}})},getInfiniteScrollPosts:function(){var e=jQuery(window).outerHeight()/1.25,t=this;a(window).scroll(function(){t.settings.filterTabs&&($blogPost=t.elements.$blogElement.find(".premium-blog-post-outer-container"),t.settings.total=$blogPost.data("total")),t.settings.count<=t.settings.total&&a(window).scrollTop()+e>=t.$element.find(".premium-blog-post-outer-container:last").offset().top&&1==t.settings.isLoaded&&(t.settings.pageNumber=t.settings.count,t.getPostsByAjax(!1),t.settings.count++,t.settings.isLoaded=!1)})}});elementorFrontend.elementsHandler.attachHandler("premium-addon-blog",e)})}(jQuery);