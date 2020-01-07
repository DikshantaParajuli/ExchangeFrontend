$(function () {

    
    let base_url = 'http://localhost:3000/';
    
       $.ajaxSetup({
        xhrFields: {
            withCredentials: true
            
        },
        crossDomain: true
        
        
        
    });
    
    
    $.ajax({
        
        type: 'GET',
        url: base_url + 'admin',
        success: function(count) {
            let usercount = count.clientcount
            let eventcount = count.eventcount
            let requestcount = count.requestcount
            let noticecount =count.noticecount
            
            //count.append(usercount);
            countnumber.append(eventcount);
            countnumbera.append(usercount);
            countnumberb.append(requestcount);
            countnumberc.append(noticecount)
            console.log(eventcount);
            
        },
        error: function(){
            alert('Count delviered faild');
        }
        
        
    });
    
});

