package ksh.main.controllers.ct;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ContactController {
	@RequestMapping("/ct/contact")	
	public ModelAndView goToContact() {	
		
		return new ModelAndView("/ct/contact");
	}
}
