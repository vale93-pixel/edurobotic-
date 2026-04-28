// netlify/functions/ask.js
exports.handler = async function(event, context) {
    // Recupera la chiave dalle "Environment Variables" di Netlify
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Chiave API non configurata nel server." })
        };
    }

    try {
        // Chiamata sicura a Gemini dal server
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: event.body
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Errore di comunicazione con il server AI." })
        };
    }
};
