import {fillModal, removeRows} from "./modal.js";

export function get(url){
        return new Promise(function(resolve, reject){
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, true);
            xhttp.onload = function () {
                if (xhttp.status === 200){
                    resolve(JSON.parse(xhttp.response));
                } else {
                    reject(xhttp.statusText);
                }
            };
            xhttp.onerror = function () {
                reject(xhttp.statusText);
            };
            xhttp.send();
        });
    }


export function loadTable (planets) {
         const planetSelector = document.querySelectorAll('#planet');
         const diameterSelector = document.querySelectorAll('#diameter');
         const climateSelector = document.querySelectorAll('#climate');
         const terrainSelector = document.querySelectorAll('#terrain');
         const waterSelector = document.querySelectorAll('#water');
         const populationSelector = document.querySelectorAll('#population');
         const residentSelector = document.querySelectorAll('#resident');
         let counter = 0;
         for (let sPlanet of planetSelector){
             sPlanet.innerHTML = planets.results[counter].name;
             counter++;
         }
         counter = 0;
         for (let sDiameter of diameterSelector) {
                 let currentDiameter = planets.results[counter].diameter;
                 addCommaAndSuffix(currentDiameter, sDiameter, 'km');
             counter++;
         }
         counter = 0;
         for (let sClimate of climateSelector) {
             sClimate.innerHTML = planets.results[counter].climate;
             counter++;
         }
         counter = 0;
         for (let sTerrain of terrainSelector) {
             sTerrain.innerHTML = planets.results[counter].terrain;
             counter++;
         }
         counter = 0;
         for (let sWater of waterSelector) {
             let waterPercent = planets.results[counter].surface_water;
             if (waterPercent === 'unknown') {
                 sWater.innerHTML = waterPercent;
             } else {
                 sWater.innerHTML = waterPercent + '%';
             }
             counter++;
         }
         counter = 0;
         for (let sPopulation of populationSelector) {
             let currentPopulation = planets.results[counter].population;
             if (currentPopulation === 'unknown') {
                 sPopulation.innerHTML = currentPopulation;
             } else {
                 addCommaAndSuffix(currentPopulation, sPopulation, 'people');
             }
             counter++;
         }
         counter = 0;
         for (let sResident of residentSelector) {
             let residentNumber = planets.results[counter].residents;
             if (residentNumber.length === 0) {
                 sResident.innerHTML = 'No known residents';
             } else {
                 sResident.innerHTML = `<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">${residentNumber.length} resident(s)</button>`;
             }
             sResident.addEventListener('click', function () {
                 removeRows();
                 let characterInfo = '';
                 for (let url of residentNumber) {
                     characterInfo = get(url);
                     characterInfo.then(fillModal);
                 }
             });
             counter++;
         }
    }

    function addCommaAndSuffix(string, iterable, suffix) {
             let formattedOutput = '';
             let indexCounter = 0;
             string = string.split("").reverse().join("");
             for (let number of string) {
                 if (indexCounter % 3 === 0) {
                     formattedOutput += ',';
                     formattedOutput += number;
                 } else {
                     formattedOutput += number;
                 }
                 indexCounter++;
             }
             formattedOutput = formattedOutput.split("").reverse().join("");
             let commaLastIndex = formattedOutput.lastIndexOf(',');
             formattedOutput = formattedOutput.slice(0, commaLastIndex);
             formattedOutput += ' ' + suffix;
             iterable.innerHTML = formattedOutput;
    }