import React from "react";
import "../ProductsPanel.css";

const CategoriesNav = ({ searchValue, setSearchValue }) => {
    return (
        <div className="productsPanelSideNav">
            <input
                type="text"
                placeholder="Szukaj produktu"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div id="categoriesSideNav"></div>
        </div>
    );
};

export default CategoriesNav;
