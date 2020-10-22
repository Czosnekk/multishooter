input.onButtonPressed(Button.AB, function () {
    missile = game.createSprite(player.get(LedSpriteProperty.X), player.get(LedSpriteProperty.Y))
    while (missile.get(LedSpriteProperty.Y) > 0) {
        missile.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
    }
    missile.set(LedSpriteProperty.Brightness, 0)
    radio.sendValue("missilex", missile.get(LedSpriteProperty.X))
})
radio.onReceivedValue(function (name, value) {
    // position of missile on the other players microbit. Mirror view
    switchxposition = Math.abs(value - 4)
    if (name == "missilex") {
        opponentmissile = game.createSprite(switchxposition, 0)
        basic.pause(100)
        while (opponentmissile.get(LedSpriteProperty.Y) < 4) {
            opponentmissile.change(LedSpriteProperty.Y, 1)
            if (opponentmissile.isTouching(player)) {
                radio.sendValue("point", 1)
                basic.showNumber(game.score())
                basic.pause(2000)
            } else {
                basic.pause(100)
            }
        }
        opponentmissile.set(LedSpriteProperty.Brightness, 0)
    }
    if (name == "obstacle") {
        opponentmissile.set(LedSpriteProperty.Brightness, 0)
    }
    if (name == "point") {
        game.addScore(1)
        basic.pause(100)
        basic.showNumber(game.score())
    }
})
let obstacles: game.LedSprite = null
let opponentmissile: game.LedSprite = null
let switchxposition = 0
let missile: game.LedSprite = null
let player: game.LedSprite = null
// i set the group of the I set the signal for the multiplayer
radio.setGroup(1)
// I set the player position
player = game.createSprite(2, 4)
// setting up controls for the player. Tilting microbit makes the player move
basic.forever(function () {
    if (input.isGesture(Gesture.TiltRight)) {
        player.change(LedSpriteProperty.X, 1)
    } else if (input.isGesture(Gesture.TiltLeft)) {
        player.change(LedSpriteProperty.X, -1)
    }
    if (game.score() >= 5) {
        obstacles = game.createSprite(4, 1)
        obstacles = game.createSprite(0, 1)
    }
})
