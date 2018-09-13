<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
</head>
<body>

<select id="game-selector">
    <option value=""></option>
</select>
<script>
    window.kaga = <?php echo $kaga ?>;

    var gameSelector = document.getElementById('game-selector');
    var fragment = document.createDocumentFragment();

    for(var i = 0; i < kaga.games.length; i++) {
        var option = document.createElement('option');
        option.text = kaga.games[i].gameName;
        option.value  = kaga.gameLaunchURL + '?g=' + kaga.games[i].gameId + '&p=BLUEFROG';
        fragment.appendChild(option);
    }

    gameSelector.appendChild(fragment);

    document.addEventListener('DOMContentLoaded',function() {
        gameSelector.onchange = function () {
            $.post('/kaga/token', {}, function (response) {
                var url = gameSelector.value;
                url += '&t=' + response.payload + '&u=<?php echo app('auth')->user()->user_id ?>';
                url += '&ak=' + response.access + '&cr=USD';

                window.open(url,'newwindow', 'height=670,width=1400,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no');
            });
        };
    },false);

</script>
</body>
</html>
