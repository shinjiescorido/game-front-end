<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js"></script>
    </head>
    <body>
        <div id="betting-buttons" style="display:inline-block">
            <button data-bet="playerpair">Player Pair</button>
            <button data-bet="player">Player</button>
            <button data-bet="tie">Tie</button>
            <button data-bet="banker">Banker</button>
            <button data-bet="bankerpair">Banker Pair</button>
        </div>

        <div style="display: inline-block; margin-left: 30px;">
            <button id="bet">Bet</button>
            <button id="clear">Cancel</button>
        </div>

        <pre id="bet-view"></pre>
        <script type="text/javascript">
            window.bets = {
                round_id:266437,
                data:[],
                logs: []
            };

            $('#clear').click(function () {
                $.post('/bet/cancel/2/25000-500000', {}, function () {
                    $('bet-view').text('Bet Cancelled!')
                });
            });

            $('#bet').click(function () {
                $.post('/bet/store/2/25000-500000', window.bets, function (response) {
                    $('bet-view').text('Bet Saved!! <br> ' + response);
                });
            });

            $('#betting-buttons > button').click(function () {
                var _this = $(this);
                var table_id = $(this).data('bet');
                var index = _.findIndex(window.bets.data, function (row) {
                    return row.table_id == _this.data('bet');
                });



                if (index === -1) {
                    window.bets.data.push({
                        amount: 1000,
                        table_id: table_id,
                        dividend: 11,
                        is_confirmed: true
                    });
                }
                else {
                    window.bets.data[index]['amount'] += 1000;
                }

                window.bets.logs.push({ action:'insert', comment: table_id + ', 1000' });
                $('#bet-view').text(JSON.stringify(window.bets.data, null, 4));
            });
        </script>
    </body>
</html>
