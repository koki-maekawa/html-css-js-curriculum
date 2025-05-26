const DogImage = class {
    async setDogImage(num){
        if(num === ""){
          throw new Error('犬画像数が未入力です。');
        }
  
        const res = await fetch(`https://dog.ceo/api/breeds/image/random/${num}`);

        if(!res.ok){
          throw new Error('非同期処理に失敗しました。');
        }  
        const resData = await res.json();
        this.dogURL = resData.message;
    };    
    
    getDogImage(){
        return this.dogURL;
    }
}

const dogButtonElem = document.getElementById("dogButton");

dogButtonElem.addEventListener("click", function(){
    const dogListElem = document.getElementById("dogList");
    const dogImage = new DogImage();
    const dogImageCount = document.getElementById("dogNumber").value;

    dogImage.setDogImage(dogImageCount).then(() => {
        const dogURL = dogImage.getDogImage();

        // 画像表示
        dogListElem.innerHTML = "";
        for(let i = 0; i < dogImageCount; i++){
            const imgElem = document.createElement("img");
            imgElem.src = dogURL[i];
            imgElem.className = "dogImage";
            imgElem.style = "width: 500px; height: 500px;"
            dogListElem.appendChild(imgElem);
        }
    }).catch((e) => alert(e));
}, false);
