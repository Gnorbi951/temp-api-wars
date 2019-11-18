import {loadTable, get} from './lib.js';

function main() {


    window.onload = function() {

        let currentUrl = 'https://swapi.co/api/planets';
        let promise = get(currentUrl);
        promise.then(loadTable);


        const nextButton = document.getElementById('next_btn');
        const previousButton = document.getElementById('prev_btn');

        let nextUrl = '';
        nextButton.addEventListener('click', function () {
            promise.then(function(defs){
                nextUrl = defs.next;
                promise = get(nextUrl);
                promise.then(loadTable);
            });
        });
        let previousUrl = '';
        previousButton.addEventListener('click', function () {
            promise.then(function(defs){
                previousUrl = defs.previous;
                if (previousUrl === null) {
                    console.log('first page');
                } else {
                    promise = get(previousUrl);
                    promise.then(loadTable);
                }
            })
        })



};
}

main();