Date.prototype.formatDate = function(f, lang) {
    lang = typeof(lang)!='undefined' ? lang:'en';
    var has_datepicker = (typeof(jQuery)!='undefined' && typeof(jQuery.datepicker)!='undefined');
    var date_options   = (has_datepicker && typeof(jQuery.datepicker.regional[lang])!='undefined') ?  jQuery.datepicker.regional[lang]:{closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su",
"Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};

    f = (typeof(f)=='undefined') ? date_options.dateFormat:f;
    var out = f;
    var keys = ['yy','mm','dd','y','m','d','H','h','i','s','MM','M','DD','D','@','oo','o'];
    for(var k in keys)
    {
        var f_ = keys[k];
        if (f.indexOf(f_)!=-1)
        {
            f = f.split(f_).join('');
            switch(f_)
            {
                case 'yy':
                    out = out.split(f_).join(this.getFullYear());
                break;
                case 'mm':
                    var m = this.getMonth()+1;
                    m = m<10 ? '0'+m:m;
                    out = out.split(f_).join(m);
                break;
                case 'dd':
                    var d = this.getDate();
                    d = d<10 ? '0'+d:d;
                    out = out.split(f_).join(d);
                break;
                case 'y':
                    out = out.split(f_).join(this.getFullYear().toString().substr(2));
                break;
                case 'm':
                    var m = this.getMonth()+1;
                    out = out.split(f_).join(m);
                break;
                case 'd':
                    var d = this.getDate();
                    out = out.split(f_).join(d);
                break;
                case 'H':
                    var h = this.getHours();
                    h = h<10 ? '0'+h:h;
                    out = out.split(f_).join(h);
                break;
                case 'h':
                    var h = this.getHours();
                    out = out.split(f_).join(h);
                break;
                case 'i':
                    var m = this.getMinutes();
                    m = m<10 ? '0'+m:m;
                    out = out.split(f_).join(m);
                break;
                case 's':
                    var s = this.getSeconds();
                    s = s<10 ? '0'+s:s;
                    out = out.split(f_).join(s);
                break;
                case 'MM':
                    out = out.split(f_).join(date_options.monthNames[this.getMonth()]);
                break;
                case 'M':
                    out = out.split(f_).join(date_options.monthNamesShort[this.getMonth()]);
                break;
                case 'DD':
                    out = out.split(f_).join(date_options.dayNames[this.getDay()]);
                break;
                case 'D':
                    out = out.split(f_).join(date_options.dayNamesShort[this.getDay()]);
                break;
                case '@':
                    out = out.split(f_).join(Math.round(this.getTime()/1000));
                break;
                case 'oo':
                    var d = new Date();
                    d.setTime(this.getTime());
                    d.setMonth(1); d.setDate(1); d.setHours(0); d.setMinutes(0); d.setSeconds(0); d.setMilliseconds(0);
                    var diff = Math.ceil((this.getTime()-d.getTime())/86400000)+'';
                    while(diff.length<3)
                    {
                        diff = '0'+diff;
                    }
                    out = out.split(f_).join(diff);
                break;
                case 'o':
                    var d = new Date();
                    d.setTime(this.getTime());
                    d.setMonth(1); d.setDate(1); d.setHours(0); d.setMinutes(0); d.setSeconds(0); d.setMilliseconds(0);
                    var diff = Math.ceil((this.getTime()-d.getTime())/86400000)+'';
                    out = out.split(f_).join(diff);
                break;
            }
        }
    }
    
    return out;
};