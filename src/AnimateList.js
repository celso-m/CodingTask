import React, {useEffect, useState, useLayoutEffect} from "react";
import usePrevious from './hooks/usePrevious'
const AnimateList = ({ children }) => {
  const [itemBox, setItemBox] = useState({});
  const [prevItemBox, setPrevItemBox] = useState({});
  const prevItem = usePrevious(children);

  // Get position of all items in array
  useLayoutEffect(() => {
    const newItemPos = calculateItemPos(children);
    setItemBox(newItemPos);
  }, [children]);

  // Get old position of all items in array
  useLayoutEffect(() => {
    const prevItemBox = calculateItemPos(prevItem);
    setPrevItemBox(prevItemBox);
  }, [prevItem]);

  // Animate swap 
  useEffect(() => {
    const hasPrevBoundingBox = Object.keys(prevItemBox).length;

    if (hasPrevBoundingBox) {
      React.Children.forEach(children, child => {
        const domNode = child.ref.current;
        const itemA = prevItemBox[child.key];
        const itemB = itemBox[child.key];
        const changeInY = itemA.top - itemB.top;
        
        if (changeInY) {
          requestAnimationFrame(() => {
            domNode.style.transform = `translateY(${changeInY}px)`;
            domNode.style.transition = "transform 0s";

            requestAnimationFrame(() => {
              domNode.style.transform = "";
              domNode.style.transition = "transform 0.5s";
            });
          });
        }
      });
    }
  }, [itemBox, prevItemBox, children]);

  return children;
};

// Helper for getting positions of items
const calculateItemPos = children => {
  const itemBoxes = {};

  React.Children.forEach(children, child => {
    const domNode = child.ref.current;
    const nodeItem = domNode.getBoundingClientRect();

    itemBoxes[child.key] = nodeItem;
  
  });

  return itemBoxes;
};

export default AnimateList;