const participant =[
    {name:'taro',age:15,address:'東京都千代田区'},
    {name:'hanako',age:18,address:'東京都杉並区'},
    {name:'john',age:25,address:'東京都渋谷区'},
    {name:'mac',age:30,address:'東京都新宿区'},
    {name:'post',age:40,address:'東京都足立区'},
    {name:'malone',age:28,address:'東京都品川区'},
    {name:'lil',age:34,address:'広島県広島市'},
    {name:'peep',age:33,address:'埼玉県大宮'},
    {name:'curt',age:29,address:'北海道札幌市'},
];

const listElem = document.getElementById("paticipantList");
const tableElem = document.getElementById("paticipantTable");
const submitElem = document.getElementById("paticipantButton");

submitElem.addEventListener("click", function() {
    for (let i = 0; i < participant.length; i++) {
        const trElem = document.createElement("tr");
        const numberTdElem = document.createElement("td");
        numberTdElem.className = "number-td"
        const nameTdElem = document.createElement("td");
        const ageTdElem = document.createElement("td");
        const addressTdElem = document.createElement("td");
        
        const numberText = document.createTextNode(`${i + 1}`);
        tableElem.appendChild(trElem).appendChild(numberTdElem).appendChild(numberText);
        
        const nameText = document.createTextNode(participant[i].name);
        tableElem.appendChild(trElem).appendChild(nameTdElem).appendChild(nameText);
        
        const ageText = document.createTextNode(participant[i].age);
        tableElem.appendChild(trElem).appendChild(ageTdElem).appendChild(ageText);
        
        const addressText = document.createTextNode(participant[i].address);
        tableElem.appendChild(trElem).appendChild(addressTdElem).appendChild(addressText);
        
    }
    listElem.removeChild(submitElem);
}, false);
