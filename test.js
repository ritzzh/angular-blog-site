const person = {
    name:'bob',
    key1:true,
    key2:false,
    key3:true,
}

const pearson = {
    name:"peopeo"
}

person = pearson

person.name="hehe";
person.key4 = true;

arr = [1,2,3,4,5,6,6]

arr.forEach(ele=>{
    console.log(ele);
})

for(const key in person){
    console.log(person[key]);
}

// for (const key in person ){
//     if(person[key])
//     {
//         person[key] = false;
//     }
//     console.log(person[key]);
// }