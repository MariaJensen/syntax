const fs = require('fs');


function convert(pathRead, pathWrite) {
    const s = fs.readFileSync(pathRead, 'utf8').split('');

    const L = s.length;

    let t = ''; 
    let l = 0; 
    let k = 2;
    let a = '';
    const hexa = /[0-9a-fA-F]/;

    while (l < L) {
        
        if (s[l] === '\\') {
            a = '\\x{';
            k = 2;
            while (hexa.test(s[l+k])) {
                a = a + s[l+k];
                k++;
            }
            a = a + '}';
            l = l + k;
            t = t + a;
        } else if (s[l] === ' '|s[l] === '_') {
            
            l = l+1;
        } else {
            t = t + s[l];
            l = l+1;
        }
    }

    fs.writeFileSync(pathWrite, t);
}

convert('./UnicodeIDContinueRaw.txt', './UnicodeIDContinue.txt');
