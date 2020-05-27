const puppeteer = require ('puppeteer');

var latestScrapedUrl = '';
async function scrapeLatestNews(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const latestNews = await page.evaluate(() => 
        Array.from(document.querySelectorAll('article > a'), 
        element => element.href));

    await page.close();


    for(var i = 0; i < latestNews.length; i++){
        if(latestNews[i]==latestScrapedUrl)
            break;
        const page2 = await browser.newPage();
        //await page.goto(latestNews[i]);
        await page2.goto('file:///C:/Users/rijad/Desktop/a.html');
        const commentsCounter = await page2.evaluate(() => 
        Array.from(document.querySelectorAll('.nolink.brojComm'), 
        element => element.textContent));

        const sharedCounter = await page2.evaluate(() => 
        Array.from(document.querySelectorAll('.brojShareova > .num'), 
        element => element.textContent));

        console.log(commentsCounter[0]);
        console.log(sharedCounter[0]);

        //todo
        // spasi top 20 novih linkova sa imenom clanka i kategorijom
        // spasi clanak content, slike, shared i comments
        // spasi comments sa usernames, timestamps, upvotes i downvotes
        // checkiraj latest articles jesu trending (svakih ~5 min)
        // checkiraj imaju li botovi u komentarima
        // dodaj scraping profila flaganih bot korisnika i checkiraj potvrdi po ostalim commentima
        // dodaj listu proxyija za scrapeanju umjesto home ip adrese
        // dodaj checking da li je klix blokirao ip i koristi sljedecu iz liste

        
    }

    browser.close();
    
    if(latestScrapedUrl==''){
        latestScrapedUrl = latestNews[0];
    }
}
//scrapeLatestNews('https://www.klix.ba/najnovije');
scrapeLatestNews('file:///C:/Users/rijad/Desktop/Najnovije%20-%20Klix.ba.html');