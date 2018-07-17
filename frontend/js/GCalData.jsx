import React from 'react';


export function organizeData(arr) {
    console.log(arr);
    let keys = Object.keys(arr);
    let data = [];
    let testData = [];
    let firstRow = 0;
    let secondRow = 1;
    let count = 0;
    keys.map(function(e) {
        count < arr[e].length ? count = arr[e].length : void 0;
    });
    for (let i = 0; i < count/3; i++) {
        keys.forEach(function (e) {
                testData.push(<td rowSpan={2}>{arr[e][firstRow]}</td>);
                testData.push(<td>{arr[e][secondRow]}</td>);
            }
        );
        secondRow += 3;
        firstRow += 3;
    }
    console.log(testData);
    return data;
}

// title.length array: [event, start, end]
export function getRows(array) {
    let hbody = [];
    let keyInt = 0;
    array.forEach(function(e, inc) {
        keyInt++;
        let title = [];
        let tbody =[];
        let count = 2;
        e.forEach((i, index) => {

            if (i.slice(0,3) === "zfi")  {
                title.push(<td className="border-0 invisible" key={i} rowSpan={2}></td>);
                index++;
                title.push(<td className="border-0 invisible" key={array[inc][index]}></td>);
            } else if (isNaN(parseInt(i, 10))) {
                title.push(<td key={i} rowSpan={2}>{i}</td>);
                index++;
                title.push(<td key={array[inc][index]}>{array[inc][index]}</td>)
            } else if (i.slice(0,3) === "981") {
                tbody.push(<td className="border-0 invisible" key={array[inc][count]}></td>);
                count += 3;
            } else if ((count <= index || index === 1) && (i.slice(0,3) !== "983")) {
                tbody.push(<td key={array[inc][count]}>{array[inc][count]}</td>);
                count += 3;
            }
        });
        hbody.push(<tr key={keyInt}>{title}</tr>);
        keyInt++;
        hbody.push(<tr key={keyInt}>{tbody}</tr>);
    });

    return hbody;
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
