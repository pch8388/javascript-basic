class GamePanel {
    constructor() {
        this.setInitialValues();
        this.initPanel();
        this.registEvent();
    }

    setInitialValues() {
        this.hor = document.querySelector('#hor');
        this.ver = document.querySelector('#ver');
        this.bomb = document.querySelector('#bomb');
        this.table = document.querySelector('#table');
        this.timer = document.querySelector('#timer');
        this.tbody = this.table.querySelector('tbody');
    }

    initPanel() {
        document.querySelector('#exec').addEventListener('click', ({target}) => {
            
            this.gameStart = true;

            this.horizontal = Number.parseInt(this.hor.value);
            this.vertical = Number.parseInt(this.ver.value);
            this.bombNumber = Number.parseInt(this.bomb.value);

            this.dataSet = [];
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < this.vertical; i++) {
                const row = document.createElement('tr');
                const arr = [];
                for (let j = 0; j < this.horizontal; j++) {
                    const td = document.createElement('td');
                    td.classList.add('close');                    
                    row.appendChild(td);
                    arr.push(1);
                }
                this.dataSet.push(arr);
                fragment.appendChild(row);
            }

            const bombValue = this.createBomb();
            console.dir(bombValue);

            // 추후 삭제
            bombValue.forEach((val) => {
                const _tr = fragment.querySelectorAll('tr')[Math.floor(val / this.vertical)];
                _tr.querySelectorAll('td')[val % this.vertical].textContent = 'X';
            });

            console.dir(this.dataSet);
            this.tbody.innerHTML = '';
            this.tbody.appendChild(fragment);
        });
    }

    createBomb() {
        const bombValue = new Set();
        while (bombValue.size < this.bombNumber) {
            bombValue.add(Math.floor(Math.random() * (this.vertical * this.horizontal)));
        }
        this.setPanelBomb(bombValue);

        
        return bombValue;
    }

    setPanelBomb(bombValue) {
        bombValue.forEach((val) => {
            this.dataSet[Math.floor(val / this.vertical)][val % this.vertical] = 'X';
        });
    }

    registEvent() {
        this.tbody.addEventListener('click', ({target}) => {
            if (target.tagName.toLowerCase() !== 'td') return;
            
            const rowIdx = target.parentNode.rowIndex - 1;
            const cellIdx = target.cellIndex; 
            
            // TODO : x , y 좌표를 넘겨주면 주변 폭탄의 수를 계산해줄 메소드 추가
            this.pick(rowIdx, cellIdx);

            console.log(`${rowIdx} : ${cellIdx}`);
        });

        this.tbody.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const target = e.target;
            if(target.tagName.toLowerCase() != 'td') return;

            //TODO : 우클릭 시 이미 열려 있거나 check 되 있는 대상은 무시

            const len = this.tbody.querySelectorAll('.check').length;
            if (len == this.bombNumber) {
                this.findAllBomb();
            }

            if (len > this.bombNumber) {
                return;
            }

            target.classList.remove('close');
            target.classList.add('check');
        });
    }

    findAllBomb() {
        if (document.querySelector('#submit')) return;

        console.log('다 찾았나 확인');
        const button = document.createElement('button');
        button.id = 'submit';
        button.textContent = '결정';

        button.addEventListener('click', () => {
            // TODO : 정답 확인 + 게임을 종료시킨다
            this.gameOver();
        });
        document.body.appendChild(button);
    }

    gameOver() {
        this.tbody.querySelectorAll('.close').forEach((c) => {
            c.classList.remove('close');
        });

        this.gameStart = false;
    }

    pick(x, y) {

        if(!this.gameStart) return;

        const _td = this.tbody.querySelectorAll('tr')[x]
                                .querySelectorAll('td')[y];

        _td.classList.remove('close');

        const pickItem = this.dataSet[x][y];
        if (pickItem === 'X') {
            // TODO : 게임종료 및 폭탄 표시
            _td.innerHTML = '펑';
            return;
        }

        const xArr = [x];
        const yArr = [y];

        if (x !== 0) {
            xArr.push(x - 1);
        } 
        if (x < this.horizontal - 1) {
            xArr.push(x + 1);
        }

        if (y !== 0) {
            yArr.push(y - 1);
        } 
        if (y < this.vertical - 1) {
            yArr.push(y + 1);
        }

        let bombCount = 0;

        xArr.forEach((_x) => {
            yArr.forEach((_y) => {
                if (x === _x && y === _y) return;
                console.log(`x : ${_x} , y : ${_y}`)
                if(this.dataSet[_x][_y] === 'X') bombCount++;
            });
        });

        console.log('bombCount', bombCount);

        // 숫자 표시
        _td.innerHTML = bombCount;
    }
}

const game = new GamePanel();