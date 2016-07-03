package ksh.main.controllers.ct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import ksh.main.ct.dao.MessageDao;
import ksh.main.models.ct.Message;
import messages.MessageFromClient;
import messages.MessageFromServer;

@Controller
public class ResponseWebSocketController {
	

	@Autowired private SimpMessagingTemplate template;
	
	@Autowired
	private MessageDao messageDao;
    
	@MessageMapping("/responseStream")
    public void greeting1(MessageFromClient message) throws Exception {
    	System.out.println(message.toString());
    	
    	if(message.getMessageType().equals("clientResponse")){
    		messageDao.saveMessage(new Message(message.getConversationId(), message.getMessage(), System.currentTimeMillis()));
    	}
    	String[] messages = {"message1","message2","message3","message4","message5"};
    	for(int i=0 ; i<messages.length ; i++){
    		Thread.sleep(3000); // simulated delay
    		this.template.convertAndSend("/topic/greetings", new MessageFromServer("Hello, " + messages[i] + "!"));
    	}        
    }
    
//    @MessageMapping("/responseStream")
//    public void greeting2(AddResponse message) throws Exception {
//    	System.out.println(">>>>>In reponse");
//    	String[] messages = {"message1","message2","message3","message4","message5"};
//    	for(int i=0 ; i<messages.length ; i++){
//    		Thread.sleep(3000); // simulated delay
//    		this.template.convertAndSend("/topic/greetings", new MessageFromServer("Hello, " + messages[i] + "!"));
//    	}        
//    }
}