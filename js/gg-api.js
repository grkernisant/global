var GG_API = {
    extract: function(data, response_type)
    {
        var found = false;
        if (typeof(data['response'])!='undefined')
        {
            var l = data['response'].length;
            var i = 0;
            while(i<l)
            {
                var d = data['response'][i]; 
                if (typeof(d['__type'])!='undefined' && typeof(d['__status'])!='undefined' && d['__type']==response_type && d['__status']<500)
                {
                    return d;
                }
                i++;
            }
        }

        return undefined;
    }
};