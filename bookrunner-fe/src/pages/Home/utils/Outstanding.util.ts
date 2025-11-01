const server = import.meta.env.VITE_SERVER

export const outstanding = async () => {
    try {
        console.log("Bắt đầu gửi request outStanding...");

        const response = await fetch(`${server}/api/novels/outstanding`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Lỗi HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Phản hồi từ server:", data);

        return data;
    } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
        return null;
    }

}