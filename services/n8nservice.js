import axios from "axios";

export async function triggerN8N(payload) {
    if (!process.env.N8N_WEBHOOK_URL) {
        throw new Error("N8N_WEBHOOK_URL missing in .env");
    }

    console.log("Sending payload to n8n:", payload);

    try {
        const response = await axios.post(
            process.env.N8N_WEBHOOK_URL,
            payload,
            {
                headers: { "Content-Type": "application/json" },
                timeout: 30000,
            }
        );

        console.log("n8n Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error sending to n8n:", error.message);

        return {
            success: false,
            message: "Failed to send data to n8n",
            error: error.response?.data || error.message
        };
    }
}
