<html>
    <head>
    </head>
    <body>
        <div id="app">
            <table>
                <thead>
                    <tr>
                        <th style="text-align: left">Game Name</th>
                        <th>Play?</th>
                    </tr>
                </thead>
                <tbody v-for="group in groups">
                    <tr style="background: black; color: white; text-align: center">
                        <td colspan="2">
                            @{{ group.id }}
                        </td>
                    </tr>
                    <tr v-for="game in group.games">
                        <td>@{{ game.name }}</td>
                        <td><button :disabled="disable" @click="play(game)">Play</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <script src="/dist/reel.min.js"></script>
    </body>
</html>
