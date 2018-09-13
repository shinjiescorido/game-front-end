let component_reelgames = {
	stage : null,
    main(){

    },

    toggleList (type = "all") {

        $('.reelgames-list').hide();
        $(".header-sub-mb.-reelgames-sub").css({'display':'block'});

        switch(type) {
            case "all":
            this.context.component_header.sub_allgames.active(this.context.component_header.sub_allgames);
            this.context.component_header.sub_kagaming.normal(this.context.component_header.sub_kagaming);
            this.viewAllGames();
            break;

            case "ka_gaming":
            this.context.component_header.sub_allgames.normal(this.context.component_header.sub_allgames);
            this.context.component_header.sub_kagaming.active(this.context.component_header.sub_kagaming);
            this.viewKAGamesList();
            break;
        }
    },

    viewAllGames () {
        let container = $('.reelgames-list.all').show();
        container.empty();
        
        let kagaming = $('<img src="/img/reelgames/ka-gaming_icon.png">');
        let betsoft = $('<img src="/img/reelgames/betsoft-soon_icon.png">');
        
        kagaming.css({
                    'cursor'    : 'pointer',
                    'width'     : '300px'
                });

        betsoft.css({
                    'float'      : 'right',
                    'margin-top' : '-41px',
                    'width'      : '336px'
                });

        container.append(kagaming);
        container.append(betsoft);

        kagaming.on('click', () =>{ this.toggleList('ka_gaming') });
    },

    isDemo () {
        if(window.vendor_type == 'live') return '0';
        if(window.vendor_type == 'demo') return '1';
    },

    viewKAGamesList () {
        let container = $('.reelgames-list.kagaming').show();
        container.empty();

        let next_row = 0;
        let col = 0;
        let con_height = 0;
  
        var _this = this;
  
        var url = `${window.ka_url}?p=${window.ka_partner_name}&`;
        if(!ka_games) return;
        
        for(let i = 0; i < ka_games.length; i++) {
            
            if (col == 6) {
            next_row++;
            col = 0;
            }

            let kaGames = ka_games[i];
            let imgSrc = 'https://rmpiconcdn.kaga88.com/kaga/gameIcon?game='+kaGames.gameId+'&lang=en&type=square';

            var dom = document.createElement("div");
            $(dom).css({
                width: '170px',
                height: '170px',
                display: 'inline-block',
                margin: '5px' ,
                'border-radius' : '8px',
                'background' : 'url('+imgSrc+')',
                'background-size' : ' 100%'
            });

            container.append(dom);

            $(dom).on("click", ()=>{
                $.post('/kaga/token', {},  (response) => {
                var username = window.username;
                let tempUrl = `${url}g=${kaGames.gameId}`;
                tempUrl += '&t=' + response.payload + '&u=' + username;
                tempUrl += '&ak=' + response.access + `&cr=${window.currencyAbbrev}`;
                tempUrl += '&m=' + this.isDemo();
                tempUrl += '&l=' + window.lobby_domain+'m';
                tempUrl += '&loc=' + this.getLoc();

                if(window.reel_yn === 0) {
                    $('.ka-wrap, .ka-prompt-reel').addClass('active');
                    $(".ka-prompt-btn-reel").on('click', function (e) {
                    $(".ka-wrap, .ka-con").removeClass('active');
                    $(".ka-prompt-reel").removeClass('active');
                    });
                } else {
                    location.assign(tempUrl)
                }
                });
            });
            col++;
        }
    },
    getLoc () {
        
      let loc = "en";
      switch (window.language.locale) {
        case "zh":
          loc = "zh";
          break;        
        case "jp":
          loc = "ja";
          break;     
        case "kr":
          loc = "ko";
          break;
      }

      return loc;
    }
}

export default {
	component_reelgames
}