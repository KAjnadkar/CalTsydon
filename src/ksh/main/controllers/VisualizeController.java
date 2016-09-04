package ksh.main.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class VisualizeController {	 
		@RequestMapping("/visualize")
		public ModelAndView goToVisualize() {	
			System.out.println(">>>>>>>>>>>>>><<<<<<<<<<<<<<");
			return new ModelAndView("visualize");
		}	
	}
