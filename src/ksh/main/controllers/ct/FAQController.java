package ksh.main.controllers.ct;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class FAQController {
	@RequestMapping("/ct/faq")	
	public ModelAndView goToFAQ() {	
		
		return new ModelAndView("/ct/faq");
	}
}
