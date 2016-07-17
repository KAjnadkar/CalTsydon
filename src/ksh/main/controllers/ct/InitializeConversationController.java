package ksh.main.controllers.ct;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import ksh.main.ct.dao.ConversationDao;
import ksh.main.ct.dao.MessageDao;
import ksh.main.models.ct.Conversation;
import ksh.main.models.ct.Message;

@Controller
public class InitializeConversationController {

	@Autowired
	private ConversationDao conversationDao;	
	
	@RequestMapping(value = "/ct/start-new-conversation",  method = RequestMethod.GET)	
	public @ResponseBody String goToResponses(@RequestParam("topic") String topic) {			    	
		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		conversationDao.saveConversation(new Conversation(uuid, topic));		
		return (uuid);
	}
}
