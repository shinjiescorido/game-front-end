import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main () {

		    this._modalWidth = 1680;
		    this._modalHeight = 950;
		},
	    scrollable(page, content, width, height, is_mobile) {
	    let content_bounds = content.getBounds();

        if(width) {
          this._modalWidth = width;
        }
        if(height) {
          this._modalHeight = height;
        }

	      let view = new createjs.Shape();
	      view.graphics.beginFill("#fff").setStrokeStyle(0.1).drawRect(0, 0, this._modalWidth - 22.5, this._modalHeight - 120);
	      view.setBounds(0, 0, this._modalWidth - 22.5, this._modalHeight - 120);
        view.alpha = 0;
	      view.x = content.x;
	      view.y = content.y;
	      view.hitArea = new createjs.Shape();
	      view.hitArea.graphics.beginFill("#fff").drawRect(0, 0, this._modalWidth, this._modalHeight);

	      content.mask = view;
        // content.hitArea = new createjs.Shape();
        // content.hitArea.graphics.beginFill("#fff").drawRect(0, 0, this._modalWidth, this._modalHeight);
        // page.hitArea = new createjs.Shape();
        // page.hitArea.graphics.beginFill("#fff").drawRect(0, 0, this._modalWidth, this._modalHeight);


        page.addChildAt(view, 0);

	      let view_bounds = view.getBounds();
	      let curYPos = 0;
	      let curDown = false;
	      let top = view.y;
	      let bottom = view.y - (content_bounds.height - view_bounds.height);
	      let scrollbg;
	      let scrollbar;
	      let scroll_bottom = view.y + view_bounds.height - ((view_bounds.height / content_bounds.height) * view_bounds.height);
        let toTop_btn;
        let trigg;
        let direction;

        // page.addChild(view);



	      if(content_bounds.height > view_bounds.height) {
	        scrollbg = new createjs.Shape();
	        scrollbg.graphics.beginStroke("#a7a7a7").setStrokeStyle(2, "square")
	          .moveTo(view.x + view_bounds.width - 2.5, view.y + 2.5)
	          .lineTo(view.x + view_bounds.width - 2.5, view.y + view_bounds.height - 2.5);
	        page.addChild(scrollbg);

	        scrollbar = new createjs.Shape();
	        scrollbar.graphics.beginStroke("#a7a7a7").setStrokeStyle(10, "round")
	          .moveTo(view.x + view_bounds.width - 2.5, view.y + 2.5)
	          .lineTo(view.x + view_bounds.width - 2.5, view.y + ((view_bounds.height / content_bounds.height) * view_bounds.height) - 2.5);
	        scrollbar.regY = view.y;
	        page.addChild(scrollbar);

          toTop_btn = new createjs.Shape();
          toTop_btn.graphics.beginFill("#ff9a28").drawCircle(0, 0, 15)
            .beginFill().beginStroke("#fff").setStrokeStyle(3, "round", "round")
            .moveTo(-5, 2.5).lineTo(0, -2.5).lineTo(5, 2.5);
          toTop_btn.alpha = 0.5;
          toTop_btn.visible = false;
          toTop_btn.x = view.x + view_bounds.width - 40;
          toTop_btn.y = view.y + view_bounds.height - 40;


	        content.y = top;
	        scrollbar.y = top;

          trigg = scrollbar;
          direction = 1;
          if(is_mobile) {
            trigg = page;
            direction = -1;
          }

	        trigg.addEventListener("mousedown", (e) => {
	          curDown = true; curYPos = e.stageY;
            if(is_mobile) scrollbar.alpha = 0.6;
	        });
	        trigg.addEventListener("pressup", (e) => {
	          curDown = false;
            if(is_mobile) scrollbar.alpha = 1;
	        });
	        trigg.addEventListener("pressmove", (e) => {
	          if(curDown && content.y <= top && content.y >= bottom){
	            if(e.stageY < curYPos) {
	              content.y += Math.abs(e.stageY - curYPos) * (content_bounds.height / view_bounds.height) * direction;
	              scrollbar.y -= Math.abs(e.stageY - curYPos) * direction;
	            }
	            else
	            {
	              content.y -= Math.abs(e.stageY - curYPos) * (content_bounds.height / view_bounds.height) * direction;
	              scrollbar.y += Math.abs(e.stageY - curYPos) * direction;
	            }
	          } // end if
	          if (content.y > top)      { content.y = top;      }
	          if (content.y < bottom)   { content.y = bottom;   }
	          if (scrollbar.y < top) { scrollbar.y = top;    }
	          if (scrollbar.y > scroll_bottom)    { scrollbar.y = scroll_bottom; }

            if (content.y >= top - 100) {
              toTop_btn.visible = false;
            }
            else {
              toTop_btn.visible = true;
            }
	          curYPos = e.stageY;
	        });
          if(!is_mobile) {
            trigg.addEventListener("mouseover", changeOpacity);
            trigg.addEventListener("mouseout", changeOpacity);
            page.addEventListener("mouseover", toggleWheelListener);
  	        page.addEventListener("mouseout", toggleWheelListener);
            toTop_btn.addEventListener("rollover", changeOpacity);
            toTop_btn.addEventListener("rollout", changeOpacity);
          }

          toTop_btn.addEventListener("click", (e) => {
            createjs.Tween.get(content).to({
              y: top
            }, 300);
            createjs.Tween.get(scrollbar).to({
              y: top
            }, 300);
            toTop_btn.visible = false;
          });

	      } // end if(content_bounds.height > view_bounds.height)

        function changeOpacity(e) {
          if(e.type == "mouseover")     { e.target.alpha = 0.6;   }
          else if(e.type == "mouseout") { e.target.alpha = 1; }
        }
        function toggleWheelListener(e) {
          if(e.type == "mouseover")     { window.addEventListener("wheel", scroller);     }
          else if(e.type == "mouseout") {  window.removeEventListener("wheel", scroller); }
        }

	      function scroller(e) {
	        if(content.y <= top && content.y >= bottom){
	          content.y -= Math.floor(e.deltaY / 4) * (content_bounds.height / view_bounds.height);
	          scrollbar.y += Math.floor(e.deltaY / 4);

	        }
	        if (content.y > top)      { content.y = top;      }
	        if (content.y < bottom)   { content.y = bottom;   }
	        if (scrollbar.y < top) { scrollbar.y = top;    }
	        if (scrollbar.y > scroll_bottom)    { scrollbar.y = scroll_bottom; }

          if (content.y >= top - 100) {
            toTop_btn.visible = false;
          }
          else {
            toTop_btn.visible = true;
          }
	      } // end function scroller

	      return {
          "page": page,
          "trigg": trigg,
          "top": top,
          "bottom": bottom,
          "scrollbar": scrollbar,
          "scrollbg": scrollbg,
          "scroll_bottom": scroll_bottom,
          "view": view,
          "toTop_btn": toTop_btn,
          "changeOpacity": changeOpacity,
          "toggleWheelListener": toggleWheelListener,
          "scroller": scroller,
        }

	    },

      togglescrollable(content, active) {
        let scrollprop = content.scrollprop;
        if(!scrollprop) return;
        if(!scrollprop.trigg) return;
        if(active) {
          scrollprop.trigg.addEventListener("mouseover", scrollprop.changeOpacity);
          scrollprop.trigg.addEventListener("mouseout", scrollprop.changeOpacity);
          scrollprop.page.addEventListener("mouseover", scrollprop.toggleWheelListener);
          scrollprop.page.addEventListener("mouseout", scrollprop.toggleWheelListener);

          scrollprop.scrollbg.visible = true;
          scrollprop.scrollbar.visible = true;
          scrollprop.toTop_btn.visible = true;
        }
        else {
          scrollprop.trigg.removeEventListener("mouseover", scrollprop.changeOpacity);
          scrollprop.trigg.removeEventListener("mouseout", scrollprop.changeOpacity);
          scrollprop.page.removeEventListener("mouseover", scrollprop.toggleWheelListener);
          scrollprop.page.removeEventListener("mouseout", scrollprop.toggleWheelListener);

          scrollprop.scrollbg.visible = false;
          scrollprop.scrollbar.visible = false;
          scrollprop.toTop_btn.visible = false;
        }


      },

      removescrollprop(content) {
        let scrollprop = content.scrollprop;
        scrollprop.trigg.removeEventListener("mouseover", scrollprop.changeOpacity);
        scrollprop.trigg.removeEventListener("mouseout", scrollprop.changeOpacity);
        scrollprop.page.removeEventListener("mouseover", scrollprop.toggleWheelListener);
        scrollprop.page.removeEventListener("mouseout", scrollprop.toggleWheelListener);

        scrollprop.page.removeChild(scrollprop.view, scrollprop.scrollbar, scrollprop.scrollbg, scrollprop.toTop_btn);

        content.scrollable = null;
      },

	    makeScrollToButton(content, shape, to_Y, scrollprop) { //(content, text, from_Y, to_Y, scrollprop)
	      // let link_bg = new createjs.Shape();
	      // link_bg.graphics.beginFill("#ff9a28").drawRect(0, 0, this._modalWidth - 27.5, 40);
	      // link_bg.alpha = 0;
	      // link_bg.cursor = "pointer";
	      // link_bg.hitArea = new createjs.Shape();
	      // link_bg.hitArea.graphics.beginFill("#ddd").drawRect(0, 0, this._modalWidth - 27.5, 40);
	      // link_bg.x = 0;
	      // link_bg.y = from_Y;
	      // let link_lbl = new createjs.Text(text, "bold 13px Lato", "#ff9a28");
	      // link_lbl.textAlign = "center";
	      // link_lbl.textBaseline = "middle";
        //
	      // link_lbl.x = link_bg.x + this._modalWidth / 2;
	      // link_lbl.y = link_bg.y + 20;
        //
	      // content.addChild( link_lbl);

	      let content_shiftY = scrollprop.top - (to_Y - 10);
	      let scrollbar_shiftY = (scrollprop.top + to_Y) * (scrollprop.view.getBounds().height / content.getBounds().height);

	      if (content_shiftY > scrollprop.top) {
	        content_shiftY = scrollprop.top;
	        scrollbar_shiftY = scrollprop.top;
	      }
	      if (content_shiftY < scrollprop.bottom) {
	        content_shiftY = scrollprop.bottom;
	        scrollbar_shiftY = scrollprop.scroll_bottom;
	      }

	      // link_bg.addEventListener("rollover", (e) => {
	      //   link_bg.alpha = 0.4;
	      //   link_lbl.color = "#fff";
	      // });
	      // link_bg.addEventListener("rollout", (e) => {
	      //   link_bg.alpha = 0;
	      //   link_lbl.color = "#ff9a28";
	      // });

	      shape.addEventListener("click", (e) => {
	        createjs.Tween.get(content).to({
	          y: content_shiftY
	        }, 300);
	        createjs.Tween.get(scrollprop.scrollbar).to({
	          y: scrollbar_shiftY
	        }, 300);

	        scrollprop.toTop_btn.visible = true;

	      });

	      return;
	    }
	});

	return instance;
}
