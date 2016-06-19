package ksh.main.controllers.ct;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import ksh.main.ct.dao.ConversationDao;
import ksh.main.models.ct.Conversation;
import messages.GreetingsFromClient;
import messages.GreetingsFromServer;

@Controller
public class WebSockController {
	
	@Autowired
	private ConversationDao conversationDao;
	

	@Autowired private SimpMessagingTemplate template;

    @MessageMapping("/initConversation")
    public void greeting(GreetingsFromClient message) throws Exception {
    	ArrayList<String> sdfa = new ArrayList<String>();
		sdfa.add("Yes");
		sdfa.add("Ya");
		sdfa.add("Hell ya");
		sdfa.add("No sweetheart");
		conversationDao.saveConversation(new Conversation("Do you think I am stupid?", sdfa));
    	String[] messages = {"message1","message2","message3","message4","message5"};
    	for(int i=0 ; i<messages.length ; i++){
    		Thread.sleep(3000); // simulated delay
    		this.template.convertAndSend("/topic/greetings", new GreetingsFromServer("Hello, " + messages[i] + "!"));
    	}        
    }
}