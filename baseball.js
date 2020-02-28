const arr = [...Array(10).keys()];

const ans = [];
for (let i = 0; i < 4; i++) {
    const r = Math.floor(Math.random() * arr.length);
    ans.push(arr.splice(r, 1)[0]);
    
}

let strike = 0;
let ball = 0;
let count = 0;
while (count++ < 10) {
    strike = 0;
    ball = 0;

    const input = prompt('숫자를 입력하세요');

    if(input === null) {
        console.log('종료되었습니다.');
        break;
    }

    const inputArr = input.split('');

    if(inputArr.length !== 4) {
        console.log('4자리수를 입력해야 합니다.');
        count--;
        continue;
    }


    const duplicateCheck = [...new Set(inputArr)];
    if(duplicateCheck.length !== 4) {
        console.log('중복된 숫자가 입력되었습니다.');
        count--;
        continue;
    }

    inputArr.map(function(num, idx) {
        const x = ans.indexOf(Number.parseInt(num));
        
        if(x === idx) {
            strike++;
        } else if (x !== -1) {
            ball++;
        }
    });

    if(strike === 4) {
        console.log('홈런!!! ' + count + '번 만에 맞추셨습니다.');
        break;
    } else {
        console.log(input + ' : ' + strike + ' 스트라이크 ' + ball + ' 볼');
    }
}