//蛇类
class Snake {
    //蛇头
    head: HTMLElement;
    //蛇身体，包括蛇头
    bodies: HTMLCollection;
    //蛇容器
    element: HTMLElement;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.element = document.getElementById("snake")!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.head = document.querySelector("#snake > div")!;
        this.bodies = this.element.getElementsByTagName("div");
    }

    //获取蛇头X坐标
    get X() {
        return this.head.offsetLeft;
    }

    //设置蛇头X坐标
    set X(value: number) {
        //若新值与旧值相同，不再修改
        if (this.X == value) {
            return;
        }

        //X值的合法范围0~290px，超出范围抛出异常
        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了");
        }

        //禁止蛇掉头，发生掉头后，让蛇向反方向继续移动
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft == value) {
            //新value大于旧X，说明向右走，应使蛇继续向左走，反之，令蛇继续向右走
            if (value > this.X) {
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }

        //移动身体
        this.moveBody();

        //修改蛇头X坐标
        this.head.style.left = value + "px";

        //检查是否撞到身体
        this.checkHeadBody();
    }

    //获取蛇头Y坐标
    get Y() {
        return this.head.offsetTop;
    }

    //设置蛇头Y坐标
    set Y(value: number) {
        //若新值与旧值相同，不再修改
        if (this.Y == value) {
            return;
        }

        //Y值的合法范围0~290px，超出范围抛出异常
        if (value < 0 || value > 290) {
            throw new Error("蛇撞墙了");
        }

        //禁止蛇掉头，发生掉头后，让蛇向反方向继续移动
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop == value) {
            //新value大于旧Y，说明向下走，应使蛇继续向上走，反之，令蛇继续向下走
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }

        //移动身体
        this.moveBody();

        //修改蛇头Y坐标
        this.head.style.top = value + "px";

        //检查是否撞到身体
        this.checkHeadBody();
    }

    //蛇增加身体
    addBody() {
        this.element.insertAdjacentHTML("beforeend", "<div></div>");
    }

    //蛇移动身体，将后面的身体位置设置为前面身体位置
    moveBody() {
        //从后向前遍历所有身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            //获取前面身体位置
            const X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            const Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            //更改后面身体位置
            (this.bodies[i] as HTMLElement).style.left = X + "px";
            (this.bodies[i] as HTMLElement).style.top = Y + "px";
        }
    }

    //检查蛇头与身体是否相撞
    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            const bd = this.bodies[i] as HTMLElement;
            //撞到身体，抛出异常
            if (this.X == bd.offsetLeft && this.Y == bd.offsetTop) {
                throw new Error("撞到自己了");
            }
        }
    }
}

export default Snake;