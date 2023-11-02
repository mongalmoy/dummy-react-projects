import React, { useState, useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";
import { useDebounceEffect } from "./useDebounceEffect";
import { canvasPreview } from "./canvasPreview";

const CropImage = () => {
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);

  const [completedCrop, setCompletedCrop] = useState({
    unit: "%",
  });

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          1,
          0
        );
      }
    },
    100,
    [completedCrop, 1, 0]
  );

  console.log("completedCrop", completedCrop);
  return (
    <div>
      {/* <img 
        src={require("../img/logo512.png")} 
        alt="_logo"
        style={{width:"100%"}}
      /> */}
      <ReactCrop crop={completedCrop} onChange={(e) => setCompletedCrop(e)}>
        <img src={require("../img/logo512.png")} />
      </ReactCrop>

      <canvas
        ref={previewCanvasRef}
        style={{
          border: "1px solid black",
          objectFit: "contain",
          width: completedCrop.width,
          height: completedCrop.height,
        }}
      />
    </div>
  );
};

export default CropImage;
