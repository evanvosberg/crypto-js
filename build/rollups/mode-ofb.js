/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(h,k){var f={},m=f.lib={},j=function(){},q=m.Base={extend:function(a){j.prototype=this;var d=new j;a&&d.mixIn(a);d.hasOwnProperty("init")||(d.init=function(){d.$super.init.apply(this,arguments)});d.init.prototype=d;d.$super=this;return d},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var d in a)a.hasOwnProperty(d)&&(this[d]=a[d]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
l=m.WordArray=q.extend({init:function(a,d){a=this.words=a||[];this.sigBytes=d!=k?d:4*a.length},toString:function(a){return(a||s).stringify(this)},concat:function(a){var d=this.words,b=a.words,c=this.sigBytes;a=a.sigBytes;this.clamp();if(c%4)for(var g=0;g<a;g++)d[c+g>>>2]|=(b[g>>>2]>>>24-8*(g%4)&255)<<24-8*((c+g)%4);else for(g=0;g<a;g+=4)d[c+g>>>2]=b[g>>>2];this.sigBytes+=a;return this},clamp:function(){var a=this.words,d=this.sigBytes;a[d>>>2]&=4294967295<<32-8*(d%4);a.length=h.ceil(d/4)},clone:function(){var a=
q.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var d=[],b=function(b){var c=987654321;return function(){c=36969*(c&65535)+(c>>16)&4294967295;b=18E3*(b&65535)+(b>>16)&4294967295;var a=(c<<16)+b&4294967295,a=a/4294967296+0.5;return a*(0.5<h.random()?1:-1)}},c=0,g;c<a;c+=4){var e=b(4294967296*(g||h.random()));g=987654071*e();d.push(4294967296*e()|0)}return new l.init(d,a)}}),p=f.enc={},s=p.Hex={stringify:function(a){var d=a.words;a=a.sigBytes;for(var b=[],c=0;c<a;c++){var g=
d[c>>>2]>>>24-8*(c%4)&255;b.push((g>>>4).toString(16));b.push((g&15).toString(16))}return b.join("")},parse:function(a){for(var d=a.length,b=[],c=0;c<d;c+=2)b[c>>>3]|=parseInt(a.substr(c,2),16)<<24-4*(c%8);return new l.init(b,d/2)}},r=p.Latin1={stringify:function(a){var d=a.words;a=a.sigBytes;for(var b=[],c=0;c<a;c++)b.push(String.fromCharCode(d[c>>>2]>>>24-8*(c%4)&255));return b.join("")},parse:function(a){for(var d=a.length,b=[],c=0;c<d;c++)b[c>>>2]|=(a.charCodeAt(c)&255)<<24-8*(c%4);return new l.init(b,
d)}},v=p.Utf8={stringify:function(a){try{return decodeURIComponent(escape(r.stringify(a)))}catch(d){throw Error("Malformed UTF-8 data");}},parse:function(a){return r.parse(unescape(encodeURIComponent(a)))}},n=m.BufferedBlockAlgorithm=q.extend({reset:function(){this._data=new l.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=v.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var d=this._data,b=d.words,c=d.sigBytes,g=this.blockSize,e=c/(4*g),e=a?
h.ceil(e):h.max((e|0)-this._minBufferSize,0);a=e*g;c=h.min(4*a,c);if(a){for(var t=0;t<a;t+=g)this._doProcessBlock(b,t);t=b.splice(0,a);d.sigBytes-=c}return new l.init(t,c)},clone:function(){var a=q.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});m.Hasher=n.extend({cfg:q.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){n.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&
this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(d,b){return(new a.init(b)).finalize(d)}},_createHmacHelper:function(a){return function(d,b){return(new u.HMAC.init(a,b)).finalize(d)}}});var u=f.algo={};return f}(Math);
CryptoJS.lib.Cipher||function(h){var k=CryptoJS,f=k.lib,m=f.Base,j=f.WordArray,q=f.BufferedBlockAlgorithm,l=k.enc.Base64,p=k.algo.EvpKDF,s=f.Cipher=q.extend({cfg:m.extend(),createEncryptor:function(b,c){return this.create(this._ENC_XFORM_MODE,b,c)},createDecryptor:function(b,c){return this.create(this._DEC_XFORM_MODE,b,c)},init:function(b,c,a){this.cfg=this.cfg.extend(a);this._xformMode=b;this._key=c;this.reset()},reset:function(){q.reset.call(this);this._doReset()},process:function(b){this._append(b);
return this._process()},finalize:function(b){b&&this._append(b);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(b){return{encrypt:function(c,g,e){return("string"==typeof g?d:a).encrypt(b,c,g,e)},decrypt:function(c,g,e){return("string"==typeof g?d:a).decrypt(b,c,g,e)}}}});f.StreamCipher=s.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var r=k.mode={},v=function(b,c,a){var e=this._iv;e?this._iv=h:e=this._prevBlock;for(var d=
0;d<a;d++)b[c+d]^=e[d]},n=(f.BlockCipherMode=m.extend({createEncryptor:function(b,c){return this.Encryptor.create(b,c)},createDecryptor:function(b,c){return this.Decryptor.create(b,c)},init:function(b,c){this._cipher=b;this._iv=c}})).extend();n.Encryptor=n.extend({processBlock:function(b,c){var a=this._cipher,d=a.blockSize;v.call(this,b,c,d);a.encryptBlock(b,c);this._prevBlock=b.slice(c,c+d)}});n.Decryptor=n.extend({processBlock:function(b,c){var a=this._cipher,d=a.blockSize,f=b.slice(c,c+d);a.decryptBlock(b,
c);v.call(this,b,c,d);this._prevBlock=f}});r=r.CBC=n;n=(k.pad={}).Pkcs7={pad:function(b,c){for(var a=4*c,a=a-b.sigBytes%a,d=a<<24|a<<16|a<<8|a,f=[],h=0;h<a;h+=4)f.push(d);a=j.create(f,a);b.concat(a)},unpad:function(b){b.sigBytes-=b.words[b.sigBytes-1>>>2]&255}};f.BlockCipher=s.extend({cfg:s.cfg.extend({mode:r,padding:n}),reset:function(){s.reset.call(this);var b=this.cfg,a=b.iv,b=b.mode;if(this._xformMode==this._ENC_XFORM_MODE)var d=b.createEncryptor;else d=b.createDecryptor,this._minBufferSize=1;
this._mode=d.call(b,this,a&&a.words)},_doProcessBlock:function(b,a){this._mode.processBlock(b,a)},_doFinalize:function(){var b=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){b.pad(this._data,this.blockSize);var a=this._process(!0)}else a=this._process(!0),b.unpad(a);return a},blockSize:4});var u=f.CipherParams=m.extend({init:function(b){this.mixIn(b)},toString:function(b){return(b||this.formatter).stringify(this)}}),r=(k.format={}).OpenSSL={stringify:function(b){var a=b.ciphertext;b=b.salt;
return(b?j.create([1398893684,1701076831]).concat(b).concat(a):a).toString(l)},parse:function(a){a=l.parse(a);var c=a.words;if(1398893684==c[0]&&1701076831==c[1]){var d=j.create(c.slice(2,4));c.splice(0,4);a.sigBytes-=16}return u.create({ciphertext:a,salt:d})}},a=f.SerializableCipher=m.extend({cfg:m.extend({format:r}),encrypt:function(a,c,d,e){e=this.cfg.extend(e);var f=a.createEncryptor(d,e);c=f.finalize(c);f=f.cfg;return u.create({ciphertext:c,key:d,iv:f.iv,algorithm:a,mode:f.mode,padding:f.padding,
blockSize:a.blockSize,formatter:e.format})},decrypt:function(a,c,d,e){e=this.cfg.extend(e);c=this._parse(c,e.format);return a.createDecryptor(d,e).finalize(c.ciphertext)},_parse:function(a,c){return"string"==typeof a?c.parse(a,this):a}}),k=(k.kdf={}).OpenSSL={execute:function(a,c,d,e){e||(e=j.random(8));a=p.create({keySize:c+d}).compute(a,e);d=j.create(a.words.slice(c),4*d);a.sigBytes=4*c;return u.create({key:a,iv:d,salt:e})}},d=f.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:k}),encrypt:function(b,
c,d,e){e=this.cfg.extend(e);d=e.kdf.execute(d,b.keySize,b.ivSize);e.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,e);b.mixIn(d);return b},decrypt:function(b,c,d,e){e=this.cfg.extend(e);c=this._parse(c,e.format);d=e.kdf.execute(d,b.keySize,b.ivSize,c.salt);e.iv=d.iv;return a.decrypt.call(this,b,c,d.key,e)}})}();
CryptoJS.mode.OFB=function(){var h=CryptoJS.lib.BlockCipherMode.extend(),k=h.Encryptor=h.extend({processBlock:function(f,h){var j=this._cipher,k=j.blockSize,l=this._iv,p=this._keystream;l&&(p=this._keystream=l.slice(0),this._iv=void 0);j.encryptBlock(p,0);for(j=0;j<k;j++)f[h+j]^=p[j]}});h.Decryptor=k;return h}();
