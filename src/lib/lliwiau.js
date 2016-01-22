"use strict";

import * as gfx from './gfx.js';
const PI = Math.PI;
const cos = Math.cos;
const sin = Math.sin;


function nolPwyntiau(xCanol, yCanol, radiws, nifer, onglCychwyn=0) {
    const cam = (2*PI)/nifer;
    let pwyntiau = [];
    for(let ongl=0; ongl < 2*PI; ongl += cam) {
        const x = xCanol + radiws*cos(ongl+onglCychwyn);
        const y = yCanol + radiws*sin(ongl+onglCychwyn);
        pwyntiau.push([x, y]);
    }
    
    return pwyntiau;
}

function* generadurCodauHex(cam) {
    // Rhoi 00 i FF
    const cychwyn = cam > 0 ? 0 : 255;
    for (let i=cychwyn; i>= 0 && i<= 255; i += cam) {
        yield ("0"+(Number(i).toString(16))).slice(-2).toUpperCase();
    }
}

function mapGeneradur(generadur, callback) {
    let eitemau = [];
    let eitem;
    while(eitem = generadur.next().value) {
        eitemau.push(callback(eitem));
    }
    return eitemau;
}

function* lliwiau() {    
    let cochMelyn = mapGeneradur(generadurCodauHex(16), h => `#FF${h}00` );
    let melynGwyrdd = mapGeneradur(generadurCodauHex(-16), h => `#${h}FF00` );
    let gwyrddGwyrddlas = mapGeneradur(generadurCodauHex(16), h => `#00FF${h}` );
    let gwyrddlasGlas = mapGeneradur(generadurCodauHex(-16), h => `#00${h}FF` );
    let glasMagenta = mapGeneradur(generadurCodauHex(16), h => `#${h}00FF` );
    let magentaCoch = mapGeneradur(generadurCodauHex(-16), h => `#FF00${h}` );

    const rhestrLliwiau = cochMelyn
                            .concat(melynGwyrdd)
                            .concat(gwyrddGwyrddlas)
                            .concat(gwyrddlasGlas)
                            .concat(glasMagenta)
                            .concat(magentaCoch);

    let i = 0;    
    while(true) {        
        yield rhestrLliwiau[i];
        i++;
        if (i >= rhestrLliwiau.length) i = 0;        
    }
}

function lluniadu(context, ...rhestrauPwyntiau) {   
    const pwyntiau = rhestrauPwyntiau.reduce( (prev,curr) => prev.concat(curr), [])
                        .map(pwynt => pwynt.map(n => Math.round(n))); 
    const lliw = lliwiau();
    
    context.lineWidth = 2;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.globalAlpha = 0.75;
    for (let i=0; i<pwyntiau.length-1; i++) {
         for (let j=i+1; j<pwyntiau.length; j++) {
            gfx.drawLine(context, pwyntiau[i][0], pwyntiau[i][1], pwyntiau[j][0], pwyntiau[j][1], lliw.next().value);
        }
    }
}


export { nolPwyntiau, lluniadu, lliwiau }