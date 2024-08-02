import { useState } from "react"
import { useWindowEvent } from "./useWindowEvent"

type ScrollToParams = {
	x?: number;
	y?: number;
  };

type ReturnWindowScroll = [
	scroll: {
		x: number,
		y: number
	}, 
	scrollTo: (params: ScrollToParams) => void
]

export const useWindowScroll = (): ReturnWindowScroll => {
	const [scroll, setScroll] = useState( window ? {x: window.pageXOffset, y: window.pageYOffset} : {x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop});

	useWindowEvent('scroll', ()=>{setScroll( window ? {x: window.pageXOffset, y: window.pageYOffset} : {x: document.documentElement.scrollLeft, y: document.documentElement.scrollTop})})

	const scrollTo = ({ x, y }: ScrollToParams) => {
		if (x !== undefined && y !== undefined) {
		  window.scrollTo(x, y);
		} else if (x !== undefined && window) {
		  window.scrollTo(x, window.scrollY);
		} else if (y !== undefined && window) {
		  window.scrollTo(window.scrollX, y);
		}
	  };
	
	return [scroll, scrollTo]
}
