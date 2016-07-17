package ksh.main.controllers.ct;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class FourOhFourController {
	@RequestMapping("/ct/404")	
	public ModelAndView goToAccessDenied() {	 
		System.out.println("404");				
		return new ModelAndView("/ct/404");
	}	

}
