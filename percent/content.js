let iter = 7
setTimeout(main, 1000)
setInterval(sarane_haghighi, 1000)

function main(){
    
    if(iter-- <= 0) return;
    farabourse = false;
    console.log("Trying: "+iter)
    yesterday_price = document.evaluate('/html/body/div[4]/form/div[3]/div[2]/div[1]/div[2]/div[1]/table/tbody/tr[4]/td[3]',document, null, XPathResult.STRING_TYPE, null).stringValue
    if (yesterday_price == ''){
        farabourse = true;
        yesterday_price = document.evaluate('/html/body/div[4]/form/div[3]/div[2]/div[1]/div[3]/div[1]/table/tbody/tr[4]/td[3]',document, null, XPathResult.STRING_TYPE, null).stringValue
    }

    if (yesterday_price == ''){
        yesterday_price = document.querySelector("#d05 > div > div").textContent
    }

    console.log(yesterday_price)
    yesterday_price = parseInt( yesterday_price.replace(',', '') )
    if(yesterday_price>0){}
    else{ setTimeout(main, 1000); return }

    if(farabourse)
        max_price_selector = '/html/body/div[4]/form/div[3]/div[2]/div[1]/div[3]/div[2]/table/tbody/tr[2]/td[2]'
    else
        max_price_selector = '/html/body/div[4]/form/div[3]/div[2]/div[1]/div[2]/div[2]/table/tbody/tr[2]/td[2]'
        
    max_price = document.evaluate(max_price_selector,document, null, XPathResult.STRING_TYPE, null).stringValue
    main_sw = false
    if (max_price == ''){
        main_sw = true
        max_price = document.querySelector("#PRange1 > div > div").textContent
    }

    console.log(max_price)
    max_price = parseInt( max_price.replace(',', '') )
    if(max_price>0){}
    else{ setTimeout(main, 1000) ; return }
    
    allowed_percentage = Math.ceil(100*(max_price - yesterday_price) / yesterday_price)
    if(main_sw)
        document.querySelector("#PRange1 > div > div").innerHTML += '<b> ('+allowed_percentage+'%) </b>'
    else
        document.evaluate(max_price_selector,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML += '<b> ('+allowed_percentage+'%) </b>'

}

function sarane_haghighi(){
    //console.log("Trying Sarane ")
    real_valume = document.querySelector("#e0 > div:nth-child(1)").attributes['title']
    if (!real_valume)
        real_valume = document.querySelector("#e0 > div > div:nth-child(1)").attributes['title']
        
    real_valume = real_valume.value
    real_valume = parseInt(real_valume.replaceAll(',', ''))

    real_count = document.querySelector("#e5")
    if(!real_count){
        real_count = document.querySelector("#TopBox > div.box2.zi2 > div:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(2) > div > div")
    }
    real_count = parseInt(real_count.textContent.replaceAll(',',''))

    price = document.querySelector("#d03")
    if(!price){
        price = document.querySelector("#d03 > div > div")
    }
    price = parseInt(price.textContent.replaceAll(',', ''))

    sarane = parseInt(( real_valume / real_count ) * price / 10)
    // sarane = Intl.NumberFormat().format(sarane)
    units = ['', 'K', 'M', 'B']
    unit = 0
    while(sarane > 1000 && unit<3){
        sarane /= 1000;
        unit ++
    }
    sarane = Intl.NumberFormat( ).format(parseInt(sarane))
    sarane = ' {<span id="additional_info">' + sarane + ' ' + units[unit] + 'T</span>} '

    try{
        document.querySelector("#e5").innerHTML = real_count + '<b>'+sarane+'</b>'
    }
    catch{
        document.querySelector("#TopBox > div.box2.zi2 > div:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(2) > div > div").innerHTML = real_count + '<b>'+sarane+'</b>'
    }
    
    vazn_kharidar()
}


function vazn_kharidar(){
    hajm_foroosh = document.querySelector("#e3 > div:nth-child(1)").attributes['title']
    if(!hajm_foroosh){
        hajm_foroosh = document.querySelector("#e3 > div > div:nth-child(1)").attributes['title']
    }
    hajm_foroosh = parseInt(hajm_foroosh.textContent.replaceAll(',', ''))
    
    tedad_foroosh = document.querySelector("#e8")
    if(!tedad_foroosh){
        tedad_foroosh = document.querySelector("#TopBox > div.box2.zi2 > div:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(3) > div > div")
    }
    tedad_foroosh = parseInt(tedad_foroosh.textContent.replaceAll(',', ''))

    hajm_kharid = document.querySelector("#e0 > div:nth-child(1)").attributes['title']
    if(!hajm_kharid){
        hajm_kharid = document.querySelector("#e0 > div > div:nth-child(1)").attributes['title']
    }
    hajm_kharid = parseInt(hajm_kharid.textContent.replaceAll(',', ''))
    
    try{tedad_kharid = parseInt(document.querySelector("#e5").textContent.replaceAll(',', ''))}
    catch{tedad_kharid = parseInt(document.querySelector("#TopBox > div.box2.zi2 > div:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(2) > div > div").textContent.replaceAll(',', ''))}
        
        

    vazn = (hajm_kharid / tedad_kharid) / (hajm_foroosh / tedad_foroosh ) 
    vazn = Intl.NumberFormat('en', {maximumFractionDigits: 2}).format(vazn)
    document.getElementById('additional_info').innerHTML += ' | ' + vazn
    

}