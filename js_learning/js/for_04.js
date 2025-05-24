const participant =[{name:'taro',age:20},{name:'hanako',age:15},{name:'john',age:25}]

const checkAge =(participant)=>{
    let i = 0;
    while (i < participant.length){
        if (18 >= participant[i].age) {
            console.log(`${participant[i].name}さんは18歳以上のため参加可能です`)
        }  else {
            console.log(`${participant[i].name}さんは18歳未満のため参加できません`)
        }
        i += 1;
    }
  };
 
 checkAge(participant);
