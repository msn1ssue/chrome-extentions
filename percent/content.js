let iter = 7
setTimeout(main, 1000)

function main(){
    
    if(iter-- <= 0) return;

    console.log("Trying: "+iter)
    yesterday_price = document.evaluate('/html/body/div[4]/form/div[3]/div[2]/div[1]/div[2]/div[1]/table/tbody/tr[4]/td[3]',document, null, XPathResult.STRING_TYPE, null).stringValue
    yesterday_price = parseInt( yesterday_price.replace(',', '') )
    if(yesterday_price>0){
        
    }
    else{ setTimeout(main, 1000); return }
    
    
    max_price = document.evaluate('/html/body/div[4]/form/div[3]/div[2]/div[1]/div[2]/div[2]/table/tbody/tr[2]/td[2]',document, null, XPathResult.STRING_TYPE, null).stringValue
    max_price = parseInt( max_price.replace(',', '') )
    if(max_price>0){
        
    }
    else{ setTimeout(main, 1000) ; return }
    
    allowed_percentage = Math.ceil(100*(max_price - yesterday_price) / yesterday_price)
    document.evaluate('/html/body/div[4]/form/div[3]/div[2]/div[1]/div[2]/div[2]/table/tbody/tr[2]/td[2]',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML += '<b> ('+allowed_percentage+'%) </b>'
}