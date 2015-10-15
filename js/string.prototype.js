String.prototype.CAMEL_CASE_UPPER_FIRST_ON  = true;
String.prototype.CAMEL_CASE_UPPER_FIRST_OFF = false;
String.prototype.CHAR_CODE_NBSP = 38;

String.prototype.ltrim = function(c) {
    var remove_chars = new Array("\r\n", "\r", "\n", "\t", "\u00A0", ' ');
    remove_chars.push(this.CHAR_CODE_NBSP);
    if (typeof(c)!='undefined') {
        remove_chars.push(c);
    }
    var str = this.split('');
    while(str.length && myArrayClass.contains(remove_chars, str[0])) {
        str.shift();
    }

    return str.length ? str.join(''):''; 
}

String.prototype.repeat = function(n) {
    if (typeof(n)=='undefined')
    {
        n = 1;
    } else if (isNaN(n)) {
        n = 1;
    } else if (n<0){
        n = Math.abs(n);
        n = n>0 ? Math.round(n):1;
    }

    var str = this.toString();
    var i = 1;
    while (i<n)
    {
        str += this.toString();
        i++;
    }

    return str;
};

String.prototype.rtrim = function(c) {
    var remove_chars = new Array("\r\n", "\r", "\n", "\t", "\u00A0", ' ');
    remove_chars.push(String.fromCharCode(this.CHAR_CODE_NBSP));
    if (typeof(c)!='undefined') {
        remove_chars.push(c);
    }
    var str = this.split('');
    while(str.length && myArrayClass.contains(remove_chars, str[str.length-1])) {
        str.pop();
    }

    return str.length ? str.join(''):''; 
}

String.prototype.toCamelCase = function(uppercase_first) {
    var str = this.toString();
    str = str.replace(/[^a-zA-Z0-9]/, ' ');
    str = str.replace(/\s{2,}/, ' ');
    str = str.trim();

    var camel_case  = str.toUpperCaseWords().split(' ').join('');
    uppercase_first = typeof(uppercase_first)!='undefined' ? uppercase_first:this.CAMEL_CASE_UPPER_FIRST_ON;
    if (!uppercase_first) {
        var camel_case_ = camel_case.split('');
        camel_case_[0]  = camel_case_[0].toLowerCase();
        camel_case      = camel_case_.join('');
    }

    return camel_case;
};

String.prototype.toUpperCaseFirst = function() {
    var uc_first = '';

    if (this.length>0)
    {
        uc_first = this.charAt(0).toUpperCase();
        uc_first+= this.substr(1).toLowerCase();
    } 

    return uc_first;
};

String.prototype.toUpperCaseWords = function() {
    var str = this.toString().split(' ');
    var l = str.length;
    var i = 0;
    while(i<l)
    {
        str[i] = str[i].toUpperCaseFirst();
        i++;
    } 

    return str.join(' ');
};

String.prototype.trim = function(c) {
    var str = this.toString();
    str = typeof(c)!='undefined' ? str.ltrim(c):str.ltrim();
    if (str.length) {
        str = typeof(c)!='undefined' ? str.rtrim(c):str.rtrim();
    }

    return str; 
}