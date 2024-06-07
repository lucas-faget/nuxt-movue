import type { Config } from "tailwindcss";

export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: {
                title: ['"Bebas Neue"', "sans-serif"],
                text: ["Quicksand", "sans-serif"],
            },
        },
    },
};
