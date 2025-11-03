document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navbar");
    if (!navbarContainer) return;

    const inHtmlFolder = window.location.pathname.includes("/html/");
    const fetchPrefix = inHtmlFolder ? "../" : "./";

    fetch(`${fetchPrefix}navbar.html`)
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.text();
        })
        .then(html => {
            navbarContainer.innerHTML = html;

            const linkPrefix = inHtmlFolder ? "../" : "";
            navbarContainer.querySelectorAll("a").forEach(a => {
                const href = a.getAttribute("href");
                if (href && (href.startsWith("html/") || href === "index.html")) {
                    a.setAttribute("href", linkPrefix + href);
                }
            });

            // Highlight active link
            const currentFile = window.location.pathname.split("/").pop() || "index.html";
            navbarContainer.querySelectorAll("a").forEach(a => {
                if (a.getAttribute("href")?.endsWith(currentFile)) {
                    a.classList.add("active");
                }
            });
        })
        .catch(err => console.error("Navbar load error:", err));
});
