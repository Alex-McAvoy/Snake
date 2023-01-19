import Food from './Food';
import ScorePanel from './ScorePanel';
import Snake from './Snake';

//控制器类
class GameControl {
    //食物
    food: Food;
    //记分牌
    scorePanel: ScorePanel;
    //蛇
    snake: Snake;
    //蛇的移动方向
    direction = "ArrowRight";
    //记录蛇是否存活
    isLive = true;

    constructor() {
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        this.snake = new Snake();

        this.init();
    }

    //初始化方法
    init() {
        //绑定键盘按下事件
        document.addEventListener("keydown", this.keydownHandler.bind(this));
        //调用run()方法，使蛇移动
        this.run();
    }

    //键盘按下事件响应函数
    keydownHandler(event: KeyboardEvent) {
        this.direction = event.key;
    }

    //蛇移动方法
    run() {
        let X = this.snake.X;
        let Y = this.snake.Y;
        const direction = this.direction;

        //上移，top减少
        if (direction == "ArrowUp" || direction == "Up" || direction == "w") {
            Y -= 10;
        }
        //下移，top增加
        if (direction == "ArrowDown" || direction == "Down" || direction == "s") {
            Y += 10;
        }
        //左移，left减少
        if (direction == "ArrowLeft" || direction == "Left" || direction == "a") {
            X -= 10;
        }
        //右移，left增加
        if (direction == "ArrowRight" || direction == "Right" || direction == "d") {
            X += 10;
        }

        //蛇吃到食物
        this.checkEat(X, Y);

        //修改蛇的X与Y值
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            alert(e.message + "\nGame Over!");
            this.isLive = false;
        }

        //蛇存活时，开启定时调用
        if (this.isLive) {
            setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
        }
    }

    //检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X == this.food.X && Y == this.food.Y) {
            //食物位置重置
            this.food.change();
            //分数增加
            this.scorePanel.addScore();
            //蛇增加一节
            this.snake.addBody();
        }
    }


}

export default GameControl;