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
	const [scroll, setScroll] = useState({x: window.pageXOffset || document.documentElement.scrollLeft, y: window.pageYOffset || document.documentElement.scrollTop});

	useWindowEvent('scroll', ()=>{setScroll({x: window.pageXOffset || document.documentElement.scrollLeft, y: window.pageYOffset || document.documentElement.scrollTop})})

	const scrollTo = ({ x, y }: ScrollToParams) => {
		if (x !== undefined && y !== undefined) {
		  window.scrollTo(x, y);
		} else if (x !== undefined) {
		  window.scrollTo(x, window.scrollY);
		} else if (y !== undefined) {
		  window.scrollTo(window.scrollX, y);
		}
	  };
	
	return [scroll, scrollTo]
}
