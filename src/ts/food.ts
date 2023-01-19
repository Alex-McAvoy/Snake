//食物类
class Food {
    element: HTMLElement; //食物对应元素

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.element = document.getElementById("food")!;
    }

    //获取食物x轴坐标
    get X() {
        return this.element.offsetLeft;
    }

    //获取食物y轴坐标
    get Y() {
        return this.element.offsetTop;
    }

    //修改食物位置
    change() {
        //生成随机位置，食物位置范围0~290，要求%10=0
        const top = Math.round(Math.random() * 29) * 10;
        const left = Math.round(Math.random() * 29) * 10;

        this.element.style.left = left + "px";
        this.element.style.top = top + "px";
    }
}

export default Food;