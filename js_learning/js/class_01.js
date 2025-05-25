const Character = class {
    constructor(name, rank){
        this.name = name
        this.rank = rank
    };
};

const Gacha = class {
    constructor(characters){
        this.characters = characters
        this.count = 1
    };

    resultMessage(){
        const character = this.characters[Math.floor(Math.random() * characters.length)];
        console.log("ガチャの結果は...");
        console.log(`ランク${character.rank}の${character.name}が当たりました！`);
    }

    countMessage(){
        console.log(`現在${this.count}回ガチャを引きました`);
        this.count += 1;
    }
};

const characters = [
    new Character("ゴブリン", "A"),
    new Character("スライム", "B"),
    new Character("ゴーレム", "C"),
];

const gacha = new Gacha(characters);

const gachaElem = document.getElementById("gachaButton");
gachaElem.addEventListener("click", function(){
    gacha.resultMessage();
    gacha.countMessage();
}, false);
