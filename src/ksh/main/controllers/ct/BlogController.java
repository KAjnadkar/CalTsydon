package ksh.main.controllers.ct;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class BlogController {
	@RequestMapping("/ct/blog")	
	public ModelAndView goToBlog() {	
		
		return new ModelAndView("/ct/blog");
	}
}
