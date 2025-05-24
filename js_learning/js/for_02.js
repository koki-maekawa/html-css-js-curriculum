const multipleOfThree =()=>{
    let i = 0;
    while (100 > i) {
        if (i % 3 === 0) {
            console.log(`${i}:3の倍数です`);
        }
        i += 1;
    }; 
  };
 
  console.log(multipleOfThree());
