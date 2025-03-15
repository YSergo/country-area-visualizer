import React, { useState } from "react";
import countriesData from "./countries_filtered.json";

const CountryCircles = () => {
  const [sortBy, setSortBy] = useState("name");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countries, setCountries] = useState(
    [...countriesData].sort((a, b) => a.name.localeCompare(b.name))
  );

  const handleSort = (criteria) => {
    if (criteria === sortBy) return;

    const sorted = [...countries].sort((a, b) => {
      if (criteria === "name") return a.name.localeCompare(b.name);
      if (criteria === "area") return b.area - a.area;
      return 0;
    });

    setSortBy(criteria);
    setCountries(sorted);
  };

  const toggleSelectCountry = (country) => {
    setSelectedCountries((prev) =>
      prev.some((c) => c.name === country.name)
        ? prev.filter((c) => c.name !== country.name)
        : [...prev, country]
    );
  };

  const getSortedCountries = () => {
    const selectedSet = new Set(selectedCountries.map((c) => c.name));
    const selected = countries.filter((c) => selectedSet.has(c.name));
    const unselected = countries.filter((c) => !selectedSet.has(c.name));
    return [...selected, ...unselected];
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: "26.8px" }}>
        <button
          style={{
            fontSize: "20px",
            backgroundColor: "transparent",
            border: "0",
            color: "white",
            opacity: sortBy === "name" ? 1 : 0.5,
            cursor: "pointer",
          }}
          onClick={() => handleSort("name")}
        >
          Sort by name
        </button>
        <button
          style={{
            fontSize: "20px",
            backgroundColor: "transparent",
            border: "0",
            color: "white",
            opacity: sortBy === "area" ? 1 : 0.5,
            cursor: "pointer",
          }}
          onClick={() => handleSort("area")}
        >
          Sort by area
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {getSortedCountries().map(({ name, area }) => (
          <div
            key={name}
            className="card"
            style={{
              textAlign: "center",
              cursor: "pointer",
              background: selectedCountries.some((c) => c.name === name) ? "#adadad18" : "transparent",
              borderRadius: '10%',
            }}
            onClick={() => {
              toggleSelectCountry({ name, area });
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <svg width="388" height="388">
              <circle
                className="svg"
                cx="194"
                cy="194"
                r={(Math.round(Math.sqrt(area / Math.PI) / 12)) || 1}
                fill="white"
                opacity={selectedCountries.some((c) => c.name === name) ? 1 : 0.6}
              />
            </svg>
            <p>
              {name} ({area.toLocaleString()} км²)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryCircles;
