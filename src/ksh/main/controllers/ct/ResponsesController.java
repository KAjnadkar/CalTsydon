package ksh.main.controllers.ct;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import ksh.main.ct.dao.ConversationDao;
import ksh.main.models.ct.Conversation;

@Controller
public class ResponsesController {
	

	
	@Autowired
	private ConversationDao conversationDao;
	
	@RequestMapping("/ct/responses")	
	public ModelAndView goToResponses(@RequestParam String q) {	 
		System.out.println("Going to Responses" + q);
		String message = new java.util.Date().toGMTString();	
    	ArrayList<String> sdfa = new ArrayList<String>();
		sdfa.add("Yes");
		sdfa.add("Ya");
		sdfa.add("Hell ya");
		sdfa.add("No sweetheart");
		conversationDao.saveConversation(new Conversation("Do you think I am stupid?", sdfa));
		return new ModelAndView("/ct/responses", "time", message);
	}
}