package ksh.main.controllers.ct;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import ksh.main.ct.dao.ConversationDao;
import ksh.main.models.ct.Conversation;

@Controller
public class CTHomeController {
		
	@RequestMapping("/ct/ct-home")	
	public ModelAndView goToCTHome() {	 
		System.out.println("Going to CT Home");	
		return new ModelAndView("/ct/ct-home");
	}
}
