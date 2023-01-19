//记分牌类
class ScorePanel {
    score = 0;
    level = 1;

    maxLevel: number;
    upScore: number;

    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    constructor(maxLevel = 10, upScore = 10) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.scoreEle = document.getElementById("score")!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.levelEle = document.getElementById("level")!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    //加分
    addScore() {
        this.score++;
        this.scoreEle.innerHTML = this.score + "";

        if (this.score % this.upScore == 0) {
            this.levelUp();
        }
    }

    //提升等级
    levelUp() {
        if (this.level < this.maxLevel) {
            this.level++;
            this.levelEle.innerHTML = this.level + "";
        }
    }
}

export default ScorePanel;