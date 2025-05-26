const DogImage = class {
    async setDogImage(){
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
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
    const imgElem = document.createElement("img");
    const dogImage = new DogImage();

    dogImage.setDogImage().then((dogURL) => {
        imgElem.src = dogImage.getDogImage();
        imgElem.id = "dogImage";
        imgElem.style = "width: 500px; height: 500px;"

        // 画像表示
        if (document.getElementById("dogImage")) {
            dogListElem.removeChild(document.getElementById("dogImage"));
        }
        dogListElem.appendChild(imgElem);
      })
      .catch((e) => alert(e));
}, false);
