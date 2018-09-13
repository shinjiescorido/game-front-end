import { createSprite, randomNum, createCardSprite, numberCounter, playSound, numberWithCommas } from '../factories/factories';

let instance = null;

export default() => {
	instance = instance || new blu.Component({
		main () {

		    this._modalWidth = 1680;
		    this._modalHeight = 950;
		},
	    scrollable(page, content) {
	      let content_bounds = content.getBounds();

	      let view = new createjs.Shape();
	      view.graphics.beginStroke("#fff").setStrokeStyle(0.1).drawRect(0, 0, this._modalWidth - 22.5, this._modalHeight - 120);
	      view.setBounds(0, 0, this._modalWidth - 22.5, this._modalHeight - 120);
	      view.x = content.x;
	      view.y = content.y;
	      view.hitArea = new createjs.Shape();
	      view.hitArea.graphics.beginFill("#fff").drawRect(0, 0, this._modalWidth - 22.5, this._modalHeight - 120);
	      content.mask = view;

	      let view_bounds = view.getBounds();
	      let curYPos = 0;
	      let curDown = false;
	      let top = view.y;
	      let bottom = view.y - (content_bounds.height - view_bounds.height);
	      let scrollbg;
	      let scrollbar;
	      let scroll_bottom = view.y + view_bounds.height - ((view_bounds.height / content_bounds.height) * view_bounds.height);
	      let top_glow;

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

	        top_glow = new createjs.Shape();
	        top_glow.graphics.beginLinearGradientFill(["#ff9a28", "transparent"], [0, 1], 0, -10, 0, 40).drawRect(0, 0, view_bounds.width - 5, 50);
	        top_glow.x = 10; top_glow.y = top;
	        top_glow.alpha = 0.7;
	        top_glow.visible = false;


	        content.y = top;
	        scrollbar.y = top;

	        scrollbar.addEventListener("mousedown", (e) => {
	          curDown = true; curYPos = e.stageY;
	        });
	        scrollbar.addEventListener("pressup", (e) => {
	          curDown = false;
	        });
	        scrollbar.addEventListener("pressmove", (e) => {
	          if(curDown && content.y <= top && content.y >= bottom){
	            if(e.stageY < curYPos) {
	              content.y += Math.abs(e.stageY - curYPos) * (content_bounds.height / view_bounds.height);
	              scrollbar.y -= Math.abs(e.stageY - curYPos);
	            }
	            else
	            {
	              content.y -= Math.abs(e.stageY - curYPos) * (content_bounds.height / view_bounds.height);
	              scrollbar.y += Math.abs(e.stageY - curYPos);
	            }
	          } // end if
	          if (content.y > top)      { content.y = top;      }
	          if (content.y < bottom)   { content.y = bottom;   }
	          if (scrollbar.y < top) { scrollbar.y = top;    }
	          if (scrollbar.y > scroll_bottom)    { scrollbar.y = scroll_bottom; }

	          if (content.y >= top - 100) {
	            top_glow.visible = false;
	          }
	          else {
	            top_glow.visible = true;
	          }
	          curYPos = e.stageY;
	        });
	        page.addEventListener("rollover", (e) => {
	          window.addEventListener("wheel", scroller);
	        });
	        page.addEventListener("rollout", (e) => {
	          window.removeEventListener("wheel", scroller);
	        });

	      } // end if(content_bounds.height > view_bounds.height)

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
	          // toTop_btn.visible = false;
	          top_glow.visible = false;
	        }
	        else {
	          // toTop_btn.visible = true;
	          top_glow.visible = true;
	        }
	      } // end function scroller

	      return {"top": top, "bottom": bottom, "scrollbar": scrollbar, "scroll_bottom": scroll_bottom, "view_bounds": view_bounds, "top_glow": top_glow}

	    },

	    makeScrollToButton(content, text, from_Y, to_Y, scrollprop) {
	      let link_bg = new createjs.Shape();
	      link_bg.graphics.beginFill("#ff9a28").drawRect(0, 0, this._modalWidth - 27.5, 40);
	      link_bg.alpha = 0;
	      link_bg.cursor = "pointer";
	      link_bg.hitArea = new createjs.Shape();
	      link_bg.hitArea.graphics.beginFill("#ddd").drawRect(0, 0, this._modalWidth - 27.5, 40);
	      link_bg.x = 0;
	      link_bg.y = from_Y;
	      let link_lbl = new createjs.Text(text, "bold 13px Lato", "#ff9a28");
	      link_lbl.textAlign = "center";
	      link_lbl.textBaseline = "middle";

	      link_lbl.x = link_bg.x + this._modalWidth / 2;
	      link_lbl.y = link_bg.y + 20;

	      content.addChild( link_lbl);

	      let content_shiftY = scrollprop.top - (to_Y - 10);
	      let scrollbar_shiftY = (scrollprop.top + to_Y) * (scrollprop.view_bounds.height / content.getBounds().height);

	      if (content_shiftY > scrollprop.top) {
	        content_shiftY = content.top;
	        scrollbar_shiftY = content.top;
	      }
	      if (content_shiftY < scrollprop.bottom) {
	        content_shiftY = scrollprop.bottom;
	        scrollbar_shiftY = scrollprop.scroll_bottom;
	      }

	      link_bg.addEventListener("rollover", (e) => {
	        link_bg.alpha = 0.4;
	        link_lbl.color = "#fff";
	      });
	      link_bg.addEventListener("rollout", (e) => {
	        link_bg.alpha = 0;
	        link_lbl.color = "#ff9a28";
	      });
	      link_bg.addEventListener("click", (e) => {
	        createjs.Tween.get(content).to({
	          y: content_shiftY
	        }, 300);
	        createjs.Tween.get(scrollprop.scrollbar).to({
	          y: scrollbar_shiftY
	        }, 300);

	        scrollprop.toTop_btn.visible = true;
	        scrollprop.top_glow.visible = true;

	      });

	      return [link_bg, link_lbl];
	    }
	});

	return instance;
}