interface Movie {
    "#TITLE": string;
    "#IMG_POSTER": string;
    "#YEAR": number;
    "#IMDB_ID": string;
    "#IMDB_URL": string;
}

interface ApiResponse {
    ok: boolean;
    description: Movie[];
    error_code: number;
}

async function getAll(path: string): Promise<Movie[]> {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("Request error");

        const data: ApiResponse = await response.json();
        return data.description;
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

const showData = (movies: Movie[]): void => {
    const section = document.querySelector("section") as HTMLElement;

    const content = movies.map(movie => `
        <article class="card">
            <img
                src="${movie["#IMG_POSTER"]}"
                alt="${movie["#TITLE"]}"
                loading="lazy"
            >
            <h3>${movie["#TITLE"]} (${movie["#YEAR"]})</h3>
        </article>
    `).join("");

    section.innerHTML = content;
};

const url = "https://imdb.iamidiotareyoutoo.com/search?q=Spiderman";

const data = await getAll(url);
showData(data);

