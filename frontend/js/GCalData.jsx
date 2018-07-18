import React from 'react';


export function organizeData(arr) {
    let data = [];
    let keys = Object.keys(arr);
    let firstRow = 0;
    let miniRow = 1;
    let secondRow = 2;
    let count = 0;
    let index = 0;
    keys.map(function(e) {
        count < arr[e].length ? count = arr[e].length : void 0;
    });
    for (let i = 0; i < count/3; i++) {
        let row = [];
        let testData = [];
        keys.map(function (e) {
            if (arr[e][firstRow] && arr[e][miniRow] && arr[e][secondRow]) {
                index += 1;
                testData.push(<td key={index} rowSpan={2}>{arr[e][firstRow]}</td>);
                index+= 1;
                testData.push(<td key={index}>{arr[e][miniRow]}</td>);
                index+= 1;
                row.push(<td key={index}>{arr[e][secondRow]}</td>)
            } else {
                index+= 1;
                testData.push(<td key={index} rowSpan={2}></td>);
                index+= 1;
                testData.push(<td key={index}></td>);
                index+= 1;
                row.push(<td key={index}></td>)
            }
            }
        );
        data.push(
           <tr key={RandomInt()}>{testData}</tr>
        );
        data.push(
            <tr key={RandomInt()}>{row}</tr>
        );
        secondRow += 3;
        miniRow += 3;
        firstRow += 3;
    }

    return data;
}


export function RandomString() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function RandomInt() {
    let text = "";
    let possible = "0123456789";
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
