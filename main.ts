namespace SpriteKind {
    export const ball = SpriteKind.create()
}
sprites.onCreated(SpriteKind.ball, function (sprite) {
    sprite.vy = randint(-75, 75)
    sprite.vx = randint(-75, 75)
    sprite.setBounceOnWall(false)
})
sprites.onOverlap(SpriteKind.ball, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.setVelocity(sprite.vx * -1, sprite.vy * -1)
})
scene.setBackgroundColor(15)
let player1 = sprites.create(assets.image`p1paddle`, SpriteKind.Player)
let player2 = sprites.create(assets.image`p2paddle`, SpriteKind.Player)
controller.player1.moveSprite(player1, 0, 100)
controller.player2.moveSprite(player2, 0, 100)
player1.x = 0
player2.x = 160
player1.setStayInScreen(true)
player2.setStayInScreen(true)
let ball = sprites.create(assets.image`ball`, SpriteKind.ball)
info.player1.setScore(0)
info.player2.setScore(0)
game.onUpdate(function () {
    if (ball.y <= 0) {
        ball.setVelocity(ball.vx, ball.vy * -1)
    } else if (ball.y >= scene.screenHeight()) {
        ball.setVelocity(ball.vx, ball.vy * -1)
    }
    if (ball.x <= 0) {
        ball.destroy()
        info.player2.changeScoreBy(1)
        ball = sprites.create(assets.image`ball`, SpriteKind.ball)
    } else if (ball.x >= scene.screenWidth()) {
        ball.destroy()
        info.player1.changeScoreBy(1)
        ball = sprites.create(assets.image`ball`, SpriteKind.ball)
    }
})
