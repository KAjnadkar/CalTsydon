package ksh.main.controllers.ct;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ResponsesController {
	@RequestMapping("/ct/responses")	
	public ModelAndView goToResponses(@RequestParam String q) {	 
		System.out.println("Going to Responses" + q);
		String message = new java.util.Date().toGMTString();		
		return new ModelAndView("/ct/responses", "time", message);
	}
}