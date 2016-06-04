package ksh.main.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
 

 
@Controller
@RequestMapping(value={"/sign-in", "/login"})
public class LoginContoller {
 
	@RequestMapping(method = RequestMethod.GET)
	public ModelAndView goToLogin() { 
		System.out.println("????????????????????");
		String message = new java.util.Date().toGMTString();		
		return new ModelAndView("sign-in", "time", message);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ModelAndView login(@RequestParam("j_username") String username, @RequestParam("j_password") String password) {
		System.out.println(">>>>>>>>>>>>>>>>>");
		System.out.println(username + ">>>>>>>>>>>>>>>>" + password);
		System.out.println(">>>>>>>>>>>>>>>>>");
		return new ModelAndView("ct/ct-home", "user", username);
	}
}