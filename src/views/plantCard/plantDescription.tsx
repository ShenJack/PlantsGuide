import "./index.scss";
import React, {useState, useRef, useEffect} from "react";

interface Props {
  description?: string
}

PlantDescription.defaultProps = {
  description: "暂无描述"
}

function getTextStyle(expand, element) {
  if (expand) {
    return {
      height: element.scrollHeight
    }
  } else {
    return {
      height: parseInt(getComputedStyle(element).lineHeight) * 3
    }
  }
}


export function PlantDescription(props: Props) {
  let [showFullDescription, setShowFullDescription] = useState(true)
  let [textHeight, setTextHeight] = useState(0)
  let [tempTextHeight, setTempTextHeight] = useState(0)
  let [tempText, setTempText] = useState(props.description)
  let [curText, setCurText] = useState(props.description)
  let text = useRef(undefined);
  (window as any).text = text;

  useEffect(() => {
    const charIndex = parseInt(getComputedStyle(text.current.parentElement).width) / parseInt(getComputedStyle(text.current).fontSize) * 3;
    setShowFullDescription(false)
    setTextHeight(text.current.scrollHeight)
    setTempText(props.description.slice(0, Math.floor(charIndex * 0.9)) + Array(Math.ceil(charIndex * 0.1)).fill('.').join(''))
    setTempTextHeight(parseInt(getComputedStyle(text.current).lineHeight) * 3)
  }, [])

  useEffect(() => {
    setCurText(showFullDescription ? props.description : tempText)
  }, [showFullDescription])


  return (
    <div className="description">
      <div ref={text} style={text.current && {
        height: showFullDescription ? (textHeight || undefined) : tempTextHeight,
      }}
           className={["text", showFullDescription ? "expand" : "fold"].join(' ')}>
        {curText}
      </div>
      <div className={["icon-fold-wrapper", showFullDescription ? "expand" : "fold"].join(' ')}
           onClick={() => {
             setCurText(!showFullDescription ? props.description : tempText)
             requestAnimationFrame(() => {
               setShowFullDescription(!showFullDescription)
             })
           }}>
        <i className={["iconfont icon-fold"].join(' ')}/>
      </div>
    </div>
  );
}
