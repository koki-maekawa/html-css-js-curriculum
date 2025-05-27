const PostCode = class {
    async setPostCode(postCodeNum){
        const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postCodeNum}&limit=1`);

        if(!res.ok){
          throw new Error('非同期処理に失敗しました。');
        }  
        const resData = await res.json();
        this.prefecture = resData.results[0].address1;
        this.wardOrCity = resData.results[0].address2;
        this.address = resData.results[0].address3;
    };

    getPrefecture(){
        return this.prefecture;
    };

    getWardOrCity(){
        return this.wardOrCity;
    };

    getAddress(){
        return this.address;
    }
}

const postCodeSearchElem = document.getElementById("postCodeSearch");
postCodeSearchElem.addEventListener("click", function(){
    //　既存エラーメッセージ削除
    const errorMessageElems = document.getElementsByClassName("searchErrorMessage")
    for (let i = errorMessageElems.length - 1; i >= 0; i--) {
        errorMessageElems[i].remove();
    }

    // 郵便番号が7桁ハイフンなしか確認
    const postCodeValue = document.getElementById("postCodeInput").value;
    const postCodeReg = /\d{7}/;
    if(!postCodeReg.exec(postCodeValue)){
        const errorMessage = document.createTextNode("郵便番号を7桁ハイフンなしで入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "searchErrorMessage"
        const postCodeFormElem = document.getElementById("postCodeForm");
        postCodeFormElem.appendChild(el).appendChild(errorMessage);
    }else{
        // 郵便番号を元に住所を自動入力
        const postCode = new PostCode();
        postCode.setPostCode(postCodeValue).then(() => {
            document.getElementById("prefectureInput").value = postCode.getPrefecture();
            document.getElementById("wardOrCityInput").value = postCode.getWardOrCity();
            document.getElementById("addressInput").value = postCode.getAddress();
        }).catch((e) => alert(e));
    }
}, false);

const formButtonElem = document.getElementById("formButton");
formButtonElem.addEventListener("click", function(){
    const nameValue = document.getElementById("nameInput").value;
    const userNameValue = document.getElementById("userNameInput").value;
    const emailValue = document.getElementById("emailInput").value;
    const passwordValue = document.getElementById("passwordInput").value;
    const confirmPasswordValue = document.getElementById("confirmPasswordInput").value;
    const postCodeValue = document.getElementById("postCodeInput").value;
    const prefectureValue = document.getElementById("prefectureInput").value;
    const wardOrCityValue = document.getElementById("wardOrCityInput").value;
    const addressValue = document.getElementById("addressInput").value;

    //　既存エラーメッセージ削除
    const errorMessageElems = document.getElementsByClassName("errorMessage")
    for (let i = errorMessageElems.length - 1; i >= 0; i--) {
        errorMessageElems[i].remove();
    }

    // 必須チェック
    if(nameValue === ""){
        const errorMessage = document.createTextNode("名前を入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const nameFormElem = document.getElementById("nameForm");
        nameFormElem.appendChild(el).appendChild(errorMessage);
    }
    if(userNameValue === ""){
        const errorMessage = document.createTextNode("ユーザーネームを入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const userNameFormElem = document.getElementById("userNameForm");
        userNameFormElem.appendChild(el).appendChild(errorMessage);
    }
    if(emailValue === ""){
        const errorMessage = document.createTextNode("メールアドレスを入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const emailFormElem = document.getElementById("emailForm");
        emailFormElem.appendChild(el).appendChild(errorMessage);
    }
    if(passwordValue === ""){
        const errorMessage = document.createTextNode("パスワードを入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const passwordFormElem = document.getElementById("passwordForm");
        passwordFormElem.appendChild(el).appendChild(errorMessage);
    }
    if(confirmPasswordValue === ""){
        const errorMessage = document.createTextNode("パスワード確認を入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const confirmPasswordFormElem = document.getElementById("confirmPasswordForm");
        confirmPasswordFormElem.appendChild(el).appendChild(errorMessage);
    }
    if(postCodeValue === ""){
        const errorMessage = document.createTextNode("郵便番号を入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const postCodeFormElem = document.getElementById("postCodeForm");
        postCodeFormElem.appendChild(el).appendChild(errorMessage);
    }
    if(prefectureValue === ""){
        const errorMessage = document.createTextNode("都道府県を入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const addressFormElem = document.getElementById("addressForm");
        addressFormElem.appendChild(el).appendChild(errorMessage);
    }
    if(wardOrCityValue === ""){
        const errorMessage = document.createTextNode("区 or 市を入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const addressFormElem = document.getElementById("addressForm");
        addressFormElem.appendChild(el).appendChild(errorMessage);
    }
    if(addressValue === ""){
        const errorMessage = document.createTextNode("番地を入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const addressFormElem = document.getElementById("addressForm");
        addressFormElem.appendChild(el).appendChild(errorMessage);
    }

    // パスワードとパスワード確認の入力値が一致するか確認
    if(passwordValue !== confirmPasswordValue){
        const errorMessage = document.createTextNode("パスワードとパスワード確認の入力値を一致させてください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const passwordFormElem = document.getElementById("passwordForm");
        passwordFormElem.appendChild(el).appendChild(errorMessage);
    }

    // 郵便番号が7桁ハイフンなしか確認
    const postCodeReg = /\d{7}/;
    if(!postCodeReg.exec(postCodeValue)){
        const errorMessage = document.createTextNode("郵便番号を7桁ハイフンなしで入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const postCodeFormElem = document.getElementById("postCodeForm");
        postCodeFormElem.appendChild(el).appendChild(errorMessage);
    }
    
    // 正しいメールアドレスの形式になっているか確認
    const emailReg = /^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i;
    if(!emailReg.exec(emailValue)){
        const errorMessage = document.createTextNode("メールアドレスを正しい形式で入力してください");
        const el = document.createElement("p");
        el.style = "color: red;"
        el.className = "errorMessage"
        const emailFormElem = document.getElementById("emailForm");
        emailFormElem.appendChild(el).appendChild(errorMessage);
    }
}, false);
