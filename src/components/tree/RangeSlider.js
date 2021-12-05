import React from "react";
import { useEffect, useRef, useState } from "react";
import { Range, getTrackBackground } from "react-range";

const RangeSlider = (props) => {

    const [step,setStep] = useState(0.1);
    const [min, setMin] = useState(props.min);
    const [max, setMax] = useState(props.max);
    const [state,setState] = useState({values:[props.val]})
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "2em"
        }}
      >
        <Range
          values={state.values}
          step={step}
          min={min}
          max={max}
          onChange={(values) => setState({ values })}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "26px",
                display: "flex",
                width: "100%"
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "3px",
                  width: "160px",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: state.values,
                    colors: ["#548BF4", "#ccc"],
                    min: min,
                    max: max
                  }),
                  alignSelf: "center"
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "22px",
                width: "22px",
                borderRadius: "22px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
                border:"none",
                backgroundColor: isDragged ? "#548BF4" : "#CCC"
              }}
            >
            </div>
          )}
        />
        <output>
          {props.label} : {state.values[0].toFixed(1)}
        </output>
      </div>
    );
}

export default RangeSlider;
