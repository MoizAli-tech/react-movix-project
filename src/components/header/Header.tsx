import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";
import ContentWrapper from "../contentWrapper/contentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [query, setQuery] = useState<string>("");
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    function controlNavbar() {


        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide")
            } else {
                setShow("show")
            }
        } else {
            setShow("top")
        }
        setLastScrollY(window.scrollY)
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);

        // return () => {
        //     window.removeEventListener("scroll", controlNavbar);
        // };
    }, [lastScrollY])


    const searchQueryHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter" && query.length > 0) {
            navigate(`search/${query}`)
            setTimeout(() => {
                setShowSearch(false);
            }, 1000)
        }

    }

    function navigateHandler(params: string) {
        switch (params) {
            case "movie":
                navigate("/explore/movie")
                break;
            case "tv":
                navigate("/explore/tv")
                break;
            default:
                console.error("Please enter a valid path")

        }

        setMobileMenu(false);
    }

    function openSearch() {
        setMobileMenu(false);
        setShowSearch(true);
    }

    function openMobileMenu() {
        setMobileMenu(true);
        setShowSearch(false);
    }

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="log" onClick={() => { navigate("/") }}>
                    <img src={logo} alt="" />
                </div>

                <ul className="menuItems">
                    <li className="menuItem" onClick={() => { navigateHandler("movie") }}>Movies</li>
                    <li className="menuItem" onClick={() => { navigateHandler("tv") }}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />

                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <GiHamburgerMenu onClick={openMobileMenu} />
                    )}


                </div>
            </ContentWrapper>
            {
                showSearch &&
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input type="text"
                                placeholder="Search for a movie or tv show"
                                onKeyUp={(e) => searchQueryHandler(e)}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        <VscChromeClose onClick={() => { setShowSearch(false) }} />
                    </ContentWrapper>

                </div>

            }

        </header>

    )
}

export default Header