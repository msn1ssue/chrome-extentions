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
    console.log(yesterday_price)
    yesterday_price = parseInt( yesterday_price.replace(',', '') )
    if(yesterday_price>0){}
    else{ setTimeout(main, 1000); return }

    if(farabourse)
        max_price_selector = '/html/body/div[4]/form/div[3]/div[2]/div[1]/div[3]/div[2]/table/tbody/tr[2]/td[2]'
    else
        max_price_selector = '/html/body/div[4]/form/div[3]/div[2]/div[1]/div[2]/div[2]/table/tbody/tr[2]/td[2]'
        
    max_price = document.evaluate(max_price_selector,document, null, XPathResult.STRING_TYPE, null).stringValue
    console.log(max_price)
    max_price = parseInt( max_price.replace(',', '') )
    if(max_price>0){}
    else{ setTimeout(main, 1000) ; return }
    
    allowed_percentage = Math.ceil(100*(max_price - yesterday_price) / yesterday_price)
    document.evaluate(max_price_selector,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML += '<b> ('+allowed_percentage+'%) </b>'

}

function sarane_haghighi(){
    //console.log("Trying Sarane ")
    real_valume = document.querySelector("#e0 > div:nth-child(1)").attributes['title'].value
    real_valume = parseInt(real_valume.replaceAll(',', ''))

    real_count = parseInt(document.querySelector("#e5").textContent.replaceAll(',',''))
    price = parseInt(document.querySelector("#d03").textContent.replaceAll(',', ''))

    sarane = parseInt(( real_valume / real_count ) * price / 10)
    // sarane = Intl.NumberFormat().format(sarane)
    units = ['', 'K', 'M', 'B']
    unit = 0
    while(sarane > 1000 && unit<3){
        sarane /= 1000;
        unit ++
    }
    sarane = Intl.NumberFormat( ).format(parseInt(sarane))
    sarane = ' {' + sarane + ' ' + units[unit] + 'T} '
    document.querySelector("#e5").innerHTML = real_count + '<b>'+sarane+'</b>'
}