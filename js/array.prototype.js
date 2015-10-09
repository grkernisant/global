Array.prototype.contains = function(value) {
    var found = false;
    var i = 0;
    var l = this.length;
    while (i<l && !found)
    {
    	found = this[i]==value;
    	i++;
    }

    return found;
};

Array.prototype.indexOf = function(value, start) {
    start = typeof(start)!='undefined' ? start:0;

    var found = false;
    var i = start;
    var l = this.length;
    while (i<l && !found)
    {
    	found = this[i]==value;
    	i++;
    }

    return found ? (i-1):false;
};