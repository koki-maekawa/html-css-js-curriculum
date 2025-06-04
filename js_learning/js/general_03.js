const BlackJack = class {
    constructor() {
        this.cards = [
            "club_1", "club_2", "club_3", "club_4", "club_5", "club_6", "club_7", "club_8", "club_9", "club_10", "club_11", "club_12", "club_13",
            "diamond_1", "diamond_2", "diamond_3", "diamond_4", "diamond_5", "diamond_6", "diamond_7", "diamond_8", "diamond_9", "diamond_10", "diamond_11", "diamond_12", "diamond_13",
            "heart_1", "heart_2", "heart_3", "heart_4", "heart_5", "heart_6", "heart_7", "heart_8", "heart_9", "heart_10", "heart_11", "heart_12", "heart_13",
            "spade_1", "spade_2", "spade_3", "spade_4", "spade_5", "spade_6", "spade_7", "spade_8", "spade_9", "spade_10", "spade_11", "spade_12", "spade_13",
        ];
        this.opponentCards = [];
        this.myCards = [];
        this.opponentSum = 0;
        this.mySum = 0;
    }

    myCardPush() {
        const pushCard = this.cards[Math.floor(Math.random() * this.cards.length)];
        this.myCards.push(pushCard);
        this.mySum += this.checkCardPoint(pushCard);
        this.cards = this.cards.filter(f => f !== pushCard);

        // 追加カード表示
        const img = document.createElement("img");
        img.src = `../css/assets/${blackjack.myCards[blackjack.myCards.length - 1]}.png`;
        img.className = "card";
        myCardsElem.appendChild(img);
    }
    
    opponentCardPush() {
        const pushCard = this.cards[Math.floor(Math.random() * this.cards.length)];
        this.opponentCards.push(pushCard);
        this.opponentSum += this.checkCardPoint(pushCard);
        this.cards = this.cards.filter(f => f !== pushCard);

        // 追加カード表示
        const img = document.createElement("img");
        img.src = `../css/assets/${blackjack.opponentCards[blackjack.opponentCards.length - 1]}.png`;
        img.className = "card";
        opponentCardsElem.appendChild(img);
    }
    
    under21OpponentCardPush() {
        var pushCard = "";
        for(let i = 0; i < this.cards.length; i++) {
            pushCard = this.cards[Math.floor(Math.random() * this.cards.length)];
            var pushCardNumber = this.checkCardPoint(pushCard);
            if(21 >= pushCardNumber + this.opponentSum){
                break;
            }
        }
        this.opponentCards.push(pushCard);
        this.opponentSum += this.checkCardPoint(pushCard);
        this.cards = this.cards.filter(f => f !== pushCard);

       // 追加カード表示
       const img = document.createElement("img");
       img.src = `../css/assets/${blackjack.opponentCards[blackjack.opponentCards.length - 1]}.png`;
       img.className = "card";
       opponentCardsElem.appendChild(img);
    }

    gameStart() {
        this.myCardPush();
        this.myCardPush();
        this.opponentCardPush();
        this.under21OpponentCardPush();
    }

    gameJudge(opponentSum, mySum) {
        var gameJudge = {};
        if(21 < mySum){
            gameJudge.mine = "負け"
            gameJudge.opponent = "勝ち"
        }else if(mySum === opponentSum) {
            gameJudge.mine = "引き分け"
            gameJudge.opponent = "引き分け"
        }else if(mySum > opponentSum) {
            gameJudge.mine = "勝ち"
            gameJudge.opponent = "負け"
        }else {
            gameJudge.mine = "負け"
            gameJudge.opponent = "勝ち"
        }

        // 勝敗結果表示
        const opponentParagraph = document.createElement("p");
        opponentParagraph.id = "opponentParagraph"
        opponentParagraph.textContent = gameJudge.opponent;
        const myParagraph = document.createElement("p");
        myParagraph.id = "myParagraph"
        myParagraph.textContent = gameJudge.mine;
        opponentAreaElem.appendChild(opponentParagraph);
        myAreaElem.appendChild(myParagraph);
    }

    // 所持カードポイントの合計値確認
    checkCardPoint(card) {
        var num = Number(card.replace(/[^0-9]/g, ""));
        switch(num) {
            case 1:
                num = 11;
                break;
            case 11:
                num = 10;
                break;
            case 12:
                num = 10;
                break;
            case 13:
                num = 10;
                break;
        }
        return num;
    }
}

let blackjack = new BlackJack();

// 相手手札エリア
const opponentAreaElem = document.getElementById("opponentArea")
const opponentCardsElem = document.getElementById("opponentCards")
const opponentSumElem = document.getElementById("opponentSum")

// スタート・リセットエリア
const gameStartButtonElem = document.getElementById("gameStartButton")
const gameResetButtonElem = document.getElementById("gameResetButton")

// 自分手札エリア
const myAreaElem = document.getElementById("myArea")
const myCardsElem = document.getElementById("myCards")
const mySumElem = document.getElementById("mySum")
const addMyCardButtonElem = document.getElementById("addMyCardButton")
const noAddMyCardButtonElem = document.getElementById("noAddMyCardButton")

// ゲームスタート
gameStartButtonElem.addEventListener("click", function(){
    blackjack.gameStart();
    
    opponentSumElem.innerHTML = blackjack.opponentSum;
    mySumElem.innerHTML = blackjack.mySum;
    
    if(21 === blackjack.mySum) {
        blackjack.gameJudge(blackjack.opponentSum, blackjack.mySum);
    }else {
        gameStartButtonElem.disabled = true;
        addMyCardButtonElem.disabled = false;
        noAddMyCardButtonElem.disabled = false;
    }
}, false);

// ゲームリセット
gameResetButtonElem.addEventListener("click", function(){
    blackjack = new BlackJack();
    
    opponentCardsElem.innerHTML = "";
    myCardsElem.innerHTML = "";
    
    opponentSumElem.innerHTML = 0;
    mySumElem.innerHTML = 0;
    
    gameStartButtonElem.disabled = false;
    addMyCardButtonElem.disabled = true;
    noAddMyCardButtonElem.disabled = true;

    const myParagraphElem = document.getElementById("myParagraph")
    const opponentParagraphElem = document.getElementById("opponentParagraph")
    if (opponentParagraphElem) {
        opponentParagraphElem.remove();
    }
    
    if (myParagraphElem) {
        myParagraphElem.remove();
    }
}, false);

// 自分手札追加
addMyCardButtonElem.addEventListener("click", function(){
    // 相手手札追加条件
    if(blackjack.opponentSum < blackjack.mySum) {
        blackjack.under21OpponentCardPush();
    }else if(16 >= blackjack.opponentSum) {
        blackjack.under21OpponentCardPush();
    }
    
    // 自分手札追加
    blackjack.myCardPush();

    opponentSumElem.innerHTML = blackjack.opponentSum;
    mySumElem.innerHTML = blackjack.mySum;
    
    addMyCardButtonElem.disabled = true;
    noAddMyCardButtonElem.disabled = true;

    blackjack.gameJudge(blackjack.opponentSum, blackjack.mySum);
}, false);

// 自分手札追加しない
noAddMyCardButtonElem.addEventListener("click", function(){
    // 相手手札追加条件
    if(blackjack.opponentSum < blackjack.mySum) {
        blackjack.under21OpponentCardPush();
    }else if(16 >= blackjack.opponentSum) {
        blackjack.under21OpponentCardPush();
    }

    opponentSumElem.innerHTML = blackjack.opponentSum;
    
    addMyCardButtonElem.disabled = true;
    noAddMyCardButtonElem.disabled = true;
    
    blackjack.gameJudge(blackjack.opponentSum, blackjack.mySum);
}, false);
