function t(t,e,i,n){Object.defineProperty(t,e,{get:i,set:n,enumerable:!0,configurable:!0})}function e(t){return t&&t.__esModule?t.default:t}var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},s=i.parcelRequire90f1;null==s&&((s=function(t){if(t in n)return n[t].exports;if(t in r){var e=r[t];delete r[t];var i={id:t,exports:{}};return n[t]=i,e.call(i.exports,i,i.exports),i.exports}var s=Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,e){r[t]=e},i.parcelRequire90f1=s),s.register("27Lyk",function(e,i){t(e.exports,"register",()=>n,t=>n=t),t(e.exports,"resolve",()=>r,t=>r=t);var n,r,s={};n=function(t){for(var e=Object.keys(t),i=0;i<e.length;i++)s[e[i]]=t[e[i]]},r=function(t){var e=s[t];if(null==e)throw Error("Could not resolve bundle with id "+t);return e}}),s("27Lyk").register(JSON.parse('{"392in":"index.f251b61e.js","jAwCd":"yeom-icon.c59e79dd.png","jUwq8":"download.9ea3826b.svg","frheu":"share.99e75b50.svg"}'));/****************\
* Challenge #1   *
* Querre         *
* By: @yeomfa    *
\****************/var o={};o=new URL(s("27Lyk").resolve("jAwCd"),import.meta.url).toString();class l{#t=document.querySelector(".root");render(){let t=`
      <section class="container-input section-form">
        <div class="title">
          <img src=${/*@__PURE__*/e(o)} alt="yeom icon">
          <span>Querre</span>
        </div>

        <form class="app form-url">
          <input class="input-url" type="text" name="url" value="" placeholder="Enter an url"> 
          <button class="btn-submit" type="submit">QR code</button>
        </form>
      </section>
    `;this.#t.innerHTML=t}addHandlerSubmit(t){this.#t.addEventListener("submit",e=>{e.preventDefault();let i=document.querySelector(".input-url"),n=i.value;n.length<=1||(t(n),i.value="")})}}var a=new l,d={};d=new URL(s("27Lyk").resolve("jUwq8"),import.meta.url).toString();var u={};u=new URL(s("27Lyk").resolve("frheu"),import.meta.url).toString();class c{#t=document.querySelector(".root");render(t){let i=`
      <section class="container-qr section-qr">
        <header class="header-container">
          <div class="querre-icon">
            <img src=${/*@__PURE__*/e(o)} alt="yeom icon">
            <span>Querre</span>
          </div>
        </header>

        <div class="qr">
          <div class="shape">
            <img id="qrcode" src=${t}>
          </div>
        </div>

        <div class="options">
          <button class="btn btn-download">
            Download
            <img class="btn-icon" src=${/*@__PURE__*/e(d)} alt="download icon">
          </button> 
          <button class="btn btn-share">
            Share
            <img class="btn-icon" src=${/*@__PURE__*/e(u)} alt="download icon">
          </button> 
        </div>
      </section>
    `;this.#t.innerHTML=i}addHandlerIcon(t){this.#t.addEventListener("click",e=>{let i=e.target.closest(".querre-icon");i&&t()})}getQRElement(){let t=document.getElementById("qrcode");return t}}var h=new c;// QR Code Generator
// Dan Jackson, 2020
// --- Bit Buffer Writing ---
class f{constructor(t){this.bitCapacity=t;let e=this.bitCapacity+7>>3;this.buffer=new Uint8Array(e),this.bitOffset=0}append(t,e){for(let i=0;i<e;i++){let n=this.buffer[this.bitOffset>>3],r=7-(7&this.bitOffset),s=1<<r,o=1<<e-1-i;this.buffer[this.bitOffset>>3]=n&~s|(t&o?s:0),this.bitOffset++}}position(){return this.bitOffset}read(t){let e=this.buffer[t>>3]&1<<7-(7&t)?1:0;return e}}// --- Segment Modes ---
// Segment Mode 0b0001 - Numeric
// Maximal groups of 3/2/1 digits encoded to 10/7/4-bit binary
class E{static MODE=1;static CHARSET="0123456789";static canEncode(t){return[...t].every(t=>E.CHARSET.includes(t))}static payloadSize(t){let e=t.length;return 10*Math.floor(e/3)+e%3*4-Math.floor(e%3/2)}static countSize(t){return t<10?10:t<27?12:14}static totalSize(t,e){return I.MODE_BITS+E.countSize(t)+E.payloadSize(e)}static encode(t,e,i){let n=[...i].map(t=>t.charCodeAt(0)-48);t.append(E.MODE,I.MODE_BITS),t.append(n.length,E.countSize(e));for(let e=0;e<n.length;){n.length-e>3||n.length;let i=n[e],r=4;++e<n.length&&(i=10*i+n[e],r+=3,e++),e<n.length&&(i=10*i+n[e],r+=3,e++),t.append(i,r)}}}// Segment Mode 0b0010 - Alphanumeric
class m{static MODE=2;static CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";static canEncode(t){return[...t].every(t=>m.CHARSET.includes(t))}static payloadSize(t){let e=t.length;return 11*Math.floor(e/2)+6*(e%2)}static countSize(t){return t<10?9:t<27?11:13}static totalSize(t,e){return I.MODE_BITS+m.countSize(t)+m.payloadSize(e)}static encode(t,e,i){let n=[...i].map(t=>m.CHARSET.indexOf(t));t.append(m.MODE,I.MODE_BITS),t.append(n.length,m.countSize(e));for(let e=0;e<n.length;){let i=n[e],r=6;++e<n.length&&(i=45*i+n[e],r+=5,e++),t.append(i,r)}}}// Segment Mode 0b0100 - 8-bit byte
class p{static MODE=4;static canEncode(t){return[...t].every(t=>t.charCodeAt(0)>=0&&255>=t.charCodeAt(0))}static payloadSize(t){let e=t.length;return 8*e}static countSize(t){return t<10?8:16;// 8-bit
}static totalSize(t,e){return I.MODE_BITS+p.countSize(t)+p.payloadSize(e)}static encode(t,e,i){let n=[...i].map(t=>t.charCodeAt(0));t.append(p.MODE,I.MODE_BITS),t.append(n.length,p.countSize(e));for(let e=0;e<n.length;e++)t.append(n[e],8)}}class I{// In descending order of coding efficiency
static MODES={numeric:E,alphanumeric:m,eightBit:p};static MODE_BITS=4;static MODE_INDICATOR_TERMINATOR=0;// ECI Assignment Numbers
//static ECI_UTF8 = 26; // "\000026" UTF8 - ISO/IEC 10646 UTF-8 encoding
constructor(t){for(let e of(this.text=t,Object.values(I.MODES)))if(e.canEncode(this.text)){this.mode=e;return}throw"Cannot encode text"}}// --- Reed-Solomon Error-Correction Code ---
// These error-correction functions are derived from https://www.nayuki.io/page/qr-code-generator-library Copyright (c) Project Nayuki. (MIT License)
class M{// Product modulo GF(2^8/0x011D)
static Multiply(t,e){let i=0;// 8-bit
for(let n=7;n>=0;n--)i=(i<<1^(i>>7)*285)&255^(e>>n&1)*t;return i}// Reed-Solomon ECC generator polynomial for given degree
static Divisor(t){let e=new Uint8Array(t);// <= QrCode.ECC_CODEWORDS_MAX
e.fill(0),e[t-1]=1;let i=1;// 8-bit
for(let n=0;n<t;n++){for(let n=0;n<t;n++)e[n]=M.Multiply(e[n],i),n+1<t&&(e[n]^=e[n+1]);i=255&M.Multiply(i,2);// 8-bit
}return e}// Reed-Solomon ECC
static Remainder(t,e,i,n,r,s,o){s.fill(0,o,o+r);for(let l=0;l<i;l++){let i=t[e+l]^s[o+0];// Move (degree-1) bytes from result[resultOffset+1] to result[resultOffset+0].
s.copyWithin(o,o+1,o+1+r-1),s[o+r-1]=0;for(let t=0;t<r;t++)s[o+t]^=M.Multiply(n[t],i)}}}// --- 2D Matrix ---
class g{static MODULE_LIGHT=0;static MODULE_DARK=1;static FINDER_SIZE=7;static TIMING_OFFSET=6;static VERSION_SIZE=3;static ALIGNMENT_RADIUS=2;static QUIET_NONE=0;static QUIET_STANDARD=4;static calculateDimension(t){return 17+4*t;// V1=21x21; V40=177x177
}static calculateMask(t,e,i){switch(t){case 0:return(i+e&1)==0;// QRCODE_MASK_000
case 1:return(1&i)==0;// QRCODE_MASK_001
case 2:return e%3==0;// QRCODE_MASK_010
case 3:return(i+e)%3==0;// QRCODE_MASK_011
case 4:return((i>>1)+(e/3|0)&1)==0;// QRCODE_MASK_100
case 5:return(i*e&1)+i*e%3==0;// QRCODE_MASK_101
case 6:return((i*e&1)+i*e%3&1)==0;// QRCODE_MASK_110
case 7:return(i*e%3+(i+e&1)&1)==0;// QRCODE_MASK_111
default:return!1}}// Returns coordinates to be used in all combinations (unless overlapping finder pattern) as x/y pairs for alignment, <0: end
static alignmentCoordinates(t){let e=t<=1?0:Math.floor(t/7)+2,i=Array(e),n=32==t?26:2*Math.floor((4*t+2*e+1)/(2*e-2)),r=4*t+10;for(let t=e-1;t>0;t--)i[t]=r,r-=n;return e>0&&(i[0]=6),i}constructor(t){this.version=t,this.dimension=g.calculateDimension(this.version);let e=this.dimension*this.dimension;this.buffer=Array(e),this.identity=Array(e),this.quiet=g.QUIET_STANDARD,this.invert=!1,this.text=null}setModule(t,e,i,n){if(t<0||e<0||t>=this.dimension||e>=this.dimension)return;let r=e*this.dimension+t;this.buffer[r]=i,void 0!==n&&(this.identity[r]=n)}getModule(t,e){if(t<0||e<0||t>=this.dimension||e>=this.dimension)return null;let i=e*this.dimension+t;return this.buffer[i]}identifyModule(t,e){if(t<0||e<0||t>=this.dimension||e>=this.dimension)return;let i=e*this.dimension+t;return this.identity[i]}// Draw finder and separator
drawFinder(t,e){for(let i=-Math.floor(g.FINDER_SIZE/2)-1;i<=Math.floor(g.FINDER_SIZE/2)+1;i++)for(let n=-Math.floor(g.FINDER_SIZE/2)-1;n<=Math.floor(g.FINDER_SIZE/2)+1;n++){let r=(Math.abs(n)>Math.abs(i)?Math.abs(n):Math.abs(i))&1?g.MODULE_DARK:g.MODULE_LIGHT;0==n&&0==i&&(r=g.MODULE_DARK);let s=0==n&&0==i?"FI":"Fi";this.setModule(t+n,e+i,r,s)}}drawTiming(){for(let t=g.FINDER_SIZE+1;t<this.dimension-g.FINDER_SIZE-1;t++){let e=1&~t?g.MODULE_DARK:g.MODULE_LIGHT;this.setModule(t,g.TIMING_OFFSET,e,"Ti"),this.setModule(g.TIMING_OFFSET,t,e,"Ti")}}drawAlignment(t,e){for(let i=-g.ALIGNMENT_RADIUS;i<=g.ALIGNMENT_RADIUS;i++)for(let n=-g.ALIGNMENT_RADIUS;n<=g.ALIGNMENT_RADIUS;n++){let r=1-((Math.abs(n)>Math.abs(i)?Math.abs(n):Math.abs(i))&1)?g.MODULE_DARK:g.MODULE_LIGHT,s=0==n&&0==i?"AL":"Al";this.setModule(t+n,e+i,r,s)}}// Populate the matrix with function patterns: finder, separators, timing, alignment, temporary version & format info
populateFunctionPatterns(){this.drawFinder(Math.floor(g.FINDER_SIZE/2),Math.floor(g.FINDER_SIZE/2)),this.drawFinder(this.dimension-1-Math.floor(g.FINDER_SIZE/2),Math.floor(g.FINDER_SIZE/2)),this.drawFinder(Math.floor(g.FINDER_SIZE/2),this.dimension-1-Math.floor(g.FINDER_SIZE/2)),this.drawTiming();let t=g.alignmentCoordinates(this.version);for(let e of t)for(let i of t)e<=g.FINDER_SIZE&&i<=g.FINDER_SIZE||e>=this.dimension-1-g.FINDER_SIZE&&i<=g.FINDER_SIZE||e<=g.FINDER_SIZE&&i>=this.dimension-1-g.FINDER_SIZE||this.drawAlignment(e,i);// Obscured by top-left finder
// Draw placeholder format/version info (so that masking does not affect these parts)
this.drawFormatInfo(0),this.drawVersionInfo(0)}// Set the data drawing cursor to the start position (lower-right corner)
cursorReset(){this.cursorX=this.dimension-1,this.cursorY=this.dimension-1}// Advance the data drawing cursor to next position
cursorAdvance(){for(;this.cursorX>=0;)if(1&this.cursorX^(this.cursorX>g.TIMING_OFFSET?1:0)?this.cursorX--:(this.cursorX++,(this.cursorX-(this.cursorX>g.TIMING_OFFSET?1:0))/2&1?this.cursorY<=0?this.cursorX-=2:this.cursorY--:this.cursorY>=this.dimension-1?this.cursorX-=2:this.cursorY++),!this.identifyModule(this.cursorX,this.cursorY))return!0;return!1}cursorWrite(t,e,i){let n=e;for(let e=0;e<i;e++){let e=t.read(n);if(this.setModule(this.cursorX,this.cursorY,e),n++,!this.cursorAdvance())break}return n-e}// Draw 15-bit format information (2-bit error-correction level, 3-bit mask, 10-bit BCH error-correction; all masked)
drawFormatInfo(t){for(let e=0;e<15;e++){let i=t>>e&1;e<6?this.setModule(g.FINDER_SIZE+1,e,i,"Fo"):6==e?this.setModule(g.FINDER_SIZE+1,g.FINDER_SIZE,i,"Fo"):7==e?this.setModule(g.FINDER_SIZE+1,g.FINDER_SIZE+1,i,"Fo"):8==e?this.setModule(g.FINDER_SIZE,g.FINDER_SIZE+1,i,"Fo"):this.setModule(14-e,g.FINDER_SIZE+1,i,"Fo"),e<8?this.setModule(this.dimension-1-e,g.FINDER_SIZE+1,i,"Fo"):this.setModule(g.FINDER_SIZE+1,this.dimension-g.FINDER_SIZE-8+e,i,"Fo")}// dark module
this.setModule(g.FINDER_SIZE+1,this.dimension-1-g.FINDER_SIZE,g.MODULE_DARK,"Fo")}// Draw 18-bit version information (6-bit version number, 12-bit error-correction (18,6) Golay code)
drawVersionInfo(t){// No version information on V1-V6
if(null!==t&&!(this.version<7))for(let e=0;e<18;e++){let i=t>>e&1,n=Math.floor(e/g.VERSION_SIZE),r=e%g.VERSION_SIZE;this.setModule(n,this.dimension-1-g.FINDER_SIZE-g.VERSION_SIZE+r,i,"Ve"),this.setModule(this.dimension-1-g.FINDER_SIZE-g.VERSION_SIZE+r,n,i,"Ve")}}applyMaskPattern(t){for(let e=0;e<this.dimension;e++)for(let i=0;i<this.dimension;i++){let n=this.identifyModule(i,e);if(!n){let n=g.calculateMask(t,i,e);if(n){let t=this.getModule(i,e),n=1^t;this.setModule(i,e,n)}}}}evaluatePenalty(){let t=0;// Feature 1: Adjacent identical modules in row/column: (5 + i) count, penalty points: N1 + i
// Feature 3: 1:1:3:1:1 ratio patterns (either polarity) in row/column, penalty points: N3
for(let e=0;e<=1;e++){let i=[,,,,,],n=0;for(let r=0;r<this.dimension;r++){let s=-1,o=0;for(let l=0;l<this.dimension;l++){let a=this.getModule(e?r:l,e?l:r);// End of run
if(a==s&&o++,a!=s||l>=this.dimension-1){// If not start condition
if(s>=0&&(o>=5&&(t+=3+(o-5)),i[++n%5]=o,n>=5)){// Proportion:             1 : 1 : 3 : 1 : 1
// Modulo relative index: +3, +4,  0, +1, +2
// Check for proportions
let e=i[(n+1)%5];i[n%5]==3*e&&e==i[(n+2)%5]&&e==i[(n+3)%5]&&e==i[(n+4)%5]&&(t+=40)}o=1,s=a}}}}// Feature 4: Dark module percentage: 50 +|- (5*k) to 50 +|- (5*(k+1)), penalty points: N4 * k
{let e=0;for(let t=0;t<this.dimension;t++)for(let i=0;i<this.dimension;i++)this.getModule(i,t)==g.MODULE_DARK&&e++;t+=10*Math.floor(Math.abs((100*e+this.dimension*this.dimension/2)/(this.dimension*this.dimension)-50)/5)}return t}}class S{static VERSION_MIN=1;static VERSION_MAX=40;// In ascending order of robustness
static ErrorCorrectionLevel={L:1,M:0,Q:3,H:2};static ECC_CODEWORDS_MAX=30;static PAD_CODEWORDS=60433;// Calculate the (square) dimension for a version. V1=21x21; V40=177x177.
static dimension(t){return 17+4*t}// Calculate the total number of data modules in a version (raw: data, ecc and remainder bits); does not include finder/alignment/version/timing.
static totalDataModules(t){return(16*t+128)*t+64-(t<2?0:(25*(Math.floor(t/7)+2)-10)*(Math.floor(t/7)+2)-55)-(t<7?0:36)}// Calculate the total number of data bits available in the codewords (cooked: after ecc and remainder)
static dataCapacity(t,e){let i=Math.floor(S.totalDataModules(t)/8),n=S.eccBlockCodewords(t,e)*S.eccBlockCount(t,e);return 8*(i-n)}// Number of error correction blocks
static eccBlockCount(t,e){return[[0,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[0,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[0,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81],[0,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68]][e][t]}// Number of error correction codewords in each block
static eccBlockCodewords(t,e){return[[0,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[0,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[0,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[0,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30]][e][t]}// Calculate 18-bit version information (6-bit version number, 12-bit error-correction (18,6) Golay code)
static calculateVersionInfo(t){if(t<7)return null;// Calculate 12-bit error-correction (18,6) Golay code
let e=t;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;let i=t<<12|e;return i}// Calculate 15-bit format information (2-bit error-correction level, 3-bit mask, 10-bit BCH error-correction; all masked)
static calculateFormatInfo(t,e){// TODO: Reframe in terms of QRCODE_SIZE_ECL (2) and QRCODE_SIZE_MASK (3)
// LLMMM
let i=(3&t)<<3|7&e,n=i;for(let t=0;t<10;t++)n=n<<1^(n>>>9)*1335;return 21522^(i<<10|1023&n)}// Total number of data bits used (may later require 0-padding to a byte boundary and padding bytes added)
static measureSegments(t,e){let i=0;for(let n of t)i+=n.mode.totalSize(e,n.text);return i}static doSegmentsFit(t,e,i){let n=S.measureSegments(t,e),r=S.dataCapacity(e,i);return n<=r}static findMinimumVersion(t,e,i=S.VERSION_MIN,n=S.VERSION_MAX){for(let r=i;r<=n;r++)if(S.doSegmentsFit(t,r,e))return r;throw"Cannot fit data in any allowed versions"}static tryToImproveErrorCorrectionLevel(t,e,i){let n=Object.values(S.ErrorCorrectionLevel);for(let r=1;r<n.length;r++)i==n[r-1]&&S.doSegmentsFit(t,e,n[r])&&(i=n[r]);return i}// Write segments: header/count/payload
static writeData(t,e,i){// Add segments (mode, count and data)
for(let n of i)n.mode.encode(t,e,n.text)}// Finish segments: given the available space, write terminator, rounding bits, and padding codewords
static writePadding(t,e,i){let n;// The total number of data bits available in the codewords (cooked: after ecc and remainder)
let r=S.dataCapacity(e,i);// Remainder padding codewords 
for(// Add terminator 4-bit (0b0000)
n=Math.min(r-t.position(),I.MODE_BITS),t.append(I.MODE_INDICATOR_TERMINATOR,n),// Remainder bits to round up to a whole byte
n=Math.min(r-t.position(),8-(7&t.position())&7),t.append(0,n);(n=Math.min(r-t.position(),16))>0;)t.append(S.PAD_CODEWORDS>>16-n,n);// align for partial write
// Check position matches expectation
console.assert(t.position()===r,"Unexpectedly failed to correctly fill the data buffer")}// Calculate ECC data at the end of the codewords
// ...and fill the matrix
// TODO: Split this function into two (but depends on a lot of calculated state)
static calculateEccAndFillMatrix(t,e,i,n){// Number of error correction blocks
let r=S.eccBlockCount(e,i),s=S.eccBlockCodewords(e,i),o=S.totalDataModules(e),l=Math.floor((o-8*s*r)/8);console.assert(8*l===t.bitOffset,`Expected current bit position ${t.bitOffset} to match ECC offset *8 ${8*l}`);// Calculate Reed-Solomon divisor
let a=M.Divisor(s),d=Math.floor(l/r),u=r-(l-d*r),c=d+(u>=r?0:1);for(let e=0;e<r;e++){let i;i=e<u?e*d:e*d+(e-u);let n=d+(e<u?0:1),r=l+e*s;M.Remainder(t.buffer,i,n,a,s,t.buffer,r)}// Fill the matrix with data
// Write the codewords interleaved between blocks
n.cursorReset();let h=0;// Write data codewords interleaved across ecc blocks -- some early blocks may be short
for(let e=0;e<c;e++)for(let i=0;i<r;i++){// Calculate offset and length (earlier consecutive blocks may be short by 1 codeword)
// Skip codewords due to short block
if(e>=d&&i<u)continue;let r=i*d+(i>u?i-u:0)+e,s=8*r;h+=n.cursorWrite(t,s,8)}// Write ECC codewords interleaved across ecc blocks
for(let e=0;e<s;e++)for(let i=0;i<r;i++){let r=8*l+i*s*8+8*e;h+=n.cursorWrite(t,r,8)}// Add any remainder 0 bits (could be 0/3/4/7)
let f=g.MODULE_LIGHT;for(;h<o&&(n.setModule(n.cursorX,n.cursorY,f),h++,n.cursorAdvance()););}//
static findOptimalMaskPattern(t){let e=-1,i=null;for(let n=0;n<=7;n++){// XOR mask pattern
t.applyMaskPattern(n);// Find penalty score for this mask pattern
let r=t.evaluatePenalty();// XOR same mask removes it
t.applyMaskPattern(n),(e<0||r<e)&&(e=r,i=n)}return i}constructor(){}static generate(t,e){// Generation options
let i=Object.assign({errorCorrectionLevel:S.ErrorCorrectionLevel.M,minVersion:S.VERSION_MIN,maxVersion:S.VERSION_MAX,optimizeEcc:!0,maskPattern:null,quiet:g.QUIET_STANDARD,invert:!1},e),n=Array.isArray(t)?t:[t],r=n.map(t=>new I(t)),s=i.errorCorrectionLevel,o=S.findMinimumVersion(r,s,i.minVersion,i.maxVersion);i.optimizeEcc&&(s=S.tryToImproveErrorCorrectionLevel(r,o,s));// 'scratchBuffer' to contain the entire data bitstream for the QR Code
// (payload with headers, terminator, rounding bits, padding modules, ECC, remainder bits)
let l=S.totalDataModules(o),a=new f(l);// The total number of data modules in a version (raw: data, ecc and remainder bits); does not include finder/alignment/version/timing.
// Write segments: header/count/payload
S.writeData(a,o,r),// Finish segments: given the available space, write terminator, rounding bits, and padding codewords
S.writePadding(a,o,s);// Create an empty matrix
let d=new g(o);d.text=t,d.quiet=i.quiet,d.invert=i.invert,// Populate the matrix with function patterns: finder, separators, timing, alignment, temporary version & format info
d.populateFunctionPatterns(),// Calculate ECC and fill matrix
S.calculateEccAndFillMatrix(a,o,s,d);// Calculate the optimal mask pattern
let u=i.maskPattern;null===u&&(u=S.findOptimalMaskPattern(d)),// Apply the chosen mask pattern
d.applyMaskPattern(u);// Populate the matrix with version information
let c=S.calculateVersionInfo(o);d.drawVersionInfo(c);// Fill-in format information
let h=S.calculateFormatInfo(s,u);return d.drawFormatInfo(h),d}static render(t,e,i){let n={debug:R,large:D,medium:w,compact:A,svg:v,"svg-uri":_,bmp:O,"bmp-uri":b};if(!n[t])throw Error("ERROR: Invalid render mode: "+t);return n[t](e,i)}}function R(t,e){e=Object.assign({segments:["  ","██"],sep:"\n"},e);let i=[];for(let n=-t.quiet;n<t.dimension+t.quiet;n++){let r=[];for(let i=-t.quiet;i<t.dimension+t.quiet;i++){let s=t.identifyModule(i,n),o=t.getModule(i,n)?!t.invert:t.invert,l=o?1:0;null==s&&(s=e.segments[l]),r.push(s)}i.push(r.join(""))}return i.join(e.sep)}function D(t,e){e=Object.assign({segments:["  ","██"],sep:"\n"},e);let i=[];for(let n=-t.quiet;n<t.dimension+t.quiet;n++){let r=[];for(let i=-t.quiet;i<t.dimension+t.quiet;i++){let s=t.getModule(i,n)?!t.invert:t.invert,o=s?1:0,l=e.segments.length>=3&&s&&!t.identifyModule(i,n)?e.segments[2]:e.segments[o];r.push(l)}i.push(r.join(""))}return i.join(e.sep)}function w(t,e){e=Object.assign({segments:[" ","▀","▄","█"],sep:"\n"},e);let i=[];for(let n=-t.quiet;n<t.dimension+t.quiet;n+=2){let r=[];for(let i=-t.quiet;i<t.dimension+t.quiet;i++){let s=t.getModule(i,n)?!t.invert:t.invert,o=(n+1<t.dimension?t.getModule(i,n+1):0)?!t.invert:t.invert,l=(s?1:0)|(o?2:0),a=e.segments[l];r.push(a)}i.push(r.join(""))}return i.join(e.sep)}function A(t,e){e=Object.assign({segments:[" ","▘","▝","▀","▖","▌","▞","▛","▗","▚","▐","▜","▄","▙","▟","█"],sep:"\n"},e);let i=[];for(let n=-t.quiet;n<t.dimension+t.quiet;n+=2){let r=[];for(let i=-t.quiet;i<t.dimension+t.quiet;i+=2){let s;s=0|((t.getModule(i,n)?!t.invert:t.invert)?1:0)|(((i+1<t.dimension?t.getModule(i+1,n):0)?!t.invert:t.invert)?2:0)|(((n+1<t.dimension?t.getModule(i,n+1):0)?!t.invert:t.invert)?4:0)|(((n+1<t.dimension&&i+1<t.dimension?t.getModule(i+1,n+1):0)?!t.invert:t.invert)?8:0);let o=e.segments[s];r.push(o)}i.push(r.join(""))}return i.join(e.sep)}function v(t,e){e=Object.assign({moduleRound:null,finderRound:null,alignmentRound:null,white:!1,moduleSize:1},e);let i=`${-t.quiet-e.moduleSize/2}`,n=`${2*(t.quiet+e.moduleSize/2)+t.dimension-1}`,r=[];r.push('<?xml version="1.0"?>'),// viewport-fill=\"white\" 
r.push(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" viewBox="${i} ${i} ${n} ${n}" shape-rendering="crispEdges">`),r.push(`<title>${t.text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;").replace(/\'/g,"&apos;")}</title>`),//lines.push(`<desc>${escape(matrix.text)}</desc>`);
r.push("<defs>"),// module data bit (dark)
r.push(`<rect id="b" x="${-e.moduleSize/2}" y="${-e.moduleSize/2}" width="${e.moduleSize}" height="${e.moduleSize}" rx="${.5*(e.moduleRound||0)*e.moduleSize}" />`),e.white&&r.push('<path id="w" d="" visibility="hidden" />'),null!=e.finderRound?(// Hide finder module, use finder part
r.push('<path id="f" d="" visibility="hidden" />'),e.white&&r.push('<path id="fw" d="" visibility="hidden" />'),r.push(`<g id="fc"><rect x="-3" y="-3" width="6" height="6" rx="${3*e.finderRound}" stroke="currentColor" stroke-width="1" fill="none" /><rect x="-1.5" y="-1.5" width="3" height="3" rx="${1.5*e.finderRound}" /></g>`),r.push(`<g id="fc"><rect x="-3" y="-3" width="6" height="6" rx="${3*e.finderRound}" stroke="currentColor" stroke-width="1" fill="none" /><rect x="-1.5" y="-1.5" width="3" height="3" rx="${1.5*e.finderRound}" /></g>`)):(// Use normal module for finder module, hide finder part
r.push('<use id="f" xlink:href="#b" />'),e.white&&r.push('<use id="fw" xlink:href="#w" />'),r.push('<path id="fc" d="" visibility="hidden" />')),null!=e.alignmentRound?(// Hide alignment module, use alignment part
r.push('<path id="a" d="" visibility="hidden" />'),e.white&&r.push('<path id="aw" d="" visibility="hidden" />'),r.push(`<g id="ac"><rect x="-2" y="-2" width="4" height="4" rx="${2*e.alignmentRound}" stroke="currentColor" stroke-width="1" fill="none" /><rect x="-0.5" y="-0.5" width="1" height="1" rx="${.5*e.alignmentRound}" /></g>`)):(// Use normal module for alignment module, hide alignment part
r.push('<use id="a" xlink:href="#b" />'),e.white&&r.push('<use id="aw" xlink:href="#w" />'),r.push('<path id="ac" d="" visibility="hidden" />')),r.push("</defs>");for(let i=0;i<t.dimension;i++)for(let n=0;n<t.dimension;n++){let s=t.identifyModule(n,i),o=t.getModule(n,i);t.invert&&(o=!o);let l=o?"b":"w";"Fi"==s||"FI"==s?l=o?"f":"fw":("Al"==s||"AL"==s)&&(l=o?"a":"aw"),(o||e.white)&&r.push(`<use x="${n}" y="${i}" xlink:href="#${l}" />`)}// Draw finder/alignment as whole parts (define to nothing if drawing as modules)
for(let e=0;e<t.dimension;e++)for(let i=0;i<t.dimension;i++){let n=t.identifyModule(i,e),s=null;"FI"==n?s="fc":"AL"==n&&(s="ac"),null!=s&&r.push(`<use x="${i}" y="${e}" xlink:href="#${s}" />`)}r.push("</svg>");let s=r.join("\n");return s}function _(t,e){return"data:image/svg+xml,"+encodeURIComponent(v(t,e))}function O(t,e){e=Object.assign({scale:8,alpha:!1,width:null,height:null},e);let i=t.dimension+2*t.quiet;null===e.width&&(e.width=Math.floor(i*e.scale)),null===e.height&&(e.height=e.width);let n=Array(e.width*e.height).fill(null);for(let r=0;r<e.height;r++){let s=Math.floor(r*i/e.height)-t.quiet;for(let o=0;o<e.width;o++){let l;let a=Math.floor(o*i/e.width)-t.quiet,d=t.getModule(a,s);l=t.invert?d?[255,255,255,255]:[0,0,0,0]:d?[0,0,0,255]:[255,255,255,0],n[r*e.width+o]=l}}let r=// Generate a bitmap from an array of [R,G,B] or [R,G,B,A] pixels
function(t,e,i,n=!1){let r=n?32:24,s={BITMAPCOREHEADER:12,BITMAPINFOHEADER:40,BITMAPV2INFOHEADER:52,BITMAPV3INFOHEADER:56,BITMAPV4HEADER:108,BITMAPV5HEADER:124},o=n?"BITMAPV4HEADER":"BITMAPCOREHEADER";if(!s.hasOwnProperty(o))throw`Unknown BMP header version: ${o}`;let l=s[o],a=4*Math.floor((e*Math.floor((r+7)/8)+3)/4),d=a*Math.abs(i),u=14+l,c=u+d,h=new ArrayBuffer(c),f=new DataView(h);if(// Write 14-byte BITMAPFILEHEADER
f.setUint8(0,66),f.setUint8(1,77),f.setUint32(2,c,!0),f.setUint16(6,0,!0),f.setUint16(8,0,!0),f.setUint32(10,u,!0),l==s.BITMAPCOREHEADER?(f.setUint32(14,l,!0),f.setUint16(18,e,!0),f.setInt16(20,i,!0),f.setUint16(22,1,!0),f.setUint16(24,r,!0)):l>=s.BITMAPINFOHEADER&&(f.setUint32(14,l,!0),f.setUint32(18,e,!0),f.setInt32(22,i,!0),f.setUint16(26,1,!0),f.setUint16(28,r,!0),f.setUint32(30,n?3:0,!0),f.setUint32(34,d,!0),f.setUint32(38,2835,!0),f.setUint32(42,2835,!0),f.setUint32(46,0,!0),f.setUint32(50,0,!0)),l>=s.BITMAPV2INFOHEADER&&(f.setUint32(54,n?16711680:0,!0),f.setUint32(58,n?65280:0,!0),f.setUint32(62,n?255:0,!0)),l>=s.BITMAPV3INFOHEADER&&f.setUint32(66,n?4278190080:0,!0),l>=s.BITMAPV4HEADER){let t="Win ";// "BGRs";       // @ 70 DWORD bCSType
f.setUint8(70,t.charCodeAt(0)),f.setUint8(71,t.charCodeAt(1)),f.setUint8(72,t.charCodeAt(2)),f.setUint8(73,t.charCodeAt(3)),// @74 sizeof(CIEXYZTRIPLE)=36 (can be left empty for "Win ")
f.setUint32(110,0,!0),f.setUint32(114,0,!0),f.setUint32(118,0,!0)}l>=s.BITMAPV5HEADER&&(f.setUint32(122,4,!0),f.setUint32(126,0,!0),f.setUint32(130,0,!0),f.setUint32(134,0,!0));// If there was one, write the palette here (fileHeaderSize + bmpHeaderSize)
// Write pixels
for(let r=0;r<i;r++){let s=u+(i-1-r)*a;for(let i=0;i<e;i++){let o=t[r*e+i];f.setUint8(s+0,o[2]),f.setUint8(s+1,o[1]),f.setUint8(s+2,o[0]),n?(f.setUint8(s+3,o[3]),s+=4):s+=3}}return h}(n,e.width,e.height,e.alpha);return r}function b(t,e){let i=O(t,e),n=btoa(new Uint8Array(i).reduce((t,e)=>t+String.fromCharCode(e),""));return"data:image/bmp;base64,"+n}window.addEventListener("load",()=>a.render()),a.addHandlerSubmit(function(t){// Generate QR
let e=S.generate(t),i=S.render("svg-uri",e);h.render(i)}),h.addHandlerIcon(function(){a.render()});//# sourceMappingURL=index.f251b61e.js.map

//# sourceMappingURL=index.f251b61e.js.map
