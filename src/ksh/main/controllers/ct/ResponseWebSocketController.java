package ksh.main.controllers.ct;

import java.util.ArrayList;
import java.util.Random;


import ksh.main.models.ct.AllConversations;
import ksh.main.models.ct.Conversation;
import ksh.main.models.ct.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import ksh.main.models.ct.MessageAbridged;
import messages.MessageFromClient;
import messages.MessageFromServer;

@Controller
public class ResponseWebSocketController {	

	@Autowired private SimpMessagingTemplate template;
	

	@MessageMapping("/responseStream")
    public void greeting1(MessageFromClient message) throws Exception {
		Conversation conversation = AllConversations.getAllChatsInstance().allConversations.get(message.getConversationId());
		if(conversation != null){
	    	if(message.getMessageType().equals("clientResponse")){
	    		conversation.messages.addLast(new Message(message.getMessage(), message.getUserName(), System.currentTimeMillis()));
	    	}
	    	else if(message.getMessageType().equals("requestUserName")){
	    		String name = "John" + "-" + new Random().nextInt();
	    		this.template.convertAndSend("/ct/responses", new MessageFromServer("userName", new ArrayList(), name));
	    	}
	    	else if(message.getMessageType().equals("requestConversationTopic")){
	    		this.template.convertAndSend("/ct/responses", new MessageFromServer("requestConversationTopic", new ArrayList(), conversation.topic));
	    	}
	    	else if(message.getMessageType().equals("requestResponses")){
	    		long lastMessageReceived = Long.parseLong(message.getMessage());
	    		ArrayList<Message> allMessagesToBeSent = new ArrayList(conversation.messages);
	    		allMessagesToBeSent.removeIf(x -> (x.getTimestamp() <= lastMessageReceived));
	    		if(allMessagesToBeSent.size() > 0){
	    			ArrayList<MessageAbridged> allAbridgedMessagesToBeSent = new ArrayList<MessageAbridged>();
	    			for(int i=0 ; i<allMessagesToBeSent.size() ; i++){
	    				Message current = allMessagesToBeSent.get(i);
	    				allAbridgedMessagesToBeSent.add(new MessageAbridged(current.getMessage(), current.getUserName(), current.getTimestamp()));
	    			}
	    			this.template.convertAndSend("/ct/responses", new MessageFromServer("responses", allAbridgedMessagesToBeSent, ""));
	    		}
	    	}
		}
		else
			this.template.convertAndSend("/ct/responses", new MessageFromServer("404", new ArrayList(), "404"));

    }
}