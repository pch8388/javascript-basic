class GamePanel {
    constructor() {
        this.setInitialValues();
        this.createBomb();
    }

    setInitialValues() {
        this.hor = document.querySelector('#hor');
        this.ver = document.querySelector('#ver');
        this.bomb = document.querySelector('#bomb');
        this.table = document.querySelector('#table');
        this.timer = document.querySelector('#timer');
        this.tbody = this.table.querySelector('tbody');
    }

    createBomb() {
        document.querySelector('#exec').addEventListener('click', ({target}) => {
            
            this.horizontal = Number.parseInt(this.hor.value);
            this.vertical = Number.parseInt(this.ver.value);
            this.bombNumber = Number.parseInt(this.bomb.value);

            const fragment = document.createDocumentFragment();
            const dataSet = [];
            for (let i = 0; i < this.vertical; i++) {
                const row = document.createElement('tr');
                const arr = [];
                for (let j = 0; j < this.horizontal; j++) {
                    const td = document.createElement('td');
                    
                    row.appendChild(td);
                    arr.push(1);
                }
                dataSet.push(arr);
                fragment.appendChild(row);
            }

            console.dir(fragment);

            const bombValue = new Set();
            while (bombValue.size < this.bombNumber) {
                bombValue.add(Math.floor(Math.random() * (this.vertical * this.horizontal)));
            }

            bombValue.forEach((val) => {
                dataSet[Math.floor(val / this.vertical)][val % this.vertical] = 'X';

                // 추후 삭제
                const _tr = fragment.querySelectorAll('tr')[Math.floor(val / this.vertical)];
                _tr.querySelectorAll('td')[val % this.vertical].textContent = 'X';
            });

            console.dir(bombValue);

            console.dir(dataSet);
            this.tbody.innerHTML = '';
            this.tbody.appendChild(fragment);
        });
    }
}

const game = new GamePanel();