const JSONPlaceholder = class {
    async post(title, content){
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if(!res.ok){
            throw new Error('非同期処理に失敗しました。');
        }
        return res;
    };
    
    async put(title, content, id){
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                id: id,
                title: title,
                content: content,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        if(!res.ok){
            throw new Error('非同期処理に失敗しました。');
        }
        return res;
    };
    
    async delete(id){
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        })
        if(!res.ok){
            throw new Error('非同期処理に失敗しました。');
        }
        return res;
    };
}

// JSONPlaceholderインスタンス化
const api = new JSONPlaceholder();

// 新規投稿フォーム
const titleInputElem = document.getElementById("titleInput");
const contentInputElem = document.getElementById("contentInput");
const formButtonElem = document.getElementById("formButton");

// 投稿済みの記事一覧
const postIndexElem = document.getElementById("postIndex")

// 投稿済みの記事一覧(一覧表示時)
const postIndexTitleParagraphElem = document.getElementById("postIndexTitleParagraph");
const postIndexContentParagraphElem = document.getElementById("postIndexContentParagraph");
const postIndexIdParagraphElem = document.getElementById("postIndexIdParagraph");
const updateButtonElem = document.getElementById("updateButton");
const deleteButtonElem = document.getElementById("deleteButton");

// 投稿済みの記事一覧(編集時)
const updateTitleInputElem = document.getElementById("updateTitleInput");
const updateContentInputElem = document.getElementById("updateContentInput");
const updateIdInputElem = document.getElementById("updateIdInput");
const updateSubmitButtonElem = document.getElementById("updateSubmitButton");
const cancelButtonElem = document.getElementById("cancelButton");

// モーダル(編集確認)
const modalUpdateElem = document.getElementById("modalUpdate")
const modalUpdateTitleElem = document.getElementById("modalUpdateTitle")
const modalUpdateContentElem = document.getElementById("modalUpdateContent")
const modalUpdateIdElem = document.getElementById("modalUpdateId")
const modalUpdateButtonElem = document.getElementById("modalUpdateButton");
const modalUpdateCloseElem = document.getElementById("modalUpdateClose")

// モーダル(削除確認)
const modalDeleteElem = document.getElementById("modalDelete")
const modalDeleteTitleElem = document.getElementById("modalDeleteTitle")
const modalDeleteContentElem = document.getElementById("modalDeleteContent")
const modalDeleteIdElem = document.getElementById("modalDeleteId")
const modalDeleteButtonElem = document.getElementById("modalDeleteButton");
const modalDeleteCloseElem = document.getElementById("modalDeleteClose")

// 新規投稿バリデーション
titleInputElem.addEventListener("change", function(){
    if(titleInputElem.value !== "" && contentInputElem.value !== "" && postIndexElem.className !== "post-index"){
        formButtonElem.disabled = false;
    }else{
        formButtonElem.disabled = true;
    }
}, false);
contentInputElem.addEventListener("change", function(){
    if(titleInputElem.value !== "" && contentInputElem.value !== "" && postIndexElem.className !== "post-index"){
        formButtonElem.disabled = false;
    }else{
        formButtonElem.disabled = true;
    }
}, false);

// 更新バリデーション
updateTitleInputElem.addEventListener("change", function(){
    if(updateTitleInputElem.value !== "" && updateContentInputElem.value !== ""){
        updateSubmitButtonElem.disabled = false;
    }else{
        updateSubmitButtonElem.disabled = true;
    }
}, false);
updateContentInputElem.addEventListener("change", function(){
    if(updateTitleInputElem.value !== "" && updateContentInputElem.value !== ""){
        updateSubmitButtonElem.disabled = false;
    }else{
        updateSubmitButtonElem.disabled = true;
    }
}, false);

// 新規投稿
formButtonElem.addEventListener("click", function(){
    api.post(titleInputElem.value, contentInputElem.value).then((response) => response.json()).then((postValue) => {
        // 新規投稿フォーム初期化
        titleInputElem.value = ""
        contentInputElem.value = ""
        formButtonElem.disabled = true;

        // 投稿内容表示
        postIndexElem.classList.remove("hidden");
        postIndexTitleParagraphElem.innerHTML = postValue.title;
        postIndexContentParagraphElem.innerHTML = postValue.content;
        postIndexIdParagraphElem.innerHTML = postValue.id;
    }).catch((e) => console.log(e));
}, false);

// 編集モード開始
updateButtonElem.addEventListener("click", function(){
    // 編集フォーム表示
    updateTitleInputElem.classList.remove("hidden");
    updateContentInputElem.classList.remove("hidden");
    updateIdInputElem.classList.remove("hidden");
    updateSubmitButtonElem.classList.remove("hidden");
    cancelButtonElem.classList.remove("hidden");

    // 投稿済み内容を編集フォームに代入
    updateTitleInputElem.value = postIndexTitleParagraphElem.innerHTML;
    updateContentInputElem.value = postIndexContentParagraphElem.innerHTML;
    updateIdInputElem.value = postIndexIdParagraphElem.innerHTML;

    // 記事一覧を非表示
    updateButtonElem.classList.add("hidden");
    deleteButtonElem.classList.add("hidden");
    postIndexTitleParagraphElem.classList.add("hidden");
    postIndexContentParagraphElem.classList.add("hidden");
    postIndexIdParagraphElem.classList.add("hidden");
}, false);

// 編集モード解除
cancelButtonElem.addEventListener("click", function(){
    // 記事一覧を表示
    postIndexTitleParagraphElem.classList.remove("hidden");
    postIndexContentParagraphElem.classList.remove("hidden");
    postIndexIdParagraphElem.classList.remove("hidden");
    updateButtonElem.classList.remove("hidden");
    deleteButtonElem.classList.remove("hidden");

    // 編集フォーム非表示
    updateTitleInputElem.classList.add("hidden");
    updateContentInputElem.classList.add("hidden");
    updateIdInputElem.classList.add("hidden");
    updateSubmitButtonElem.classList.add("hidden");
    cancelButtonElem.classList.add("hidden");
}, false);

// 編集(モーダル表示)
updateSubmitButtonElem.addEventListener("click", function(){
    modalUpdateElem.classList.add('is-active');
    modalUpdateTitleElem.innerHTML = updateTitleInputElem.value;
    modalUpdateContentElem.innerHTML = updateContentInputElem.value;
    modalUpdateIdElem.innerHTML = updateIdInputElem.value;
}, false);

// 編集(モーダル削除)
modalUpdateCloseElem.addEventListener("click", function(){
    modalUpdateElem.classList.remove('is-active');
}, false);

// 編集(モーダル承認)
modalUpdateButtonElem.addEventListener("click", function(){
    api.put(updateTitleInputElem.value, updateContentInputElem.value, updateIdInputElem.value).then((response) => response.json()).then((updateValue) => {
        // モーダル削除
        modalUpdateElem.classList.remove('is-active');
       
        // 編集内容を表示
        postIndexTitleParagraphElem.innerHTML = updateValue.title;
        postIndexContentParagraphElem.innerHTML = updateValue.content;
        postIndexIdParagraphElem.innerHTML = updateValue.id;
        postIndexTitleParagraphElem.classList.remove("hidden");
        postIndexContentParagraphElem.classList.remove("hidden");
        postIndexIdParagraphElem.classList.remove("hidden");
        updateButtonElem.classList.remove("hidden");
        deleteButtonElem.classList.remove("hidden");

        // 編集フォーム初期化
        updateTitleInputElem.value = "";
        updateContentInputElem.value = "";
        updateIdInputElem.value = "";

        // 編集フォーム非表示
        updateTitleInputElem.classList.add("hidden");
        updateContentInputElem.classList.add("hidden");
        updateIdInputElem.classList.add("hidden");
        updateSubmitButtonElem.classList.add("hidden");
        cancelButtonElem.classList.add("hidden");
    }).catch((e) => console.log(e));
}, false);


// 削除(モーダル表示)
deleteButtonElem.addEventListener("click", function(){
    modalDeleteElem.classList.add('is-active');
    modalDeleteTitleElem.innerHTML = postIndexTitleParagraphElem.innerHTML
    modalDeleteContentElem.innerHTML = postIndexContentParagraphElem.innerHTML
    modalDeleteIdElem.innerHTML = postIndexIdParagraphElem.innerHTML
}, false);

// 削除(モーダル削除)
modalDeleteCloseElem.addEventListener("click", function(){
    modalDeleteElem.classList.remove('is-active');
}, false);

// 削除(モーダル承認)
modalDeleteButtonElem.addEventListener("click", function(){
    api.delete(postIndexIdParagraphElem.innerHTML).then((response) => response.json()).then(() => {
        // モーダル削除
        modalDeleteElem.classList.remove('is-active');
    
        // 投稿済み記事一覧初期化
        postIndexTitleParagraphElem.innerHTML = "";
        postIndexContentParagraphElem.innerHTML = "";
        postIndexIdParagraphElem.innerHTML = "";

        // 投稿済み記事一覧非表示
        postIndexElem.classList.add("hidden");
    }).catch((e) => console.log(e));
}, false);
