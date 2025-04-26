import { Resend } from "resend";

try {
    const data = await fetch("https://www.tesla.com/inventory/api/v4/inventory-results?query={%22query%22:{%22model%22:%22my%22,%22condition%22:%22new%22,%22options%22:{},%22arrangeby%22:%22Price%22,%22order%22:%22asc%22,%22market%22:%22TR%22,%22language%22:%22tr%22,%22super_region%22:%22north%20america%22,%22lng%22:32.8554,%22lat%22:39.9107,%22zip%22:%2206680%22,%22range%22:0,%22region%22:%22TR%22},%22offset%22:0,%22count%22:24,%22outsideOffset%22:0,%22outsideSearch%22:false,%22isFalconDeliverySelectionEnabled%22:true,%22version%22:%22v2%22}", {
        "headers": {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:138.0) Gecko/20100101 Firefox/138.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en,en-US;q=0.5",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Priority": "u=0, i",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
        },
        "method": "GET",
    }).then(r => r.json());
    if (data && data.total_matches_found > 0) {
        sendEmail(data);
    }
} catch (error) {
    sendEmail({ error });
    console.error(error);
}

async function sendEmail(resData = {}) {
    let subject = 'Tesla Stok - Var (Kosssssss)';
    let html = `<p>${JSON.stringify(resData)}</p>`;

    if (resData.error) {
        subject = 'Tesla Stok - HATA';
        html = `<p>${resData.error}</p>`;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
        from: "tesla-cronjob@trylab.net",
        to: "bugra9@gmail.com",
        subject,
        html,
    });

    if (!error) {
        console.log('email sent');
    } else {
        console.log('An error occured while sending email');
    }
}
