const submitElem = document.getElementById("submitFormButton");

submitElem.addEventListener("click", function(){
    const scoreElem = document.getElementById("submitFormScore");
    const el = document.createElement("p");
    el.id = "message"
    
    // 点数チェック
    const checkScore =(score)=>{
        if (score === ""){
            return "点数が未入力です";
        }

        if (0 > score || 100 < score) {
            return "0-100の英数字を入力してください";
        }

        if (90 <= score) {
            return "あなたの成績は秀です";
        }else if (80 <= score) {
            return "あなたの成績は優です";
        }else if (70 <= score) {
            return "あなたの成績は良です";
        }else if (60 <= score) {
            return "あなたの成績は可です";
        }else if (59 >= score) {
            return "あなたの成績は不可です";
        }
    };

    const text = document.createTextNode(
        checkScore(scoreElem.value)
    );

    // メッセージ表示
    const form = document.getElementById("form");
    if (document.getElementById("message")) {
        form.removeChild(document.getElementById("message"));
    }
    form.appendChild(el).appendChild(text);

}, false);
