package ksh.main.controllers.ct;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class AccessDeniedController {
	@RequestMapping("/access-denied")	
	public ModelAndView goToAccessDenied() {	 
		System.out.println("Access Denied");
		String message = new java.util.Date().toGMTString();		
		return new ModelAndView("access-denied", "time", message);
	}	
}
