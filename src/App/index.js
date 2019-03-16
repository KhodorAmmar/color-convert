import React, { useState, useEffect } from "react";
import tinycolor from "tinycolor2";

import styles from "./App.module.css";

const App = props => {
  const [colors, setColors] = useState({
    hsl: "",
    rgb: "",
    hex: ""
  });

  const [value, setValue] = useState("");

  const onChange = event => {
    if (!event) {
      return;
    }
    const whichColor = event.target.name;
    const value = event.target.value;
    const color = tinycolor(value);
    let hsl, rgb, hex;

    if (whichColor === "rgb") {
      rgb = value;
      if (color.isValid()) {
        hsl = color.toHslString();
        hex = color.toHexString();
      }
    }

    if (whichColor === "hsl") {
      hsl = value;
      if (color.isValid()) {
        rgb = color.toRgbString();
        hex = color.toHexString();
      }
    }

    if (whichColor === "hex") {
      hex = value === "" || value.indexOf("#") > -1 ? value : `#${value}`;
      if (color.isValid()) {
        rgb = color.toRgbString();
        hsl = color.toHslString();
      }
    }

    setColors({ hsl, rgb, hex });
    setValue(value);
  };

  useEffect(() => {
    document.body.style.setProperty("--color", value);
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        name="hex"
        value={colors.hex}
        onChange={onChange}
        placeholder="hex value or named color"
      />
      <input
        className={styles.input}
        type="text"
        name="rgb"
        value={colors.rgb}
        onChange={onChange}
        placeholder="rgb value"
      />
      <input
        className={styles.input}
        type="text"
        name="hsl"
        value={colors.hsl}
        onChange={onChange}
        placeholder="hsl value"
      />
    </div>
  );
};

export default App;
