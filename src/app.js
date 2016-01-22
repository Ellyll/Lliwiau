"use strict";

import "babel-polyfill";
import * as gfx from './lib/gfx.js';
import * as lliwiau from './lib/lliwiau.js';


window.addEventListener('load', init);

function init() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    gfx.maximiseCanvas(canvas);
   
    let x, y, radiws;
    function gosodMeintiau() {
        gfx.maximiseCanvas(canvas);
        radiws = Math.min(canvas.width, canvas.height)*0.45;    
        x = canvas.width / 2;
        y = canvas.height / 2;        
    }
    gosodMeintiau();
    window.addEventListener('resize', gosodMeintiau, false);
    
    const cyflymderOnglAllanol = gfx.degToRad(10) / 1000; // radian / ms
    const cyflymderOnglMewnol  = gfx.degToRad(20) / 1000; // radian / ms
    const cyflymderOnglCanol   = gfx.degToRad(40) / 1000; // radian / ms

    let niferPwyntiau = 12;
    // let amserDiwethafNewidPwynt = null;
    // let amserCynNewidNiferPwyntiau = 5000; // ms
    // const niferIsafPwyntiau = 3;
    // const niferUchafPwyntiau = 32;
    // let cyfeiriad = -1;


    lluniadu(context, null, null, 0, 0, 0, niferPwyntiau);

    function lluniadu(context, amserPresenol, amserBlaenorol, onglAllanol, onglMewnol, onglCanol) {
        const amser = amserPresenol - amserBlaenorol; 
        const onglAllanolNewydd = onglAllanol + cyflymderOnglAllanol*amser;
        const onglMewnolNewydd  = onglMewnol + cyflymderOnglMewnol*amser;
        const onglCanolNewydd   = onglCanol + cyflymderOnglCanol*amser;
        
        // amserDiwethafNewidPwynt = amserDiwethafNewidPwynt || amserPresenol;
        // if (amserPresenol - amserDiwethafNewidPwynt >= amserCynNewidNiferPwyntiau) {
        //     if (niferPwyntiau === niferIsafPwyntiau || niferPwyntiau === niferUchafPwyntiau) {
        //         cyfeiriad = cyfeiriad * -1;
        //     }
        //     niferPwyntiau += cyfeiriad;
        //     amserDiwethafNewidPwynt = amserPresenol;
        // }
        
        const pwyntiauAllanol = lliwiau.nolPwyntiau(x, y, radiws, niferPwyntiau, onglAllanolNewydd);
        const pwyntiauMewnol =  lliwiau.nolPwyntiau(x, y, Math.round(radiws*0.66666666), niferPwyntiau, onglMewnolNewydd);
        const pwyntiauCanol =   lliwiau.nolPwyntiau(x, y, Math.round(radiws*0.33333333), niferPwyntiau, onglCanolNewydd);
        
        gfx.clearCanvas(context);
        lliwiau.lluniadu(context, pwyntiauAllanol, pwyntiauMewnol, pwyntiauCanol);
        
        const blaenorol = amserPresenol;
        window.requestAnimationFrame( amserPresenol => {
            lluniadu(context, amserPresenol, blaenorol,
                     onglAllanolNewydd, onglMewnolNewydd, onglCanolNewydd);
        });    
    }
    

}

