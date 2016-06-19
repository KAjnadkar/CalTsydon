package ksh.main.controllers.ct;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class CTHomeController {
	@RequestMapping("/ct/ct-home")	
	public ModelAndView goToCTHome() {	 
		System.out.println("Going to CT Home");		
		return new ModelAndView("/ct/ct-home");
	}
}
