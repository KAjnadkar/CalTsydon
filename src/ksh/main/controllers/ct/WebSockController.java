package ksh.main.controllers.ct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import messages.GreetingsFromClient;
import messages.GreetingsFromServer;

@Controller
public class WebSockController {

	@Autowired private SimpMessagingTemplate template;

    @MessageMapping("/hello")
    public void greeting(GreetingsFromClient message) throws Exception {
    	String[] messages = {"message1","message2","message3","message4","message5"};
    	for(int i=0 ; i<messages.length ; i++){
    		Thread.sleep(3000); // simulated delay
    		this.template.convertAndSend("/topic/greetings", new GreetingsFromServer("Hello, " + messages[i] + "!"));
    	}        
    }
}