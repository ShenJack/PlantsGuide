import React, {useEffect, useRef, useState} from 'react';
import './index.scss'
import anime from "animejs";

type Props = {
  className: string;
  children: React.ReactNode,
};
export const AnimatedSwitch = (props: Props) => {
  let wrapper = useRef(undefined);
  let [children, dispatch] = useState(undefined);
  useEffect(() => {
    wrapper.current.style.opacity = 0;
    dispatch(props.children);
    anime({
      targets: wrapper.current,
      opacity: 1,
      duration: 100,
      easing:"easeInSine",
    })
  });
  useEffect(() => {
  });
  return (
    <div
      className={["animated-switch"].concat(props.className).join(" ")}
      ref={wrapper}>
      {children}
    </div>
  );
};
