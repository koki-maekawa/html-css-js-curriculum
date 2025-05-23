const submitElem = document.getElementById("submitFormButton");

submitElem.addEventListener("click", function(){
    const nameElem = document.getElementById("submitFormName");
    const contentElem = document.getElementById("submitFormContent");
    let errorMessage = []
    let text = ""
    const successMessage = "投稿しました"
    const el = document.createElement("p");
    el.id = "message"

    // エラーチェック
    if (nameElem.value === "") {
        errorMessage.push("名前が未入力です")
    }
    if (contentElem.value === "") {
        errorMessage.push("お問い合わせ内容が未入力です")
    }

    // メッセージ表示
    if (errorMessage.length === 0) {
        text = document.createTextNode(successMessage);
    } else {
        text = document.createTextNode(errorMessage);
    }
    const form = document.getElementById("form");
    if (document.getElementById("message")) {
        form.removeChild(document.getElementById("message"));
    }
    form.appendChild(el).appendChild(text);

}, false);
