package ksh.main.controllers.ct;

import java.util.UUID;

import ksh.main.models.ct.AllConversations;
import ksh.main.models.ct.Conversation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class InitializeConversationController {

	@RequestMapping(value = "/ct/start-new-conversation",  method = RequestMethod.GET)
	public @ResponseBody String goToResponses(@RequestParam("topic") String topic) {			    	
		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		AllConversations.getAllChatsInstance().allConversations.put(uuid, new Conversation(topic));
		return (uuid);
	}
}
