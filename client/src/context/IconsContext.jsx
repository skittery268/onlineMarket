import { createContext, useContext, useEffect, useState } from "react";

const IconsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useIcons = () => useContext(IconsContext);

const api_url = "https://onlinemarket-o6s5.onrender.com/api/icons";

export const IconsProvider = ({ children }) => {
    const [icons, setIcons] = useState({});

    const getAllIcons = async () => {
        try {
            const res = await fetch(api_url);

            const data = await res.json();

            setIcons(data[0]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (Object.keys(icons).length === 0) getAllIcons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <IconsContext.Provider value={{ icons }}>
            {children}
        </IconsContext.Provider>
    )
}