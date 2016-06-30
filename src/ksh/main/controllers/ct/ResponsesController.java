package ksh.main.controllers.ct;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import ksh.main.ct.dao.ConversationDao;
import ksh.main.ct.dao.MessageDao;
import ksh.main.models.ct.Conversation;
import ksh.main.models.ct.Message;

@Controller
public class ResponsesController {
	

	
//	@Autowired
//	private ConversationDao conversationDao;
	
//	@Autowired
//	private MessageDao messageDao;
	
	@RequestMapping("/ct/responses")	
	public ModelAndView goToResponses(@RequestParam("conv_id") String id) {	 
		System.out.println("Going to Responses" + id);
		String message = new java.util.Date().toGMTString();	
    	
//		String uuid = UUID.randomUUID().toString().replaceAll("-", "");

//		conversationDao.saveConversation(new Conversation(uuid, q));
//		messageDao.saveMessage(new Message(uuid, uuid+"messageid", "hell yeah!!!", System.currentTimeMillis()));
		return new ModelAndView("/ct/responses", "time", message);
	}
}