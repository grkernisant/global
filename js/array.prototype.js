var myArrayClass = {
	contains: function(arr, value) {
		var found = false;
	    var i = 0;
	    var l = arr.length;
	    while (i<l && !found) {
	    	found = arr[i]==value;
	    	i++;
	    }
	
	    return found;
	},
	indexOf: function(arr, value) {
		start = typeof(start)!='undefined' ? start:0;

	    var found = false;
	    var i = start;
	    var l = arr.length;
	    while (i<l && !found) {
	    	found = arr[i]==value;
	    	i++;
	    }
	
	    return found ? (i-1):false;	
	}
};
