const readline = require('readline');
const fs = require('fs');
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// const rl = readline.createInterface({
//     input: fs.createReadStream(path.resolve(__dirname, ".main.js/in.txt")),
// });


let input = [];

rl.on('line', (line) => {
    input.push(line);
}).on('close', () => {

    let line = input.shift().split(' ');

    let a = line.shift().split('').reverse();
    let b = line.shift().split('').reverse();

    let size = a.length > b.length ? a.length : b.length;

    let add = 0;
    let result = '';
    for(let i = 0; i < size; i++){
        let inA = 0;
        let inB = 0;
        if(i < a.length){
            inA = parseInt(a[i]);
        }
        if(i < b.length){
            inB = parseInt(b[i]);
        }
        // console.log(inA, inB);
        ans = inA + inB + add;
        // console.log(ans);

        if(ans >= 10){
            ans -= 10;
            add = 1;
        }else{
            add = 0;
        }
        result += ans.toString();
    }

    if(add !== 0){
        result += add.toString();
    }

    console.log(result.split('').reverse().join(''));



    process.exit();
});