package ksh.main.controllers.ct;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import messages.GreetingsFromClient;
import messages.GreetingsFromServer;

@Controller
public class WebSockController {


    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public GreetingsFromServer greeting(GreetingsFromClient message) throws Exception {
        Thread.sleep(3000); // simulated delay
        System.out.println(">>>>>>>>>>>>>>" + message.getGreeting());
        return new GreetingsFromServer("Hello, " + message.getGreeting() + "!");
    }

}