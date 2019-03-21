import React, { useState, useRef, useLayoutEffect } from "react";
import Footer from "../Footer";
import tinycolor from "tinycolor2";

import styles from "./App.module.css";

const App = props => {
  const picker = useRef(null);
  const [supportsColor, setSuppportsColor] = useState(true);
  useLayoutEffect(() => {
    // Checks if the browser support type:color
    // Using useLayoutEffect to avoid the input flashing
    if (picker.current !== null) {
      if (picker.current.type !== "color") {
        setSuppportsColor(false);
      }
    }
  }, [picker.current]);

  const [colors, setColors] = useState({
    hsl: "",
    rgb: "",
    hex: ""
  });

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
  };

  useLayoutEffect(() => {
    document.body.style.setProperty("--color", colors.hex);
  }, [colors.hex]);

  const openPicker = event => {
    picker.current.click();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <input
          className={`${styles.input} ${styles.withButton}`}
          type={"text"}
          name="hex"
          value={colors.hex}
          onChange={onChange}
          placeholder="hex value"
        />

        {supportsColor && (
          <>
            <input
              className={styles.hidden}
              ref={picker}
              type={"color"}
              name="hex"
              value={colors.hex}
              onChange={onChange}
            />
            <button
              onClick={openPicker}
              type="button"
              className={styles.button}
              aria-label="Click to open color picker"
            >
              {"color picker"}
            </button>
          </>
        )}
      </div>
      <div className={styles.row}>
        <input
          className={styles.input}
          type="text"
          name="rgb"
          value={colors.rgb}
          onChange={onChange}
          placeholder="rgb value"
        />
      </div>
      <div className={styles.row}>
        <input
          className={styles.input}
          type="text"
          name="hsl"
          value={colors.hsl}
          onChange={onChange}
          placeholder="hsl value"
        />
      </div>
      <Footer bgColor={colors.hex} />
    </div>
  );
};

export default App;
